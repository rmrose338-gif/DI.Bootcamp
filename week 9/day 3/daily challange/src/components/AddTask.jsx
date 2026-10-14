import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addTask } from '../redux/tasksSlice.js'

function AddTask({ date }) {
  const [title, setTitle] = useState('')
  const [time, setTime] = useState('')
  const [notes, setNotes] = useState('')
  const dispatch = useDispatch()

  function handleSubmit(event) {
    event.preventDefault()
    const trimmedTitle = title.trim()
    if (!trimmedTitle) return

    dispatch(addTask({
      date,
      task: {
        id: crypto.randomUUID(),
        title: trimmedTitle,
        time,
        notes: notes.trim(),
      },
    }))
    setTitle('')
    setTime('')
    setNotes('')
  }

  return (
    <form className="add-task-form" onSubmit={handleSubmit}>
      <label htmlFor="task-title">Task</label>
      <input
        id="task-title"
        type="text"
        placeholder="e.g. Prepare weekly review"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        maxLength={100}
        required
      />
      <div className="form-row">
        <div className="time-field">
          <label htmlFor="task-time">Time</label>
          <input id="task-time" type="time" value={time} onChange={(event) => setTime(event.target.value)} />
        </div>
        <button className="add-button" type="submit" disabled={!title.trim()}>
          <span aria-hidden="true">+</span> Add task
        </button>
      </div>
      <label htmlFor="task-notes">Notes <span className="optional-label">OPTIONAL</span></label>
      <textarea
        id="task-notes"
        placeholder="A detail to remember..."
        rows="2"
        value={notes}
        onChange={(event) => setNotes(event.target.value)}
        maxLength={240}
      />
    </form>
  )
}

export default AddTask