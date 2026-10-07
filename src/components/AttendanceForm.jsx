import { useState } from 'react'

const STATUSES = ['Present', 'Late', 'Absent']

// Today's date as YYYY-MM-DD in local time (toISOString would use UTC)
function today() {
  const d = new Date()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${d.getFullYear()}-${month}-${day}`
}

function emptyForm() {
  return { studentId: '', name: '', date: today(), status: 'Present', remarks: '' }
}

function AttendanceForm({ editingRecord, onAdd, onUpdate, onCancelEdit }) {
  const isEditing = editingRecord !== null

  // Form state starts from the record being edited, or an empty form
  const [formData, setFormData] = useState(editingRecord ?? emptyForm())
  const [error, setError] = useState('')

  function handleChange(e) {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  function handleSubmit(e) {
    e.preventDefault()

    const record = {
      ...formData,
      studentId: formData.studentId.trim(),
      name: formData.name.trim(),
      remarks: formData.remarks.trim(),
    }

    if (!record.studentId || !record.name || !record.date) {
      setError('Student ID, name, and date are required.')
      return
    }

    // Parent returns an error message if the record is rejected
    const result = isEditing ? onUpdate(record) : onAdd(record)
    if (result) {
      setError(result)
      return
    }

    setError('')
    if (!isEditing) setFormData(emptyForm())
  }

  return (
    <form className="attendance-form" onSubmit={handleSubmit}>
      <h2>{isEditing ? 'Edit Attendance' : 'Log Attendance'}</h2>

      <label>
        Student ID
        <input
          name="studentId"
          value={formData.studentId}
          onChange={handleChange}
          placeholder="e.g. 2023-0001"
        />
      </label>

      <label>
        Full Name
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="e.g. Juan Dela Cruz"
        />
      </label>

      <label>
        Date
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
        />
      </label>

      <label>
        Status
        <select name="status" value={formData.status} onChange={handleChange}>
          {STATUSES.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </label>

      <label>
        Remarks
        <textarea
          name="remarks"
          value={formData.remarks}
          onChange={handleChange}
          placeholder="Optional"
          rows={2}
        />
      </label>

      {error && <p className="form-error">{error}</p>}

      <div className="form-actions">
        <button type="submit" className="btn btn-primary">
          {isEditing ? 'Update' : 'Add Record'}
        </button>
        {isEditing && (
          <button type="button" className="btn" onClick={onCancelEdit}>
            Cancel
          </button>
        )}
      </div>
    </form>
  )
}

export default AttendanceForm
