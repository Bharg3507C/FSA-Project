# Database Schema — Ahmad Faris bin Razali

## Feature Scope

Tables owned by Ahmad's features: `employees`, `schedules`, `leave_requests`.  
The `conflicts` table is used read-only by the Paramedic portal and is owned by the Conflict Detection feature.

---

## Table: `employees`

Stores the profile of every EFAR staff member.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | `SERIAL` | `PRIMARY KEY` | Auto-increment internal ID |
| `emp_id` | `VARCHAR(20)` | `UNIQUE NOT NULL` | Human-readable ID (e.g. `EMP-0042`) |
| `full_name` | `VARCHAR(100)` | `NOT NULL` | Employee's legal full name |
| `email` | `VARCHAR(150)` | `UNIQUE NOT NULL` | Login email |
| `phone` | `VARCHAR(20)` | | Singapore mobile (e.g. `+65 9123 4567`) |
| `role` | `VARCHAR(20)` | `NOT NULL` | `Paramedic`, `Driver`, or `Director` |
| `station` | `VARCHAR(100)` | | Assigned ambulance station |
| `ambulance_id` | `VARCHAR(20)` | | Default ambulance unit (e.g. `AMB-15`) |
| `status` | `VARCHAR(10)` | `DEFAULT 'Active'` | `Active` or `Inactive` |
| `password_hash` | `TEXT` | `NOT NULL` | bcrypt hash of the user's password |
| `emergency_contact` | `VARCHAR(20)` | | Emergency contact phone number |
| `created_at` | `TIMESTAMPTZ` | `DEFAULT NOW()` | Row creation timestamp |

**Indexes:**
- `UNIQUE INDEX` on `emp_id`
- `UNIQUE INDEX` on `email`

---

## Table: `schedules`

Stores each employee's shift assignment per date.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | `SERIAL` | `PRIMARY KEY` | Auto-increment internal ID |
| `employee_id` | `INTEGER` | `NOT NULL REFERENCES employees(id)` | FK to the assigned employee |
| `shift_date` | `DATE` | `NOT NULL` | Calendar date of the shift |
| `shift_type` | `VARCHAR(10)` | `NOT NULL` | `morning`, `night`, or `rest` |
| `ambulance_id` | `VARCHAR(20)` | | Ambulance unit assigned for this shift |
| `paired_with` | `INTEGER` | `REFERENCES employees(id)` | FK to the paired partner (nullable) |
| `created_at` | `TIMESTAMPTZ` | `DEFAULT NOW()` | Row creation timestamp |

**Constraints:**
- `UNIQUE (employee_id, shift_date)` — one shift record per employee per day

**Indexes:**
- Composite index on `(employee_id, shift_date)` for fast monthly lookups

---

## Table: `leave_requests`

Tracks every leave request from submission through approval/rejection.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | `SERIAL` | `PRIMARY KEY` | Auto-increment internal ID |
| `employee_id` | `INTEGER` | `NOT NULL REFERENCES employees(id)` | FK to the requesting employee |
| `start_date` | `DATE` | `NOT NULL` | First day of leave |
| `end_date` | `DATE` | `NOT NULL CHECK (end_date >= start_date)` | Last day of leave |
| `leave_type` | `VARCHAR(30)` | `NOT NULL` | `Annual Leave`, `Medical Leave`, `Emergency Leave` |
| `status` | `VARCHAR(10)` | `DEFAULT 'Pending'` | `Pending`, `Approved`, or `Rejected` |
| `document_url` | `TEXT` | | Cloudinary URL of the uploaded MC image |
| `ref_code` | `VARCHAR(30)` | `UNIQUE NOT NULL` | Reference code (e.g. `LR-20260714-042`) |
| `submitted_at` | `TIMESTAMPTZ` | `DEFAULT NOW()` | When the request was submitted |
| `reviewed_at` | `TIMESTAMPTZ` | | When it was approved/rejected (nullable) |
| `reviewed_by` | `INTEGER` | `REFERENCES employees(id)` | FK to the Director who reviewed it (nullable) |

**Constraints:**
- `CHECK (status IN ('Pending', 'Approved', 'Rejected'))`
- `CHECK (leave_type IN ('Annual Leave', 'Medical Leave', 'Emergency Leave'))`
- `UNIQUE` on `ref_code`

**Indexes:**
- Index on `employee_id` for fast per-employee queries
- Index on `status` for the pending-approvals dashboard view

---

## Sample Data

```sql
INSERT INTO employees (emp_id, full_name, email, phone, role, station, ambulance_id, status, password_hash, emergency_contact)
VALUES (
  'EMP-0042',
  'Ahmad Faris bin Razali',
  'ahmad.faris@efar.com.sg',
  '+65 9123 4567',
  'Paramedic',
  'Ang Mo Kio Station',
  'AMB-15',
  'Active',
  '$2b$10$...', -- bcrypt hash
  '+65 6789 0123'
);

INSERT INTO leave_requests (employee_id, start_date, end_date, leave_type, status, ref_code)
VALUES (42, '2026-06-11', '2026-06-12', 'Annual Leave', 'Approved', 'LR-20260611-042');
```
