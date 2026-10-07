import { useEffect, useState } from 'react'
import AttendanceForm from './components/AttendanceForm.jsx'
import AttendanceFilters from './components/AttendanceFilters.jsx'
import AttendanceList from './components/AttendanceList.jsx'
import AttendanceSummary from './components/AttendanceSummary.jsx'
import './App.css'

function App() {
  // Data state
  const [records, setRecords] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Record currently being edited (null = form is in "add" mode)
  const [editingRecord, setEditingRecord] = useState(null)

  // Search and filter state
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [dateFilter, setDateFilter] = useState('')

  // Load the initial records from public/attendance.json once on mount
  useEffect(() => {
    let ignore = false

    async function loadRecords() {
      try {
        const response = await fetch('/attendance.json')
        if (!response.ok) {
          throw new Error(`Failed to load data (HTTP ${response.status})`)
        }
        const data = await response.json()
        if (!ignore) setRecords(data)
      } catch (err) {
        if (!ignore) setError(err.message)
      } finally {
        if (!ignore) setLoading(false)
      }
    }

    loadRecords()

    // Prevents setting state if the component unmounts before fetch finishes
    return () => {
      ignore = true
    }
  }, [])

  // Returns an error message if the same student is already logged on that date
  function findDuplicate(record, excludeId = null) {
    const duplicate = records.find(
      (r) =>
        r.id !== excludeId &&
        r.studentId === record.studentId &&
        r.date === record.date,
    )
    return duplicate
      ? `${record.studentId} already has an entry for ${record.date}.`
      : null
  }

  // CREATE
  function handleAdd(newRecord) {
    const duplicateError = findDuplicate(newRecord)
    if (duplicateError) return duplicateError

    const nextId = records.length ? Math.max(...records.map((r) => r.id)) + 1 : 1
    setRecords([...records, { ...newRecord, id: nextId }])
    return null
  }

  // UPDATE
  function handleUpdate(updatedRecord) {
    const duplicateError = findDuplicate(updatedRecord, updatedRecord.id)
    if (duplicateError) return duplicateError

    setRecords(
      records.map((r) => (r.id === updatedRecord.id ? updatedRecord : r)),
    )
    setEditingRecord(null)
    return null
  }

  // DELETE
  function handleDelete(id) {
    const record = records.find((r) => r.id === id)
    if (!window.confirm(`Delete the record for ${record.name} on ${record.date}?`)) {
      return
    }
    setRecords(records.filter((r) => r.id !== id))
    if (editingRecord?.id === id) setEditingRecord(null)
  }

  function handleClearFilters() {
    setSearchTerm('')
    setStatusFilter('All')
    setDateFilter('')
  }

  // READ (with search and filters applied)
  const search = searchTerm.trim().toLowerCase()
  const filteredRecords = records.filter((r) => {
    const matchesSearch =
      !search ||
      r.name.toLowerCase().includes(search) ||
      r.studentId.toLowerCase().includes(search)
    const matchesStatus = statusFilter === 'All' || r.status === statusFilter
    const matchesDate = !dateFilter || r.date === dateFilter
    return matchesSearch && matchesStatus && matchesDate
  })

  return (
    <div className="app">
      <header className="app-header">
        <h1>Attendance Logger</h1>
        <p>Record and manage student attendance.</p>
      </header>

      <main className="app-main">
        <section className="panel">
          {/* key resets the form's internal state when switching between add/edit */}
          <AttendanceForm
            key={editingRecord ? editingRecord.id : 'new'}
            editingRecord={editingRecord}
            onAdd={handleAdd}
            onUpdate={handleUpdate}
            onCancelEdit={() => setEditingRecord(null)}
          />
        </section>

        <section className="panel">
          <AttendanceSummary records={filteredRecords} />
          <AttendanceFilters
            searchTerm={searchTerm}
            statusFilter={statusFilter}
            dateFilter={dateFilter}
            onSearchChange={setSearchTerm}
            onStatusChange={setStatusFilter}
            onDateChange={setDateFilter}
            onClear={handleClearFilters}
          />

          {loading && <p className="message">Loading records...</p>}
          {error && <p className="message error">{error}</p>}
          {!loading && !error && (
            <AttendanceList
              records={filteredRecords}
              totalCount={records.length}
              editingId={editingRecord?.id}
              onEdit={setEditingRecord}
              onDelete={handleDelete}
            />
          )}
        </section>
      </main>
    </div>
  )
}

export default App
