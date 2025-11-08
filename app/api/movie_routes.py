from neo4j import GraphDatabase
from typing import List, Optional
from models.movie import Movie, MovieWithScore
from typing import Tuple
driver = GraphDatabase.driver(
    "neo4j+s://f3ee1fdc.databases.neo4j.io",
    auth=("neo4j", "_jhDbmYBprsMhi_nbYgrcj8sre3cyjF8KxkglFPX3a4")
)
def get_all_movies(sort_by: Optional[str] = None, descending: bool = False) -> List[Movie]:
    query = "MATCH (m:Movie) RETURN m"
    
    # Добавляем сортировку
    if sort_by in ["price", "rating", "year", "title"]:
        order = "DESC" if descending else "ASC"
        query += f" ORDER BY m.{sort_by} {order}"
    
    with driver.session() as session:
        result = session.run(query)
        movies = []
        for record in result:
            m = record["m"]
            movies.append(Movie(
                id=m["id"],
                movie_id=m.get("movie_id", ""),
                posterUrl=m["posterUrl"],
                price=float(m["price"]),
                rating=float(m["rating"]),
                synopsis=m["synopsis"],
                title=m["title"],
                year=int(m["year"])
            ))
        return movies


def get_movie_by_id(movie_id: str) -> Optional[Movie]:
    query = "MATCH (m:Movie {id:$movie_id}) RETURN m"
    with driver.session() as session:
        record = session.run(query, movie_id=movie_id).single()
        if not record:
            return None
        m = record["m"]
        return Movie(
            id=m["id"],
            movie_id=m.get("movie_id", ""),
            posterUrl=m["posterUrl"],
            price=float(m["price"]),
            rating=float(m["rating"]),
            synopsis=m["synopsis"],
            title=m["title"],
            year=int(m["year"])
        )

def get_movies_by_mood(
    mood: str,
    limit: int = 10,
    weight_pop: float = 0.8,
    weight_mood: float = 0.2,
) -> List[Movie]:
    """
    Возвращает фильмы под настроение `mood`, отсортированные по score = 0.8*pop + 0.2*moodScore (по умолчанию).
    pop — сумма effWeight по LIKED/RATED/VIEWED; moodScore — max(hm.score) для данного mood.
    """
    cypher = """
    MATCH (m:Movie)
    OPTIONAL MATCH (m)-[hm:HAS_MOOD]->(:Mood {name:$mood})
    WITH m, coalesce(max(hm.score), 0.0) AS moodScore
    OPTIONAL MATCH ()-[i:LIKED|RATED|VIEWED]->(m)
    WITH m, moodScore, coalesce(sum(coalesce(i.effWeight, 1.0)), 0.0) AS pop
    WITH m, $weight_pop * pop + $weight_mood * moodScore AS score
    ORDER BY score DESC
    RETURN m
    LIMIT $limit
    """
    with driver.session() as session:
        result = session.run(
            cypher,
            mood=mood,
            limit=limit,
            weight_pop=weight_pop,
            weight_mood=weight_mood,
        )
        movies: List[Movie] = []
        for record in result:
            m = record["m"]
            movies.append(
                Movie(
                    id=m["id"],
                    movie_id=m.get("movie_id", ""),
                    posterUrl=m["posterUrl"],
                    price=float(m["price"]),
                    rating=float(m["rating"]),
                    synopsis=m["synopsis"],
                    title=m["title"],
                    year=int(m["year"]),
                )
            )
        return movies


