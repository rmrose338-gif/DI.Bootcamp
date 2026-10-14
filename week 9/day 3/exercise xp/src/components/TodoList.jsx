import { useSelector } from 'react-redux'
import TodoItem from './TodoItem.jsx'

function TodoList() {
  const todos = useSelector((state) => state.todos.todos)

  if (todos.length === 0) {
    return (
      <div className="empty-state">
        <span className="empty-mark" aria-hidden="true">✳</span>
        <p>Nothing on the list. Enjoy the breathing room.</p>
      </div>
    )
  }

  return (
    <ul className="todo-list">
      {todos.map((todo) => <TodoItem key={todo.id} todo={todo} />)}
    </ul>
  )
}

export default TodoList