# Neo4j Setup and Graph Rebuild Notes

This document provides instructions for configuring the Neo4j Graph Database and rebuilding the drug interaction graph for the PharmaAssist application.

## Overview

PharmaAssist uses Neo4j to store and query complex relationships between medicines, specifically for detecting drug-drug interactions.

## 1. Local Setup via Docker (Recommended for Development)

For local development without relying on a remote Neo4j AuraDB instance, you can use Docker.

1. Ensure Docker Desktop is running.
2. From the project root, navigate to the backend directory and run the Neo4j container:

```bash
docker run -d --name neo4j-pharmaassist \
    -p 7474:7474 -p 7687:7687 \
    -e NEO4J_AUTH=neo4j/password \
    neo4j:5
```

3. Update your `backend/.env` file:
```env
NEO4J_URI="bolt://localhost:7687"
NEO4J_USERNAME="neo4j"
NEO4J_PASSWORD="password"
```

## 2. Remote Setup via Neo4j AuraDB (Production/Staging)

If you are using Neo4j AuraDB (as per the MVP deployment):

1. Create a free AuraDB instance at [Neo4j Console](https://console.neo4j.io/).
2. Save the generated credentials (URI, Username, Password).
3. Update your `backend/.env` file with these remote credentials.

```env
NEO4J_URI="neo4j+s://<your-instance-id>.databases.neo4j.io"
NEO4J_USERNAME="neo4j"
NEO4J_PASSWORD="<your-generated-password>"
```

## 3. Rebuilding the Graph Data

The graph database needs to be populated with medicine nodes and interaction relationships based on the primary PostgreSQL database.

Whenever you seed the PostgreSQL database (e.g., using `npm run demo:reset`), or whenever the core medicines list changes significantly, you must rebuild the graph.

### Running the Graph Rebuild Command

The backend provides a NestJS command to sync data from PostgreSQL to Neo4j.

```bash
cd backend
npm run graph:rebuild
```

### What `graph:rebuild` Does:
1. Deletes all existing `Medicine` nodes and `INTERACTS_WITH` relationships in Neo4j.
2. Queries all active medicines from PostgreSQL.
3. Creates a `Medicine` node in Neo4j for each medicine.
4. Queries all interaction rules from PostgreSQL.
5. Creates `INTERACTS_WITH` relationships between the corresponding `Medicine` nodes in Neo4j.

**Note on performance:** The rebuild script is idempotent and performs a full sync. It is fast enough for the MVP dataset, but for larger datasets, a more granular sync mechanism might be required in the future.
