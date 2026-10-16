import { useCallback, useState } from 'react'
import { nanoid } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import { addTodo, removeTodo, setVisibilityFilter, toggleTodo } from '../redux/todosSlice.js'
import { selectFilteredTodosCount, selectTodos, selectVisibilityFilter } from '../redux/selectors.js'

const filters = ['All', 'Active', 'Completed']

function TodoList() {
  const dispatch = useDispatch()
  const todos = useSelector(selectTodos)
  const visibilityFilter = useSelector(selectVisibilityFilter)
  const filteredCount = useSelector(selectFilteredTodosCount)
  const [draft, setDraft] = useState('')

  const handleToggle = useCallback((todoId) => {
    dispatch(toggleTodo(todoId))
  }, [dispatch])

  const handleDelete = useCallback((todoId) => {
    dispatch(removeTodo(todoId))
  }, [dispatch])

  const handleFilterChange = useCallback((filter) => {
    dispatch(setVisibilityFilter(filter))
  }, [dispatch])

  const handleSubmit = useCallback((event) => {
    event.preventDefault()
    const text = draft.trim()
    if (!text) return

    dispatch(addTodo({ id: nanoid(), text }))
    setDraft('')
  }, [dispatch, draft])

  return (
    <main className="daybook-shell">
      <header className="topbar">
        <a className="brand" href="#today" aria-label="Daybook home">
          <span className="brand-mark" aria-hidden="true">d.</span>
          <span>DAYBOOK</span>
        </a>
        <span className="topbar-label">A LITTLE ORDER FOR THE DAY</span>
        <span className="date-stamp">FIELD NOTE <span>009</span></span>
      </header>

      <section className="todo-app" id="today" aria-labelledby="page-title">
        <div className="intro">
          <p className="eyebrow"><span className="live-dot" /> YOUR DAILY LIST <span className="slash">/</span> ONE THING AT A TIME</p>
          <div className="intro-row">
            <h1 id="page-title">Make room<br /><em>for done.</em></h1>
            <p className="intro-copy">A small place to gather what matters today, and let the finished things go.</p>
          </div>
        </div>

        <form className="add-form" onSubmit={handleSubmit}>
          <label className="visually-hidden" htmlFor="new-todo">Add a task</label>
          <span className="add-mark" aria-hidden="true">＋</span>
          <input
            id="new-todo"
            type="text"
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            placeholder="What needs a little attention?"
            maxLength={120}
          />
          <button type="submit" disabled={!draft.trim()}>Add task <span aria-hidden="true">↗</span></button>
        </form>

        <div className="list-toolbar">
          <div className="list-title">
            <h2>Today's list</h2>
            <span>{String(filteredCount).padStart(2, '0')} {filteredCount === 1 ? 'TASK' : 'TASKS'}</span>
          </div>
          <div className="filter-tabs" role="group" aria-label="Filter tasks">
            {filters.map((filter) => (
              <button
                className={visibilityFilter === filter ? 'filter-button is-active' : 'filter-button'}
                type="button"
                key={filter}
                aria-pressed={visibilityFilter === filter}
                onClick={() => handleFilterChange(filter)}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <ul className="todo-list" aria-live="polite">
          {todos.map((todo, index) => (
            <li className={todo.completed ? 'todo-row is-complete' : 'todo-row'} key={todo.id}>
              <span className="task-number">{String(index + 1).padStart(2, '0')}</span>
              <button
                className="completion-toggle"
                type="button"
                role="checkbox"
                aria-checked={todo.completed}
                aria-label={`${todo.completed ? 'Mark active' : 'Complete'}: ${todo.text}`}
                onClick={() => handleToggle(todo.id)}
              >
                <span aria-hidden="true">{todo.completed ? '✓' : ''}</span>
              </button>
              <span className="todo-text">{todo.text}</span>
              <span className="status-label">{todo.completed ? 'DONE' : 'UP NEXT'}</span>
              <button
                className="delete-button"
                type="button"
                aria-label={`Delete: ${todo.text}`}
                title="Delete task"
                onClick={() => handleDelete(todo.id)}
              >
                <span aria-hidden="true">×</span>
              </button>
            </li>
          ))}
          {todos.length === 0 && (
            <li className="empty-state">
              <span aria-hidden="true">✳</span>
              <p>{visibilityFilter === 'All' ? 'A clear page.' : `Nothing ${visibilityFilter.toLowerCase()} right now.`}</p>
            </li>
          )}
        </ul>

        <footer className="list-footer">
          <span>SHOWING {String(filteredCount).padStart(2, '0')} {filteredCount === 1 ? 'TASK' : 'TASKS'}</span>
          <span className="footer-rule" />
          <span>SMALL STEPS COUNT <span aria-hidden="true">✳</span></span>
        </footer>
      </section>
    </main>
  )
}

export default TodoList