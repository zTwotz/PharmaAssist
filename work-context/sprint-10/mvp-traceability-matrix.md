# MVP Traceability Matrix Summary

This document serves as a high-level traceability matrix, linking the original Business Requirements and User Stories to their final technical implementation in Sprint 10.

## 1. Authentication and Authorization (RBAC)
- **Business Requirement:** System must securely authenticate users and enforce role-based access control.
- **User Stories:** US-01, US-02, US-03, US-04
- **Implementation:** 
  - Supabase Auth handles identity.
  - NestJS `RolesGuard` and `PermissionsGuard` enforce RBAC using the PostgreSQL `User` table.
  - Implemented across all Sprints, finalized in Sprint 1.

## 2. Inventory Management (Medicines & Stock)
- **Business Requirement:** System must track medicines, batches, and stock levels accurately.
- **User Stories:** US-10, US-11, US-12, US-15
- **Implementation:**
  - `Medicine`, `MedicineBatch`, `StockTransaction` models in Prisma.
  - FEFO (First-Expire-First-Out) deduction logic implemented.
  - Implemented in Sprint 2, 3.

## 3. Point of Sale (POS) and Checkout
- **Business Requirement:** Staff must be able to create sales orders, search products, and process payments.
- **User Stories:** US-25, US-26, US-27, US-30
- **Implementation:**
  - `Order`, `OrderItem` models.
  - Checkout logic ensures stock availability (`BR-06`) and prevents empty orders (`BR-09`).
  - Implemented in Sprint 4, 5.

## 4. Interaction Alerts (Safety Core)
- **Business Requirement:** System must detect drug-drug interactions and block sales of HIGH severity without a pharmacist note.
- **User Stories:** US-35, US-36, US-37
- **Implementation:**
  - `InteractionRule` model.
  - Pre-checkout validation intercepts HIGH severity interactions.
  - `overrideReason` field added to checkout payload.
  - Implemented in Sprint 6.

## 5. AI Copilot (Graph-RAG)
- **Business Requirement:** Provide AI assistance backed by the internal knowledge graph, with safe fallback mechanisms.
- **User Stories:** US-45, US-46, US-47
- **Implementation:**
  - `Neo4jService` connects to AuraDB.
  - Google Gemini AI integration (`@google/genai`).
  - `MockAIService` provides local fallback.
  - Implemented in Sprint 7.

## 6. Reports and Auditing
- **Business Requirement:** Owners need visibility into sales and system activity.
- **User Stories:** US-60, US-61, US-62
- **Implementation:**
  - Revenue and Top Medicines aggregation queries in backend.
  - `AuditLog` captures critical events.
  - Implemented in Sprint 8, 9.
