from neo4j import GraphDatabase
import os
from services.auth import hash_password
from models.relations import ViewedRelation, LikedRelation, RatedRelation, PurchasedRelation
driver = GraphDatabase.driver(
    "neo4j+s://f3ee1fdc.databases.neo4j.io",
    auth=("neo4j", "_jhDbmYBprsMhi_nbYgrcj8sre3cyjF8KxkglFPX3a4")
)
with driver.session() as session:
    print(session.run("RETURN 1 AS test").single()["test"])
def create_user(user_id: str, name: str, email: str, password_hash: str):
    query = """
    MERGE (u:User {id:$id})
    ON CREATE SET u.name=$name,
                  u.email=$email,
                  u.password_hash=$password_hash,
                  u.created_at=datetime()
    RETURN u
    """
    with driver.session() as session:
        return session.run(query, id=user_id, name=name, email=email, password_hash=password_hash).single()

def get_user_by_email(email: str):
    query = "MATCH (u:User {email:$email}) RETURN u"
    with driver.session() as session:
        record = session.run(query, email=email).single()
        return record["u"] if record else None

def update_user(user_id: str, name: str = None, email: str = None, password: str = None):
    sets = []
    params = {"user_id": user_id}

    if name:
        sets.append("u.name = $name")
        params["name"] = name
    if email:
        sets.append("u.email = $email")
        params["email"] = email
    if password:
        hashed_pw = hash_password(password)
        sets.append("u.password_hash = $password_hash")
        params["password_hash"] = hashed_pw

    if not sets:
        return None  # ничего обновлять не нужно

    query = f"""
    MATCH (u:User {{id:$user_id}})
    SET {', '.join(sets)}
    RETURN u
    """
    with driver.session() as session:
        record = session.run(query, **params).single()
        return record["u"] if record else None
    


def add_viewed(user_id: str, relation: ViewedRelation):
    query = """
    MATCH (u:User {id: $user_id})
    MATCH (m:Movie {id: $movie_id})
    MERGE (u)-[r:VIEWED]->(m)
    ON CREATE SET r.count = $count, r.lastTs = $lastTs
    ON MATCH SET r.count = r.count + $count, r.lastTs = $lastTs
    RETURN r
    """
    with driver.session() as session:
        session.run(query,
                    user_id=user_id,
                    movie_id=relation.movie_id,
                    count=relation.count,
                    lastTs=relation.lastTs.isoformat())

def add_liked(user_id: str, relation: LikedRelation):
    query = """
    MATCH (u:User {id: $user_id})
    MATCH (m:Movie {id: $movie_id})
    MERGE (u)-[r:LIKED]->(m)
    SET r.ts = $ts
    RETURN r
    """
    with driver.session() as session:
        session.run(query,
                    user_id=user_id,
                    movie_id=relation.movie_id,
                    ts=relation.ts.isoformat())

def add_rated(user_id: str, relation: RatedRelation):
    query = """
    MATCH (u:User {id: $user_id})
    MATCH (m:Movie {id: $movie_id})
    MERGE (u)-[r:RATED]->(m)
    SET r.rating = $rating, r.ts = $ts
    RETURN r
    """
    with driver.session() as session:
        session.run(query,
                    user_id=user_id,
                    movie_id=relation.movie_id,
                    rating=relation.rating,
                    ts=relation.ts.isoformat())

def add_purchased(user_id: str, relation: PurchasedRelation):
    query = """
    MATCH (u:User {id: $user_id})
    MATCH (m:Movie {id: $movie_id})
    MERGE (u)-[r:PURCHASED]->(m)
    SET r.purchased_at = $purchased_at, r.price = $price, r.status = $status
    RETURN r
    """
    with driver.session() as session:
        session.run(query,
                    user_id=user_id,
                    movie_id=relation.movie_id,
                    purchased_at=relation.purchased_at.isoformat(),
                    price=relation.price,
                    status=relation.status)