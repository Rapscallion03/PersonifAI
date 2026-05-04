# PersonifAI - System Architecture

This document outlines the Three-Tier Architecture of the PersonifAI platform.

---

## 1. High-Level Architecture Diagram

```mermaid
graph TD
    subgraph "1. Presentation Tier (Frontend)"
        A[Next.js Client Components] -->|HTTP/JSON| B[API Routes]
        A1[Tailwind CSS 4 & UI Components]
        A2[AI Chat Interface]
    end

    subgraph "2. Logic Tier (Backend / Application)"
        B[Next.js API Routes /src/app/api]
        B -->|Gemini SDK| C[Google Gemini AI API]
        B -->|Prisma Client| D[Prisma ORM]
    end

    subgraph "3. Data Tier (Database)"
        D -->|SQL Queries| E[(PostgreSQL Database)]
        E1[Task Model]
        E2[SubStep Model]
    end

    %% Styling
    style A fill:#f9f,stroke:#333,stroke-width:2px,color:#000
    style B fill:#bbf,stroke:#333,stroke-width:2px,color:#000
    style E fill:#bfb,stroke:#333,stroke-width:2px,color:#000
    style C fill:#f96,stroke:#333,stroke-width:2px,color:#000
    style D fill:#6cf,stroke:#333,stroke-width:2px,color:#000
    style A1 fill:#f9f,stroke:#333,stroke-width:2px,color:#000
    style A2 fill:#f9f,stroke:#333,stroke-width:2px,color:#000
    style B1 fill:#bbf,stroke:#333,stroke-width:2px,color:#000
    style E1 fill:#bfb,stroke:#333,stroke-width:2px,color:#000
    style E2 fill:#bfb,stroke:#333,stroke-width:2px,color:#000
```

---

## 2. Data Flow Diagrams (DFD)

### 2.1 Level 0: System Context Diagram
The Level 0 DFD shows the system as a single process interacting with external entities.

```mermaid
graph LR
    User((User))
    System[("PersonifAI System")]
    Gemini(("Google Gemini AI"))
    DB[(PostgreSQL Database)]

    User -->|Learning Goal / Interaction| System
    System -->|Task Breakdown & Progress| User
    
    System <-->|Prompt & JSON Response| Gemini
    System <-->|CRUD Task Data| DB

    style System fill:#f9f,stroke:#333,stroke-width:4px,color:#000
    style User fill:#fff,stroke:#333,stroke-width:2px,color:#000
    style Gemini fill:#fff,stroke:#333,stroke-width:2px,color:#000
    style DB fill:#fff,stroke:#333,stroke-width:2px,color:#000
```

### 2.2 Level 1: Internal Module Data Flow
The Level 1 DFD breaks down the system into its core functional modules.

```mermaid
graph TD
    User((User))
    
    subgraph "PersonifAI System"
        P1[1.0 Chat & Interaction]
        P2[2.0 AI Processing]
        P3[3.0 Task Management]
        P4[4.0 Dashboard & Reporting]
    end

    Gemini(("Google Gemini AI"))
    D1[("Tasks & SubSteps Store")]

    User -->|User Query| P1
    P1 -->|Clarification / Preview| User
    
    P1 -->|Refined Request| P2
    P2 <-->|API Call / JSON| Gemini
    P2 -->|Structured Task Data| P1

    P1 -->|Approved Task| P3
    P3 -->|Store Task| D1
    
    P4 <-->|Fetch Progress| D1
    P4 -->|Visualized Metrics| User
    
    User -->|Mark Step Complete| P3
    P3 -->|Update Status| D1

    style P1 fill:#bbf,stroke:#333,color:#000
    style P2 fill:#bbf,stroke:#333,color:#000
    style P3 fill:#bbf,stroke:#333,color:#000
    style P4 fill:#bbf,stroke:#333,color:#000
    style D1 fill:#bfb,stroke:#333,color:#000
```

---

## 3. Entity-Relationship Diagram (ERD)

The following diagram illustrates the relationship between the core entities, including the planned **User** entity for future implementation.

```mermaid
erDiagram
    USER ||--o{ TASK : owns
    TASK ||--o{ SUBSTEP : contains
    USER {
        string id PK "Primary Key - System ID"
        string email "User Email"
        string name "Full Name"
        datetime createdAt "Join Date"
    }
    TASK {
        string id PK "Primary Key - System ID"
        string userId FK "Foreign Key - Owner Reference"
        string title "Learning Goal"
        json juice "Meta: Subject/Priority"
        datetime createdAt "Generation Date"
    }
    SUBSTEP {
        string id PK "Primary Key - System ID"
        string taskId FK "Foreign Key - Parent Reference"
        string title "Action Title"
        string content "Details or URL"
        boolean isCompleted "Done Status"
        StepType type "Step Category"
    }
```

---

## 4. Tier Breakdown

### 4.1 Presentation Tier (Frontend)
The user interface is built using **Next.js (App Router)** and **TypeScript**, ensuring a type-safe and performant experience.
- **UI Framework:** React with functional components.
- **Styling:** Tailwind CSS 4 for a modern, responsive design with dark mode support.
- **Core Interfaces:** 
    - **Landing Page:** Marketing site with conversion-focused sections.
    - **AI Assistant:** Interactive chat interface for task decomposition.
    - **Dashboard:** Management hub for tracking learning progress.

### 4.2 Logic Tier (Application)
The logic tier handles request routing, business logic, and external API orchestrations.
- **API Framework:** Next.js Route Handlers (Server-side).
- **AI Integration:** 
    - Integration with **Google Gemini AI** (`gemini-2.5-flash`).
    - Specialized system prompting to convert natural language into structured JSON task previews.
- **ORM:** **Prisma 7** manages the abstraction layer for database operations, ensuring schema consistency.

### 4.3 Data Tier (Database)
Persistent storage for all user data and generated tasks.
- **Database:** **PostgreSQL**.
- **Data Model:**
    - **Task:** Represents a broad goal (e.g., "Learn React"). Includes a flexible `juice` JSON field for metadata (subject, priority).
    - **SubStep:** Actionable items linked to a task (text instructions, video URLs, or revision notes).
