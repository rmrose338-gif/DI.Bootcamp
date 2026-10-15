import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AddTodo from './components/AddTodo.jsx'
import TodoList from './components/TodoList.jsx'
import { fetchTodos } from './redux/todosSlice.js'

const filters = [
  { id: 'all', label: 'All' },
  { id: 'active', label: 'To do' },
  { id: 'done', label: 'Done' },
]

function App() {
  const dispatch = useDispatch()
  const { items, status, error } = useSelector((state) => state.todos)
  const [filter, setFilter] = useState('all')
  const completedCount = items.filter((todo) => todo.completed).length
  const remainingCount = items.length - completedCount

  useEffect(() => {
    dispatch(fetchTodos())
  }, [dispatch])

  return (
    <main className="workspace">
      <header className="topbar">
        <a className="wordmark" href="#top" aria-label="Done and Doing home">
          <span className="wordmark-mark" aria-hidden="true">d.</span>
          <span>DONE / DOING</span>
        </a>
        <span className="topbar-note">A clear mind starts somewhere.</span>
        <span className="date-stamp">PERSONAL SYSTEM <span>/</span> 001</span>
      </header>

      <section className="todo-panel" id="top" aria-labelledby="page-title">
        <div className="heading-row">
          <div>
            <p className="eyebrow"><span className="status-dot" /> YOUR SPACE <span className="eyebrow-divider">/</span> {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' }).toUpperCase()}</p>
            <h1 id="page-title">Make room<br />for what matters.</h1>
            <p className="intro">A small list is a good place to start.</p>
          </div>
          <div className="completion-mark" aria-label={`${completedCount} of ${items.length} completed`}>
            <span>{String(completedCount).padStart(2, '0')}</span>
            <i aria-hidden="true" />
            <span className="completion-total">{String(items.length).padStart(2, '0')}</span>
            <small>DONE</small>
          </div>
        </div>

        <AddTodo />

        <div className="list-toolbar">
          <div className="filter-tabs" role="tablist" aria-label="Filter tasks">
            {filters.map((item) => (
              <button
                className={filter === item.id ? 'filter-tab selected' : 'filter-tab'}
                type="button"
                role="tab"
                aria-selected={filter === item.id}
                key={item.id}
                onClick={() => setFilter(item.id)}
              >
                {item.label}
              </button>
            ))}
          </div>
          <span className="remaining-count">{remainingCount} {remainingCount === 1 ? 'TASK' : 'TASKS'} LEFT</span>
        </div>

        {status === 'failed' && items.length > 0 && (
          <div className="inline-error" role="alert">
            <span>Could not refresh the list: {error}</span>
            <button type="button" onClick={() => dispatch(fetchTodos())}>Retry</button>
          </div>
        )}

        <TodoList filter={filter} />

        <footer className="panel-footer">
          <div className="sync-status">
            <span className={status === 'loading' ? 'sync-dot syncing' : 'sync-dot'} />
            {status === 'loading' ? 'SYNCING LIST' : status === 'failed' ? 'OFFLINE' : 'LIST IN SYNC'}
          </div>
          <button className="refresh-button" type="button" onClick={() => dispatch(fetchTodos())} disabled={status === 'loading'}>
            <span aria-hidden="true">↻</span> Refresh list
          </button>
        </footer>
      </section>

      <footer className="page-footer">
        <span>ONE THING AT A TIME</span>
        <span className="footer-rule" />
        <span>BUILT FOR A LITTLE MORE CLARITY</span>
      </footer>
    </main>
  )
}

export default App