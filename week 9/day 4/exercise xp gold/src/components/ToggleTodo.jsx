import { useDispatch } from 'react-redux'
import { toggleTodo } from '../redux/todosSlice.js'

export default function ToggleTodo({ id, completed, title }) {
  const dispatch = useDispatch()

  return (
    <button
      className={`todo-check${completed ? ' is-complete' : ''}`}
      type="button"
      aria-label={`${completed ? 'Mark as not done' : 'Mark as done'}: ${title}`}
      aria-pressed={completed}
      onClick={() => dispatch(toggleTodo(id))}
    >
      {completed && <span aria-hidden="true">✓</span>}
    </button>
  )
}