# Use Cases — Ahmad Faris bin Razali

## Feature Scope

Ahmad is responsible for the **Paramedic / Driver self-service portal** — the client-side dashboard that allows field staff to view their schedule, apply for leave, and manage their profile and password.

---

## UC-01: View Dashboard

**Actor:** Paramedic / Driver
**Trigger:** User logs in and lands on the Dashboard tab.

**Main Flow:**
1. System greets the user by first name with the current date and assigned station.
2. System displays the next upcoming shift: date, time range (08:00–20:00 or 20:00–08:00), ambulance unit, and paired partner.
3. System shows four monthly stat cards: total working days, approved leave days, pending leave days, and remaining annual leave balance.
4. System lists the next upcoming working shifts in chronological order with date, ambulance unit, partner, time range, and shift type label.

**Edge Cases / Alternative Flows:**
- If no upcoming shifts exist in the next 30 days, the "Next Shift" card displays "No upcoming shifts scheduled."
- If the user has no leave requests this month, approved and pending counts display 0.

---

## UC-02: View Monthly Schedule

**Actor:** Paramedic / Driver
**Trigger:** User clicks the "Monthly Schedule" tab.

**Main Flow:**
1. System displays the current month's calendar with day-of-week headers (Sun–Sat).
2. Each day cell is colour-coded: Morning shift (indigo), Night shift (dark navy), Approved Leave (green), Pending Leave (yellow), Rest Day (grey).
3. Working-day cells show the shift type, time range, ambulance unit, and partner name.
4. User clicks the left/right arrows to navigate to an adjacent month.
5. User clicks a working-shift day cell to open a shift detail panel.
6. Shift detail panel shows: formatted date, shift type badge, shift hours, ambulance unit, station, and paired partner (name, role, initials avatar).
7. User clicks × to close the detail panel.

**Edge Cases:**
- Clicking a Rest Day or Leave cell does nothing; no detail panel appears.
- Navigating to a month with no schedule data shows all days as Rest Day.

---

## UC-03: Submit Leave Request (WhatsApp Bot)

**Actor:** Paramedic / Driver
**Trigger:** User sends the message "leave" via WhatsApp.

**Main Flow:**
1. Bot replies asking for the user's full name.
2. User provides their name; bot confirms and asks for their role.
3. User states their role (Paramedic/Driver); bot confirms and asks for the leave dates.
4. User provides the date(s); bot confirms and asks for their Ambulance ID.
5. User provides the Ambulance ID; bot confirms and asks for the leave type (Annual / MC / Emergency).
6. User states the leave type; bot confirms and requests a supporting document (required for MC).
7. User uploads an image; bot confirms receipt and returns a reference code (e.g. LR-20260714-042).

**Edge Cases / Alternative Flows:**
- If no image is uploaded when MC is selected, bot re-prompts: "Please upload your medical certificate to continue."
- If the user sends an unrecognised message mid-flow, bot re-asks the current question.

---

## UC-04: View Profile

**Actor:** Paramedic / Driver
**Trigger:** User clicks the "Profile" tab.

**Main Flow:**
1. System displays the employee card: initials avatar, full name, role, assigned station, employee ID, and Active badge.
2. System shows an information banner: "Profile updates require HR approval."
3. System shows the Employee Information grid: Employee ID, Full Name, Email Address, Phone Number, Role, Assigned Station, Emergency Contact.

**Edge Cases:**
- All fields are read-only; no inline editing is available.

---

## UC-05: Change Password

**Actor:** Paramedic / Driver
**Trigger:** User navigates to the "Settings" tab.

**Main Flow:**
1. System displays the Change Password form with three fields: Current Password, New Password, Confirm New Password.
2. User fills in all three fields and clicks **Save Changes**.
3. System verifies the current password is correct.
4. System checks that New Password and Confirm New Password match.
5. System enforces a minimum length of 8 characters for the new password.
6. System updates the password hash in the database and displays a success message.

**Edge Cases:**
- If the current password is incorrect, display: "Incorrect current password."
- If the new passwords do not match, display: "Passwords do not match."
- If the new password is fewer than 8 characters, display: "Password must be at least 8 characters."

---

## UC-06: Sign Out

**Actor:** Paramedic / Driver
**Trigger:** User clicks their name or avatar in the top-right corner of the portal.

**Main Flow:**
1. System displays a small dropdown containing a **Sign Out** button.
2. User clicks **Sign Out**.
3. System clears the session and redirects the user to the public landing page.

**Edge Cases:**
- If the dropdown is open and the user clicks elsewhere, it closes without signing out.
