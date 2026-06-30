# System Architecture

## Folder Structure

### Frontend (`frontend/src/`)

```
frontend/src/
├── App.jsx       — Root component; houses all pages and shells (public site,
│                   Operations Director dashboard, Paramedic/Driver portal)
├── http.js       — Centralised API fetch helper (base URL + auth headers)
├── main.jsx      — React entry point (ReactDOM.createRoot)
└── index.css     — Global reset and base styles
```

> The current implementation uses a single-file architecture intentional for a rapid prototype.
> A production split would separate pages, components, hooks, and utilities into sub-folders.

### Backend (`backend/src/`)

```
backend/src/
└── index.js      — Express server: REST routes, WhatsApp webhook handler,
                    leave-request bot logic, CORS, dotenv configuration
```

> As above, the current implementation is a single-file prototype.
> A production split would separate routes/, controllers/, models/, and middleware/.

## Third-Party Services

| Service | Purpose |
|---------|---------|
| Meta WhatsApp Business API | Inbound and outbound WhatsApp messages for the leave-request bot |
| ngrok | Exposes the local Express server as a public HTTPS endpoint for Meta webhook verification during development |

## Generative AI Services

None integrated at this time.

## Cloud Deployment

| Layer | Service | Notes |
|-------|---------|-------|
| Frontend | Vercel | Hosts the static React build |
| Backend | Render | Runs the Node/Express server |
| Database | Neon (PostgreSQL) | Serverless Postgres; stores employees, schedules, and leave requests |
| File Storage | Cloudinary | Stores MC document images uploaded through WhatsApp |

See [`../deployment.md`](../deployment.md) for public URLs and required environment variables.

## Architecture Diagram

See [`architecture-diagram.md`](architecture-diagram.md) for the full system diagram (Mermaid source + PNG).
