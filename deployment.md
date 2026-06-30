# Deployment

## Cloud Services

| Layer | Service | Public URL |
|-------|---------|------------|
| Frontend | Vercel | `https://efar-app.vercel.app` *(update once deployed)* |
| Backend | Render | `https://efar-api.onrender.com` *(update once deployed)* |
| Database | Neon (PostgreSQL) | *(connection string only — no public URL)* |
| File Storage | Cloudinary | *(API access only — no public URL)* |

> Update this table with the real URLs after deploying each service.

---

## Environment Variables

### Frontend (`frontend/.env`)

Copy `frontend/.env.example` → `frontend/.env` and fill in real values.

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_URL` | Base URL of the deployed backend | `https://efar-api.onrender.com` |

---

### Backend (`backend/.env`)

Copy `backend/.env.example` → `backend/.env` and fill in real values.

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Port the server listens on | `3001` |
| `WEBHOOK_VERIFY_TOKEN` | Token for Meta webhook verification | `EFAR_WEBHOOK_2025` |
| `WHATSAPP_TOKEN` | Meta WhatsApp Business API access token | *(from Meta Developer Console)* |
| `WHATSAPP_PHONE_NUMBER_ID` | Phone number ID from Meta Developer Console | *(numeric string)* |
| `DATABASE_URL` | Neon PostgreSQL connection string | `postgresql://user:pass@host/db?sslmode=require` |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name | `efar-media` |
| `CLOUDINARY_API_KEY` | Cloudinary API key | *(numeric string)* |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret | *(alphanumeric string)* |
| `JWT_SECRET` | Secret key for signing JWT tokens | *(random 32+ char string)* |

> **Never commit actual secret values.** Use `.env.example` as the committed template.
