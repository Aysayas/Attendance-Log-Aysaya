function AttendanceItem({ record, isEditing, onEdit, onDelete }) {
  return (
    <tr className={isEditing ? 'row-editing' : ''}>
      <td>{record.studentId}</td>
      <td>{record.name}</td>
      <td>{record.date}</td>
      <td>
        <span className={`badge badge-${record.status.toLowerCase()}`}>
          {record.status}
        </span>
      </td>
      <td className="remarks">{record.remarks || '—'}</td>
      <td className="actions">
        <button className="btn btn-small" onClick={() => onEdit(record)}>
          Edit
        </button>
        <button
          className="btn btn-small btn-danger"
          onClick={() => onDelete(record.id)}
        >
          Delete
        </button>
      </td>
    </tr>
  )
}

export default AttendanceItem
