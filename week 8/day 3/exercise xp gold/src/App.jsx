import { useReducer, useState } from 'react';

const initialState = { todos: [], nextId: 1 };

function todoReducer(state, action) {
  switch (action.type) {
    case 'add': {
      const text = action.text.trim();
      if (!text) return state;

      return {
        todos: [...state.todos, { id: state.nextId, text }],
        nextId: state.nextId + 1,
      };
    }
    case 'remove':
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.id),
      };
    default:
      return state;
  }
}

function TodoList() {
  const [state, dispatch] = useReducer(todoReducer, initialState);
  const [newTodo, setNewTodo] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    const text = newTodo.trim();
    if (!text) return;

    dispatch({ type: 'add', text });
    setNewTodo('');
  }

  function removeTodo(id) {
    dispatch({ type: 'remove', id });
  }

  return (
    <main className="todo-page">
      <header className="topbar">
        <a className="course-mark" href="#top" aria-label="Week 8 reducer exercise">
          <span className="course-mark__dot" />
          <span>REACT / WEEK 08</span>
        </a>
        <span className="topbar__lesson">DAY 03 · EXERCISE XP GOLD</span>
      </header>

      <div className="todo-content" id="top">
        <section className="intro" aria-labelledby="page-title">
          <p className="eyebrow">A little less to remember</p>
          <h1 id="page-title">Make room<br />for what’s next.</h1>
          <p className="intro__copy">A focused list, managed with one small reducer.</p>
        </section>

        <section className="list-panel" aria-labelledby="list-title">
          <div className="list-heading">
            <div>
              <p className="eyebrow">Your list</p>
              <h2 id="list-title">Things to do</h2>
            </div>
            <span className="todo-count" aria-label={`${state.todos.length} items`}>
              {String(state.todos.length).padStart(2, '0')}
            </span>
          </div>

          <form className="add-form" onSubmit={handleSubmit}>
            <label className="sr-only" htmlFor="new-todo">Add a todo</label>
            <input
              id="new-todo"
              type="text"
              value={newTodo}
              onChange={(event) => setNewTodo(event.target.value)}
              placeholder="What needs doing?"
              autoComplete="off"
            />
            <button type="submit" disabled={!newTodo.trim()}>
              <span aria-hidden="true">+</span>
              <span>Add task</span>
            </button>
          </form>

          {state.todos.length === 0 ? (
            <div className="empty-state">
              <span className="empty-state__mark" aria-hidden="true">+</span>
              <p>Your list is clear.</p>
              <span>Add a task when you’re ready.</span>
            </div>
          ) : (
            <ul className="todo-items" aria-label="Todo items">
              {state.todos.map((todo) => (
                <li className="todo-item" key={todo.id}>
                  <span className="todo-item__bullet" aria-hidden="true" />
                  <span className="todo-item__text">{todo.text}</span>
                  <button
                    className="remove-button"
                    type="button"
                    onClick={() => removeTodo(todo.id)}
                    aria-label={`Remove ${todo.text}`}
                    title="Remove task"
                  >
                    <span aria-hidden="true">×</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>

        <footer className="page-footer">
          <span>useReducer</span>
          <span className="footer-divider" aria-hidden="true">/</span>
          <span>add</span>
          <span className="footer-divider" aria-hidden="true">/</span>
          <span>remove</span>
        </footer>
      </div>
    </main>
  );
}

export default function App() {
  return <TodoList />;
}