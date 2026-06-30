# EFAR — Emergency First Aid Response Workforce System

## Problem

EFAR is a Singapore-based private ambulance provider. Shift scheduling, leave management, and conflict resolution were previously handled informally through WhatsApp and spreadsheets. This project replaces that with:

- A web portal for the **Operations Director** (roster planning, leave approvals, conflict detection, employee management)
- A self-service dashboard for **Paramedics and Drivers** (schedule view, leave requests, profile)
- A **WhatsApp bot** for submitting leave requests conversationally

## Task Allocation

| Student | Student ID | Responsibilities |
|---------|-----------|-----------------|
| Ahmad Faris bin Razali | 253024C | Paramedic/Driver self-service portal, monthly schedule calendar, shift detail view, profile page, settings/password change, sign-out flow |

## How to Run Locally

### Prerequisites

- Node.js 18 or later
- npm

### 1. Start the backend

```bash
cd backend
npm install
npm run dev
```

Server starts on **http://localhost:3001**

### 2. Start the frontend

```bash
cd frontend
npm install
npm run dev
```

App opens at **http://localhost:5173**

### 3. Expose the backend for WhatsApp (optional)

```bash
npm install -g ngrok
ngrok http 3001
```

Copy the `https://xxxx.ngrok-free.app` URL, then:

1. Go to Meta Developer Console → Your App → WhatsApp → Configuration
2. **Callback URL:** `https://xxxx.ngrok-free.app/webhook`
3. **Verify Token:** `EFAR_WEBHOOK_2025`
4. Click **Verify and Save** → tick **messages** → Save

### 4. Run tests

```bash
# Frontend unit tests
cd frontend && npm test

# Backend unit tests
cd backend && npm test
```

## Environment Variables

Copy `.env.example` to `.env` in each folder and fill in real values.
See [`deployment.md`](deployment.md) for the full variable reference.

## Project Structure

```
efar_final/
├── design/                     # System design documentation
│   ├── problem-statement.md
│   ├── architecture.md
│   ├── architecture-diagram.md
│   ├── er-diagram.md
│   └── ahmad-faris/            # Individual design docs
│       ├── use-cases.md
│       ├── api-documentation.md
│       └── database-schema.md
│
├── frontend/                   # React + Vite application
│   ├── src/                    # App source code
│   ├── tests/ahmad-faris/      # Frontend unit tests
│   ├── package.json
│   └── .env.example
│
├── backend/                    # Node.js + Express API
│   ├── src/                    # Server source code
│   ├── tests/ahmad-faris/      # Backend unit tests
│   ├── package.json
│   └── .env.example
│
├── deployment.md
└── README.md
```
