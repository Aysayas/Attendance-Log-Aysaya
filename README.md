# Attendance Logger

A CRUD-style React app for recording student attendance (Present / Late / Absent).

Built for **ITP313 – Event-Driven Programming** (Activity: Asynchronous Programming Patterns).

## Features

- **Create** – log a student's attendance using the form
- **Read** – view all records in a table, loaded from `public/attendance.json`
- **Update** – click **Edit** on a row to load it into the form, then **Update**
- **Delete** – click **Delete** on a row (asks for confirmation)
- **Search** by name or student ID
- **Filter** by status and by date
- **Summary** counts of Present / Late / Absent for the records currently shown
- **Validation** – required fields, and no duplicate entry for the same student on the same date

## How the activity requirements are met

| Requirement | Where |
|---|---|
| At least 3 components (Parent + 2 children) | `App` (parent) → `AttendanceForm`, `AttendanceList`, `AttendanceFilters`, `AttendanceSummary` (children) → `AttendanceItem` (child of `AttendanceList`) |
| `useState` to manage data | `App.jsx` – `records`, `loading`, `error`, `editingRecord`, search/filter values |
| `useState` to manage forms | `AttendanceForm.jsx` – `formData` (controlled inputs) and `error` |
| `useEffect` to load JSON file | `App.jsx` – fetches `/attendance.json` once on mount with `async/await`, handles loading and error states |
| props to pass data | `records`, `editingRecord`, `editingId`, filter values passed down from `App` |
| props to pass functions | `onAdd`, `onUpdate`, `onCancelEdit`, `onEdit`, `onDelete`, `onSearchChange`, `onStatusChange`, `onDateChange`, `onClear` |

## Project structure

```
public/
  attendance.json          Seed data loaded by useEffect
src/
  App.jsx                  Parent: state, data loading, CRUD handlers, filtering
  components/
    AttendanceForm.jsx     Add / edit form
    AttendanceList.jsx     Table of records
    AttendanceItem.jsx     One table row with Edit / Delete buttons
    AttendanceFilters.jsx  Search, status and date filters
    AttendanceSummary.jsx  Present / Late / Absent counts
  App.css, index.css       Styles
```

## Running the app

Requires [Node.js](https://nodejs.org/).

```bash
npm install
npm run dev
```

Then open the URL shown in the terminal (usually http://localhost:5173).

> **Note:** Changes are kept in React state only. Browsers cannot write back to
> `attendance.json`, so refreshing the page reloads the original data.
