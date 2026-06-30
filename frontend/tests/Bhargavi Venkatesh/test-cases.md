# Frontend Test Cases — Ahmad Faris bin Razali

## Test File

`paramedic-portal.test.js`

## How to Run

```bash
cd frontend
npm install
npm test
```

---

## Test Cases

| # | Test Case | What is Being Tested | Expected Outcome |
|---|-----------|---------------------|-----------------|
| 1 | `getShift` returns "rest" for unknown month | Schedule lookup with no data for the requested month | Returns `"rest"` as the default |
| 2 | `getShift` returns correct shift type for a known date | Schedule lookup for a date that exists in the data | Returns the exact shift type (`"morning"`, `"night"`, etc.) |
| 3 | Working-day count is calculated correctly | Counting `morning` + `night` entries in a month's data | Returns the correct integer count |
| 4 | `isWorkingShift` discriminates shift types correctly | Boolean helper that returns `true` only for working shifts | `true` for `morning`/`night`; `false` for `rest`, `leaveApproved`, `leavePending` |
| 5 | Month key is formatted as `YYYY-MM` with zero-padding | String formatting for the schedule data key | `2026-06` for June, `2026-12` for December |
