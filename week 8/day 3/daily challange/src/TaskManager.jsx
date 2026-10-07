import { useEffect, useRef, useState } from 'react';
import { useTasks } from './TaskContext.jsx';

const filterOptions = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'completed', label: 'Completed' },
];

function AddTaskForm() {
  const [text, setText] = useState('');
  const { addTask } = useTasks();

  function handleSubmit(event) {
    event.preventDefault();
    if (!text.trim()) return;
    addTask(text);
    setText('');
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <label className="sr-only" htmlFor="task-input">New task</label>
      <input
        id="task-input"
        value={text}
        onChange={(event) => setText(event.target.value)}
        placeholder="Add a task to your list..."
        autoComplete="off"
      />
      <button type="submit" disabled={!text.trim()}><span aria-hidden="true">+</span> Add task</button>
    </form>
  );
}

function TaskItem({ task }) {
  const { toggleTask, editTask, removeTask } = useTasks();
  const [isEditing, setIsEditing] = useState(false);
  const [editError, setEditError] = useState('');
  const editInputRef = useRef(null);

  useEffect(() => {
    if (isEditing) editInputRef.current?.focus();
  }, [isEditing]);

  function saveEdit(event) {
    event.preventDefault();
    const text = editInputRef.current?.value.trim() ?? '';
    if (!text) {
      setEditError('A task needs a name.');
      editInputRef.current?.focus();
      return;
    }
    editTask(task.id, text);
    setEditError('');
    setIsEditing(false);
  }

  function cancelEdit() {
    setEditError('');
    setIsEditing(false);
  }

  return (
    <li className={`task-item${task.completed ? ' task-item--completed' : ''}`}>
      <label className="task-toggle">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => toggleTask(task.id)}
          aria-label={`${task.completed ? 'Mark' : 'Complete'} ${task.text}`}
        />
        <span className="task-toggle__box" aria-hidden="true" />
      </label>
      {isEditing ? (
        <form className="edit-form" onSubmit={saveEdit}>
          <div className="edit-field">
            <label className="sr-only" htmlFor={`edit-task-${task.id}`}>Edit task</label>
            <input
              id={`edit-task-${task.id}`}
              ref={editInputRef}
              defaultValue={task.text}
              onKeyDown={(event) => { if (event.key === 'Escape') cancelEdit(); }}
              aria-describedby={editError ? `edit-error-${task.id}` : undefined}
            />
            {editError && <span className="edit-error" id={`edit-error-${task.id}`}>{editError}</span>}
          </div>
          <button className="save-button" type="submit">Save</button>
          <button className="cancel-button" type="button" onClick={cancelEdit}>Cancel</button>
        </form>
      ) : (
        <>
          <span className="task-item__text">{task.text}</span>
          <button className="edit-button" type="button" onClick={() => setIsEditing(true)} aria-label={`Edit ${task.text}`}>Edit</button>
          <button className="remove-button" type="button" onClick={() => removeTask(task.id)} aria-label={`Remove ${task.text}`} title="Remove task">
            <span aria-hidden="true">×</span>
          </button>
        </>
      )}
    </li>
  );
}

function TaskList() {
  const { tasks, filter } = useTasks();
  const visibleTasks = tasks.filter((task) => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  if (visibleTasks.length === 0) {
    const message = tasks.length === 0
      ? 'Add a task to get started.'
      : `No ${filter} tasks right now.`;
    return (
      <div className="empty-state">
        <span className="empty-state__mark" aria-hidden="true">✓</span>
        <p>{tasks.length === 0 ? 'Nothing on the list.' : 'All clear here.'}</p>
        <span>{message}</span>
      </div>
    );
  }

  return (
    <ul className="task-list" aria-label={`${filter} tasks`}>
      {visibleTasks.map((task) => <TaskItem key={task.id} task={task} />)}
    </ul>
  );
}

function TaskFilters() {
  const { filter, setFilter, tasks } = useTasks();
  const counts = {
    all: tasks.length,
    active: tasks.filter((task) => !task.completed).length,
    completed: tasks.filter((task) => task.completed).length,
  };

  return (
    <div className="filter-bar" role="group" aria-label="Filter tasks">
      {filterOptions.map((option) => (
        <button
          className={`filter-button${filter === option.value ? ' filter-button--active' : ''}`}
          type="button"
          key={option.value}
          onClick={() => setFilter(option.value)}
          aria-pressed={filter === option.value}
        >
          {option.label}<span>{counts[option.value]}</span>
        </button>
      ))}
    </div>
  );
}

export default function TaskManager() {
  const { tasks } = useTasks();
  const remainingCount = tasks.filter((task) => !task.completed).length;
  const completedCount = tasks.length - remainingCount;

  return (
    <main className="page">
      <header className="topbar">
        <a className="course-mark" href="#top" aria-label="Week 8 task manager exercise">
          <span className="course-mark__dot" /> REACT / WEEK 08
        </a>
        <span className="lesson-mark">DAY 03 · DAILY CHALLENGE</span>
      </header>
      <div className="content" id="top">
        <section className="intro" aria-labelledby="page-title">
          <p className="eyebrow">Tasks, in their place</p>
          <h1 id="page-title">Plan the work.<br />Clear the mind.</h1>
          <p className="intro-copy">Add tasks, revise the plan, and focus on what’s still ahead.</p>
        </section>
        <section className="task-panel" aria-labelledby="tasks-title">
          <div className="panel-heading">
            <div>
              <p className="eyebrow">Task manager</p>
              <h2 id="tasks-title">Today’s list</h2>
            </div>
            <div className="task-summary" aria-live="polite">
              <span><strong>{remainingCount}</strong> open</span>
              <span className="divider" aria-hidden="true">/</span>
              <span><strong>{completedCount}</strong> done</span>
            </div>
          </div>
          <AddTaskForm />
          <div className="list-toolbar"><span>Tasks</span><TaskFilters /></div>
          <TaskList />
        </section>
        <footer className="page-footer">
          <span>useContext</span><span className="divider" aria-hidden="true">/</span>
          <span>useReducer</span><span className="divider" aria-hidden="true">/</span>
          <span>useRef</span>
        </footer>
      </div>
    </main>
  );
}