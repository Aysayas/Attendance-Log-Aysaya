function AttendanceSummary({ records }) {
  const count = (status) => records.filter((r) => r.status === status).length

  return (
    <div className="summary">
      <div className="summary-card">
        <span className="summary-value">{records.length}</span>
        <span className="summary-label">Total</span>
      </div>
      <div className="summary-card present">
        <span className="summary-value">{count('Present')}</span>
        <span className="summary-label">Present</span>
      </div>
      <div className="summary-card late">
        <span className="summary-value">{count('Late')}</span>
        <span className="summary-label">Late</span>
      </div>
      <div className="summary-card absent">
        <span className="summary-value">{count('Absent')}</span>
        <span className="summary-label">Absent</span>
      </div>
    </div>
  )
}

export default AttendanceSummary
