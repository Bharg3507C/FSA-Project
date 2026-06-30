# Architecture Diagram

## Mermaid Source

```mermaid
graph TD
    subgraph Clients["Client Devices"]
        B["Browser\n(Operations Director)"]
        W["WhatsApp\n(Paramedic / Driver)"]
    end

    subgraph FE["Frontend — Vercel"]
        R["React App\n(Vite build)"]
    end

    subgraph BE["Backend — Render"]
        E["Express Server\n(Node.js)"]
        BOT["WhatsApp Bot\nHandler"]
    end

    subgraph Data["Data Layer"]
        DB[("Neon PostgreSQL\n(employees, schedules,\nleave requests)")]
        FS["Cloudinary\n(MC document images)"]
    end

    subgraph Meta["Meta Platform"]
        WA["WhatsApp\nBusiness API"]
    end

    B -->|HTTPS| R
    R -->|REST API calls| E
    E --> DB
    E --> FS
    WA -->|"Webhook POST\n/webhook"| E
    E -->|"Send message\n(Graph API)"| WA
    WA <-->|Messages| W
    E --- BOT
```

## Export Instructions

1. Open [https://mermaid.live](https://mermaid.live)
2. Paste the Mermaid source above into the editor
3. Click **Export → PNG**
4. Save the file as `architecture-diagram.png` in this folder (`design/`)
