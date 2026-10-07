import AttendanceItem from './AttendanceItem.jsx'

function AttendanceList({ records, totalCount, editingId, onEdit, onDelete }) {
  if (totalCount === 0) {
    return <p className="message">No attendance records yet. Add one using the form.</p>
  }

  if (records.length === 0) {
    return <p className="message">No records match your search or filters.</p>
  }

  // Newest dates first, then by name
  const sorted = [...records].sort(
    (a, b) => b.date.localeCompare(a.date) || a.name.localeCompare(b.name),
  )

  return (
    <div className="table-wrapper">
      <table className="attendance-table">
        <thead>
          <tr>
            <th>Student ID</th>
            <th>Name</th>
            <th>Date</th>
            <th>Status</th>
            <th>Remarks</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((record) => (
            <AttendanceItem
              key={record.id}
              record={record}
              isEditing={record.id === editingId}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </tbody>
      </table>
      <p className="table-count">
        Showing {records.length} of {totalCount} records
      </p>
    </div>
  )
}

export default AttendanceList
