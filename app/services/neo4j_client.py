from neo4j import GraphDatabase

URI = "neo4j+s://f3ee1fdc.databases.neo4j.io"
USER = "neo4j"
PASSWORD = "_jhDbmYBprsMhi_nbYgrcj8sre3cyjF8KxkglFPX3a4"
DATABASE = "neo4j"

driver = GraphDatabase.driver(URI, auth=(USER, PASSWORD))

def test_connection():
    with driver.session(database=DATABASE) as session:
        result = session.run("RETURN '✅ Connected to Neo4j AuraDB' AS message")
        print(result.single()["message"])

if __name__ == "__main__":
    print("Connecting...")
    test_connection()
    driver.close()
