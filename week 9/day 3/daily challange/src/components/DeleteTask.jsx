import { useDispatch } from 'react-redux'
import { deleteTask } from '../redux/tasksSlice.js'

function DeleteTask({ date, taskId }) {
  const dispatch = useDispatch()

  return (
    <button
      className="task-action delete-action"
      type="button"
      aria-label="Delete task"
      title="Delete task"
      onClick={() => dispatch(deleteTask({ date, taskId }))}
    >
      <span aria-hidden="true">×</span>
    </button>
  )
}

export default DeleteTask