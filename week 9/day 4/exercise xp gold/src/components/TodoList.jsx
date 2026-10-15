import { useSelector } from 'react-redux'
import RemoveTodo from './RemoveTodo.jsx'
import ToggleTodo from './ToggleTodo.jsx'

export default function TodoList({ filter }) {
  const { items, status, error } = useSelector((state) => state.todos)
  const visibleTodos = items.filter((todo) => {
    if (filter === 'active') return !todo.completed
    if (filter === 'done') return todo.completed
    return true
  })

  if (status === 'loading' && items.length === 0) {
    return <div className="list-message" role="status"><span className="loader" /> Fetching your list...</div>
  }

  if (status === 'failed' && items.length === 0) {
    return <div className="list-message error-message" role="alert">{error}</div>
  }

  if (visibleTodos.length === 0) {
    return <div className="list-message empty-message">{items.length ? 'Nothing in this view. Enjoy the quiet.' : 'Your list is clear. Add a task to begin.'}</div>
  }

  return (
    <ul className="todo-list" aria-label="Todo items" aria-busy={status === 'loading'}>
      {visibleTodos.map((todo, index) => (
        <li className={`todo-row${todo.completed ? ' completed' : ''}`} key={todo.id}>
          <span className="row-number">{String(index + 1).padStart(2, '0')}</span>
          <ToggleTodo id={todo.id} completed={todo.completed} title={todo.title} />
          <span className="todo-title">{todo.title}</span>
          {todo.local && <span className="local-tag">LOCAL</span>}
          <RemoveTodo id={todo.id} title={todo.title} />
        </li>
      ))}
    </ul>
  )
}