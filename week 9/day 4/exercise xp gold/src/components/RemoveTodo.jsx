import { useDispatch } from 'react-redux'
import { removeTodo } from '../redux/todosSlice.js'

export default function RemoveTodo({ id, title }) {
  const dispatch = useDispatch()

  return (
    <button
      className="remove-button"
      type="button"
      aria-label={`Remove: ${title}`}
      title="Remove task"
      onClick={() => dispatch(removeTodo(id))}
    >
      <span aria-hidden="true">×</span>
    </button>
  )
}