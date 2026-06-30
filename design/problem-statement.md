# Problem Statement

## Client's Need

EFAR (Emergency First Aid Response) is a Singapore-based private ambulance and emergency medical services provider. The organisation currently manages paramedic and driver shift scheduling, leave approvals, and conflict resolution through informal channels — WhatsApp messages, spreadsheets, and verbal communication. This creates delays, scheduling conflicts, and administrative overhead for the Operations Director.

## Target Users

| User | Role |
|------|------|
| Operations Director | Plans rosters, approves leave, resolves conflicts, manages the employee database |
| Paramedic | Views own schedule, applies for leave, checks shift partner and ambulance assignment |
| Driver | Views schedule and applies for leave (same portal as Paramedic) |

## Problems Being Solved

1. **Roster planning is manual** — scheduling 12-hour shifts (08:00–20:00 morning, 20:00–08:00 night) across dozens of employees with paired ambulance units requires hours of manual work each month.
2. **Leave requests are untracked** — requests via WhatsApp are lost, duplicated, or unanswered, leading to unplanned gaps in coverage.
3. **Conflicts are discovered late** — two employees requesting the same leave period, or an ambulance unit left without a crew, is only noticed on the day.
4. **No self-service for employees** — paramedics and drivers must call or message the director to find out their schedule.

## Success Criteria

- The Operations Director can generate a full monthly roster in under 5 minutes using the auto-scheduler.
- Employees can view their own schedule and submit leave requests through a self-service portal without contacting the director.
- The system automatically detects and flags scheduling conflicts before they become operational problems.
- Leave requests are tracked end-to-end with status visibility for both the employee and the director.
- A WhatsApp bot integration allows field staff to submit leave requests conversationally without opening a browser.
