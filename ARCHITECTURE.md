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

## 2. Tier Breakdown

### 2.1 Presentation Tier (Frontend)
The user interface is built using **Next.js (App Router)** and **TypeScript**, ensuring a type-safe and performant experience.
- **UI Framework:** React with functional components.
- **Styling:** Tailwind CSS 4 for a modern, responsive design with dark mode support.
- **Core Interfaces:** 
    - **Landing Page:** Marketing site with conversion-focused sections.
    - **AI Assistant:** Interactive chat interface for task decomposition.
    - **Dashboard:** Management hub for tracking learning progress.

### 2.2 Logic Tier (Application)
The logic tier handles request routing, business logic, and external API orchestrations.
- **API Framework:** Next.js Route Handlers (Server-side).
- **AI Integration:** 
    - Integration with **Google Gemini AI** (`gemini-2.5-flash`).
    - Specialized system prompting to convert natural language into structured JSON task previews.
- **ORM:** **Prisma 7** manages the abstraction layer for database operations, ensuring schema consistency.

### 2.3 Data Tier (Database)
Persistent storage for all user data and generated tasks.
- **Database:** **PostgreSQL**.
- **Data Model:**
    - **Task:** Represents a broad goal (e.g., "Learn React"). Includes a flexible `juice` JSON field for metadata (subject, priority).
    - **SubStep:** Actionable items linked to a task (text instructions, video URLs, or revision notes).
