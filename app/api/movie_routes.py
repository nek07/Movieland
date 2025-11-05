from neo4j import GraphDatabase
from typing import List, Optional
from models.movie import Movie
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
