# API Documentation — Ahmad Faris bin Razali

## Base URL

| Environment | URL |
|-------------|-----|
| Development | `http://localhost:3001` |
| Production  | `https://efar-api.onrender.com` *(update once deployed)* |

---

## Authentication

All protected endpoints require a bearer token in the `Authorization` header:

```
Authorization: Bearer <token>
```

---

## Endpoints

### GET `/healthz`

Health check. Returns server status.

**Request:** No body required.

**Response `200`:**
```json
{ "status": "ok" }
```

---

### POST `/api/auth/login`

Authenticate a user (paramedic, driver, or director).

**Request body:**
```json
{
  "email":    "ahmad.faris@efar.com.sg",
  "password": "mypassword"
}
```

**Response `200`:**
```json
{
  "token": "<jwt-token>",
  "user": {
    "id": 42,
    "empId": "EMP-0042",
    "name": "Ahmad Faris bin Razali",
    "role": "Paramedic",
    "station": "Ang Mo Kio Station"
  }
}
```

**Error codes:**

| Code | Meaning |
|------|---------|
| `400` | Missing email or password |
| `401` | Invalid credentials |

---

### GET `/api/employee/me`

Return the authenticated user's profile.

**Response `200`:**
```json
{
  "empId":    "EMP-0042",
  "name":     "Ahmad Faris bin Razali",
  "email":    "ahmad.faris@efar.com.sg",
  "phone":    "+65 9123 4567",
  "role":     "Paramedic",
  "station":  "Ang Mo Kio Station",
  "ambulance": "AMB-15",
  "emergency": "+65 6789 0123",
  "status":   "Active"
}
```

**Error codes:**

| Code | Meaning |
|------|---------|
| `401` | Unauthenticated |

---

### GET `/api/schedule/:employeeId`

Return the schedule entries for an employee.

**Query parameters:**

| Param | Type | Required | Description |
|-------|------|----------|-------------|
| `month` | `YYYY-MM` | No | Filter by month (e.g. `2026-07`). Defaults to current month. |

**Response `200`:**
```json
{
  "employeeId": "EMP-0042",
  "month": "2026-07",
  "shifts": [
    {
      "date":       "2026-07-03",
      "shiftType":  "night",
      "hours":      "20:00 – 08:00",
      "ambulance":  "AMB-15",
      "partner": {
        "name":     "Tan Wei Liang",
        "role":     "Driver",
        "initials": "TW"
      }
    }
  ]
}
```

**Error codes:**

| Code | Meaning |
|------|---------|
| `401` | Unauthenticated |
| `403` | Forbidden (requesting another employee's schedule without director role) |
| `404` | Employee not found |

---

### GET `/api/leave/my`

Return all leave requests submitted by the authenticated user.

**Response `200`:**
```json
{
  "requests": [
    {
      "refCode":    "LR-20260611-042",
      "startDate":  "2026-06-11",
      "endDate":    "2026-06-12",
      "leaveType":  "Annual Leave",
      "status":     "Approved",
      "documentUrl": null,
      "submittedAt": "2026-06-01T09:00:00Z"
    }
  ]
}
```

**Error codes:**

| Code | Meaning |
|------|---------|
| `401` | Unauthenticated |

---

### POST `/api/leave`

Submit a new leave request.

**Request body (`multipart/form-data` for document upload, or `application/json` without):**
```json
{
  "startDate":  "2026-07-14",
  "endDate":    "2026-07-14",
  "leaveType":  "Medical Leave",
  "documentUrl": "https://res.cloudinary.com/efar/image/upload/v1/mc-doc.jpg"
}
```

**Response `201`:**
```json
{
  "refCode":   "LR-20260714-042",
  "status":    "Pending",
  "message":   "Leave request submitted successfully."
}
```

**Error codes:**

| Code | Meaning |
|------|---------|
| `400` | Missing required fields or invalid date range |
| `409` | Overlapping approved leave already exists for those dates |
| `401` | Unauthenticated |

---

### PATCH `/api/auth/password`

Change the authenticated user's password.

**Request body:**
```json
{
  "currentPassword": "oldpassword",
  "newPassword":     "newpassword123"
}
```

**Response `200`:**
```json
{ "message": "Password updated successfully." }
```

**Error codes:**

| Code | Meaning |
|------|---------|
| `400` | New password too short (< 8 chars) or missing fields |
| `401` | Current password is incorrect |

---

### POST `/webhook`

Meta webhook endpoint. Used by the WhatsApp bot — not called by the frontend.

**Verification (GET):** Meta sends `hub.challenge` query param; server echoes it back.

**Incoming message (POST):** Meta sends a JSON payload with the user's WhatsApp message; server processes the bot conversation state and replies via the Graph API.
