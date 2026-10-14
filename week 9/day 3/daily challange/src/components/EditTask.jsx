import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { editTask } from '../redux/tasksSlice.js'

function EditTask({ date, task, onClose }) {
  const [title, setTitle] = useState(task.title)
  const [time, setTime] = useState(task.time ?? '')
  const [notes, setNotes] = useState(task.notes ?? '')
  const dispatch = useDispatch()

  function handleSubmit(event) {
    event.preventDefault()
    const trimmedTitle = title.trim()
    if (!trimmedTitle) return

    dispatch(editTask({
      date,
      taskId: task.id,
      updates: { title: trimmedTitle, time, notes: notes.trim() },
    }))
    onClose()
  }

  return (
    <div className="dialog-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}>
      <section className="edit-dialog" role="dialog" aria-modal="true" aria-labelledby="edit-title">
        <div className="dialog-heading">
          <div>
            <p className="calendar-kicker">UPDATE YOUR PLAN</p>
            <h2 id="edit-title">Edit task</h2>
          </div>
          <button className="icon-button close-button" type="button" onClick={onClose} aria-label="Close edit dialog">×</button>
        </div>
        <form className="add-task-form" onSubmit={handleSubmit}>
          <label htmlFor="edit-task-title">Task</label>
          <input id="edit-task-title" type="text" value={title} onChange={(event) => setTitle(event.target.value)} maxLength={100} required autoFocus />
          <div className="form-row">
            <div className="time-field">
              <label htmlFor="edit-task-time">Time</label>
              <input id="edit-task-time" type="time" value={time} onChange={(event) => setTime(event.target.value)} />
            </div>
          </div>
          <label htmlFor="edit-task-notes">Notes</label>
          <textarea id="edit-task-notes" rows="3" value={notes} onChange={(event) => setNotes(event.target.value)} maxLength={240} />
          <div className="dialog-actions">
            <button className="secondary-button" type="button" onClick={onClose}>Cancel</button>
            <button className="add-button" type="submit">Save changes</button>
          </div>
        </form>
      </section>
    </div>
  )
}

export default EditTask