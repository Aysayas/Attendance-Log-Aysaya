function AttendanceItem({ record, isEditing, onEdit, onDelete }) {
  return (
    <tr className={isEditing ? 'row-editing' : ''}>
      <td className="nowrap">{record.studentId}</td>
      <td>{record.name}</td>
      <td className="nowrap">{record.date}</td>
      <td>
        <span className={`badge badge-${record.status.toLowerCase()}`}>
          {record.status}
        </span>
      </td>
      <td className="remarks">{record.remarks || '—'}</td>
      <td>
        <div className="actions">
          <button className="btn btn-small" onClick={() => onEdit(record)}>
            Edit
          </button>
          <button
            className="btn btn-small btn-danger"
            onClick={() => onDelete(record.id)}
          >
            Delete
          </button>
        </div>
      </td>
    </tr>
  )
}

export default AttendanceItem
