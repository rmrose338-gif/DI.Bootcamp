import { useState } from 'react'
import { useSelector } from 'react-redux'
import DeleteTask from './DeleteTask.jsx'
import EditTask from './EditTask.jsx'

const timeFormatter = new Intl.DateTimeFormat('en', { hour: 'numeric', minute: '2-digit' })

function formatTime(value) {
  if (!value) return 'ANYTIME'
  const [hours, minutes] = value.split(':').map(Number)
  const date = new Date(2000, 0, 1, hours, minutes)
  return timeFormatter.format(date)
}

function TaskList({ date }) {
  const tasks = useSelector((state) => state.tasks.tasksByDate[date] ?? [])
  const [editingTask, setEditingTask] = useState(null)
  const sortedTasks = [...tasks].sort((first, second) => {
    if (!first.time) return second.time ? 1 : 0
    if (!second.time) return -1
    return first.time.localeCompare(second.time)
  })

  return (
    <>
      {tasks.length === 0 ? (
        <div className="empty-state">
          <span className="empty-icon" aria-hidden="true">◷</span>
          <h3>A day with room to breathe.</h3>
          <p>Add a task when something comes to mind.</p>
        </div>
      ) : (
        <ul className="task-list">
          {sortedTasks.map((task, index) => (
            <li className="task-item" key={task.id}>
              <span className={`task-rail rail-${index % 4}`} aria-hidden="true" />
              <div className="task-time">{formatTime(task.time)}</div>
              <div className="task-content">
                <h3>{task.title}</h3>
                {task.notes && <p>{task.notes}</p>}
              </div>
              <div className="task-actions">
                <button className="task-action edit-action" type="button" onClick={() => setEditingTask(task)} aria-label={`Edit ${task.title}`} title="Edit task">
                  <span aria-hidden="true">↗</span>
                </button>
                <DeleteTask date={date} taskId={task.id} />
              </div>
            </li>
          ))}
        </ul>
      )}
      {editingTask && <EditTask date={date} task={editingTask} onClose={() => setEditingTask(null)} />}
    </>
  )
}

export default TaskList