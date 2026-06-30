# Backend Test Cases — Ahmad Faris bin Razali

## Test File

`leave-api.test.js`

## How to Run

```bash
cd backend
npm test
```

Uses Node.js built-in test runner (`node:test`) — no extra dependencies required.

---

## Test Cases

| # | Test Case | What is Being Tested | Expected Outcome |
|---|-----------|---------------------|-----------------|
| 1 | Reject request missing `employeeId` | Input validation: required field check | Returns `{ valid: false, error: "Employee ID required" }` |
| 2 | Reject request missing `startDate` | Input validation: required field check | Returns `{ valid: false, error: "Start date required" }` |
| 3 | Reject request missing `endDate` | Input validation: required field check | Returns `{ valid: false, error: "End date required" }` |
| 4 | Reject request missing `leaveType` | Input validation: required field check | Returns `{ valid: false, error: "Leave type required" }` |
| 5 | Reject an unrecognised leave type | Leave type enum validation | Returns `{ valid: false, error: "Invalid leave type" }` |
| 6 | Reject end date before start date | Date range logic | Returns `{ valid: false }` with a date-range error message |
| 7 | Accept a valid Annual Leave request | Happy path — all fields present and valid | Returns `{ valid: true }` |
| 8 | Accept a valid Medical Leave request | Happy path — MC leave type | Returns `{ valid: true }` |
| 9 | Accept a same-day leave request | Edge case — start date equals end date | Returns `{ valid: true }` |
