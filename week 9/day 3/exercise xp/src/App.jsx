import { useSelector } from 'react-redux'
import AddTodo from './components/AddTodo.jsx'
import TodoList from './components/TodoList.jsx'

function App() {
  const todos = useSelector((state) => state.todos.todos)
  const completedCount = todos.filter((todo) => todo.completed).length
  const remainingCount = todos.length - completedCount

  return (
    <main className="page-shell">
      <header className="topbar">
        <a className="wordmark" href="#top" aria-label="Daylist home">
          <span className="wordmark-mark" aria-hidden="true">d.</span>
          <span>daylist</span>
        </a>
        <span className="date-label">A little more focused</span>
      </header>

      <section className="workspace" id="top" aria-labelledby="page-title">
        <div className="intro">
          <p className="eyebrow"><span className="status-dot" /> YOUR SPACE, YOUR PACE</p>
          <h1 id="page-title">Make room<br />for <span>what matters.</span></h1>
          <p className="intro-copy">One thing at a time is still progress.</p>
        </div>

        <section className="todo-panel" aria-label="Your tasks">
          <div className="panel-heading">
            <div>
              <p className="section-kicker">THE LIST</p>
              <h2>Today <span className="today-dot" aria-hidden="true">●</span></h2>
            </div>
            <div className="task-count" aria-live="polite">
              <strong>{String(remainingCount).padStart(2, '0')}</strong>
              <span>TO DO</span>
            </div>
          </div>

          <AddTodo />
          <TodoList />

          <footer className="list-footer">
            <span>{completedCount} {completedCount === 1 ? 'task' : 'tasks'} finished</span>
            <span>{todos.length ? `${Math.round((completedCount / todos.length) * 100)}% complete` : 'Fresh start'}</span>
          </footer>
        </section>
      </section>

      <footer className="page-footer">
        <span>DAYLIST / 01</span>
        <span>Small steps count.</span>
      </footer>
    </main>
  )
}

export default App