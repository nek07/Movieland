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