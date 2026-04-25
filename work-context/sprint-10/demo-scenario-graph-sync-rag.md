# Demo Scenario: Graph Sync and Graph-RAG

This script guides the presenter through demonstrating how PharmaAssist maintains a synchronized medical knowledge graph and uses it to power accurate AI responses (Graph-RAG).

## Preparation
- Ensure the backend is running locally.
- Ensure Neo4j AuraDB is configured and reachable.
- Login as **Admin**.

## 1. Viewing the Current Knowledge Graph

**Goal:** Show that the AI's knowledge is grounded in structured data.

**Steps:**
1. Navigate to the **Interaction Rules** or **Graph Management** dashboard.
2. Search for "Aspirin" and "Warfarin".
3. **Expectation:** The UI should display the existing interaction rule between these two medicines, indicating it was loaded from the database into the graph.

## 2. Triggering a Graph Synchronization

**Goal:** Demonstrate how changes in the relational database propagate to the graph database.

**Steps:**
1. Navigate to the **Interaction Rules** management screen.
2. Create a *new* interaction rule (e.g., Medicine A: "Ibuprofen 400mg", Medicine B: "Lisinopril 10mg", Severity: "MODERATE", Description: "May reduce antihypertensive effect").
3. Save the rule.
4. **Expectation:** A background job or immediate trigger synchronizes this new rule to Neo4j. A toast notification or status indicator may confirm "Graph synced successfully."

## 3. Verifying Graph-RAG (Retrieval-Augmented Generation)

**Goal:** Show that the AI Copilot immediately uses the newly synchronized data to answer questions accurately without needing model retraining.

**Steps:**
1. Open the AI Copilot chat interface.
2. Ask the Copilot a specific question about the newly created rule:
   > "Is it safe to take Ibuprofen and Lisinopril together?"
3. **Expectation:** The Copilot should retrieve the newly created relationship from the Neo4j graph and respond, citing the specific interaction (MODERATE severity, reduced antihypertensive effect) defined in step 2.
4. Contrast this with a generic LLM response by pointing out that the Copilot cites the internal PharmaAssist database structure.

## 4. Full Graph Rebuild (Optional/Technical Demo)

**Goal:** Show resilience and state recovery.

**Steps:**
1. Open a terminal and navigate to the backend directory.
2. Run `npm run graph:rebuild` (ensure `NODE_ENV=demo` and `ALLOW_DEMO_RESET=true` are set if required).
3. **Expectation:** The script clears the Neo4j database and reconstructs all nodes (Medicines) and edges (Interactions) from the current PostgreSQL state, printing a success message in the terminal.
