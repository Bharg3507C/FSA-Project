# ER Diagram

## Mermaid Source

```mermaid
erDiagram
    EMPLOYEE {
        int     id              PK
        string  emp_id          UK  "e.g. EMP-0042"
        string  full_name
        string  email           UK
        string  phone
        string  role                "Paramedic | Driver | Director"
        string  station
        string  ambulance_id
        string  status              "Active | Inactive"
        string  password_hash
        timestamp created_at
    }

    SCHEDULE {
        int     id              PK
        int     employee_id     FK
        date    shift_date
        string  shift_type          "morning | night | rest"
        string  ambulance_id
        int     paired_with     FK  "FK → EMPLOYEE.id"
        timestamp created_at
    }

    LEAVE_REQUEST {
        int     id              PK
        int     employee_id     FK
        date    start_date
        date    end_date
        string  leave_type          "Annual Leave | Medical Leave | Emergency Leave"
        string  status              "Pending | Approved | Rejected"
        string  document_url
        string  ref_code        UK  "e.g. LR-20260714-042"
        timestamp submitted_at
        timestamp reviewed_at
        int     reviewed_by     FK  "FK → EMPLOYEE.id (Director)"
    }

    CONFLICT {
        int     id              PK
        string  conflict_type       "LeaveOverlap | UncoveredUnit | InsufficientCrew"
        date    conflict_date
        int     employee_id     FK
        string  description
        string  status              "Open | Resolved"
        timestamp detected_at
    }

    EMPLOYEE ||--o{ SCHEDULE       : "is assigned to"
    EMPLOYEE ||--o{ LEAVE_REQUEST  : "submits"
    EMPLOYEE ||--o{ CONFLICT       : "is flagged in"
    EMPLOYEE ||--o{ LEAVE_REQUEST  : "reviews (as Director)"
```

## Export Instructions

1. Open [https://mermaid.live](https://mermaid.live)
2. Paste the Mermaid source above into the editor
3. Click **Export → PNG**
4. Save the file as `er-diagram.png` in this folder (`design/`)
