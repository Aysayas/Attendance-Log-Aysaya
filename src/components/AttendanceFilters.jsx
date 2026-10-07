function AttendanceFilters({
  searchTerm,
  statusFilter,
  dateFilter,
  onSearchChange,
  onStatusChange,
  onDateChange,
  onClear,
}) {
  return (
    <div className="filters">
      <input
        type="search"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search by name or student ID"
        aria-label="Search by name or student ID"
      />
      <select
        value={statusFilter}
        onChange={(e) => onStatusChange(e.target.value)}
        aria-label="Filter by status"
      >
        <option value="All">All statuses</option>
        <option value="Present">Present</option>
        <option value="Late">Late</option>
        <option value="Absent">Absent</option>
      </select>
      <input
        type="date"
        value={dateFilter}
        onChange={(e) => onDateChange(e.target.value)}
        aria-label="Filter by date"
      />
      <button type="button" className="btn" onClick={onClear}>
        Clear
      </button>
    </div>
  )
}

export default AttendanceFilters