def get_movies_by_mood_with_scores(
    mood: str,
    limit: int = 10,
    weight_pop: float = 0.8,
    weight_mood: float = 0.2,
) -> List[MovieWithScore]:
    cypher = """
    MATCH (m:Movie)
    OPTIONAL MATCH (m)-[hm:HAS_MOOD]->(:Mood {name:$mood})
    WITH m, coalesce(max(hm.score), 0.0) AS moodScore
    OPTIONAL MATCH ()-[i:LIKED|RATED|VIEWED]->(m)
    WITH m, moodScore, coalesce(sum(coalesce(i.effWeight, 1.0)), 0.0) AS pop
    WITH m, $weight_pop * pop + $weight_mood * moodScore AS score
    ORDER BY score DESC
    RETURN m, score
    LIMIT $limit
    """
    out: List[MovieWithScore] = []
    with driver.session() as session:
        for record in session.run(
            cypher,
            mood=mood,
            limit=limit,
            weight_pop=weight_pop,
            weight_mood=weight_mood,
        ):
            m = record["m"]
            score = float(record["score"])
            out.append(
                MovieWithScore(
                    movie=Movie(
                        id=m["id"],
                        movie_id=m.get("movie_id", ""),
                        posterUrl=m["posterUrl"],
                        price=float(m["price"]),
                        rating=float(m["rating"]),
                        synopsis=m["synopsis"],
                        title=m["title"],
                        year=int(m["year"]),
                    ),
                    score=score,
                )
            )
    return out

def get_personal_by_history_with_scores(
    uid: str,
    limit: int = 10,
    w_pop: float = 0.2,   # небольшой буст общей популярности
) -> List[MovieWithScore]:

    CYPHER_HAS_HISTORY = """
    MATCH (u:User {id:$uid})-[:LIKED|RATED|VIEWED]->(:Movie)
    RETURN count(*) AS cnt
    """

    # user-based CF по истории:
    CYPHER_PERSONAL = """
    MATCH (u:User {id:$uid})

    // фильмы пользователя
    OPTIONAL MATCH (u)-[:LIKED|RATED|VIEWED]->(m:Movie)
    WITH u, collect(DISTINCT m) AS me

    // похожие пользователи по Jaccard
    MATCH (other:User)-[:LIKED|RATED|VIEWED]->(om:Movie)
    WHERE other <> u
    WITH u, me, other, collect(DISTINCT om) AS them
    WITH u, me, other,
         size([x IN me WHERE x IN them]) AS inter,
         size(me) + size(them) - size([x IN me WHERE x IN them]) AS unionSize
    WITH u, me, other,
         CASE WHEN unionSize = 0 THEN 0.0 ELSE 1.0 * inter / unionSize END AS sim
    WHERE sim > 0

    // кандидаты от похожих
    MATCH (other)-[r:LIKED|RATED|VIEWED]->(cand:Movie)
    WHERE NOT cand IN me
    WITH me, cand, sum(sim * coalesce(r.effWeight, 1.0)) AS cf

    // буст общей популярности (необязательно, но стабилизирует ранжирование)
    OPTIONAL MATCH ()-[i:LIKED|RATED|VIEWED]->(cand)
    WITH cand, cf, coalesce(sum(coalesce(i.effWeight,1.0)),0.0) AS pop

    WITH cand, cf + $w_pop * pop AS score
    ORDER BY score DESC
    RETURN cand AS m, score
    LIMIT $limit
    """

    # холодный старт: просто популярное
    CYPHER_COLD_START = """
    MATCH ()-[i:LIKED|RATED|VIEWED]->(m:Movie)
    WITH m, coalesce(sum(coalesce(i.effWeight,1.0)),0.0) AS pop
    RETURN m, pop AS score
    ORDER BY score DESC
    LIMIT $limit
    """

    with driver.session() as s:
        has_hist = s.run(CYPHER_HAS_HISTORY, uid=uid).single()["cnt"] > 0
        cypher = CYPHER_PERSONAL if has_hist else CYPHER_COLD_START
        rows = s.run(cypher, uid=uid, limit=limit, w_pop=w_pop).data()

    out: List[MovieWithScore] = []
    for r in rows:
        m = r["m"]
        score = float(r["score"])
        out.append(
            MovieWithScore(
                movie=Movie(
                    id=m["id"],
                    movie_id=m.get("movie_id", ""),
                    posterUrl=m["posterUrl"],
                    price=float(m["price"]),
                    rating=float(m["rating"]),
                    synopsis=m["synopsis"],
                    title=m["title"],
                    year=int(m["year"]),
                ),
                score=score,
            )
        )
    return out