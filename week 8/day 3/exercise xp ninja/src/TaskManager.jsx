import { useState } from 'react';
import { useTasks } from './TaskContext.jsx';

function AddTaskForm() {
  const [text, setText] = useState('');
  const { addTask } = useTasks();

  function handleSubmit(event) {
    event.preventDefault();
    const taskText = text.trim();
    if (!taskText) return;
    addTask(taskText);
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
  const { toggleTask, removeTask } = useTasks();

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
      <span className="task-item__text">{task.text}</span>
      <button
        className="remove-button"
        type="button"
        onClick={() => removeTask(task.id)}
        aria-label={`Remove ${task.text}`}
        title="Remove task"
      >
        <span aria-hidden="true">×</span>
      </button>
    </li>
  );
}

function TaskList() {
  const { tasks } = useTasks();
  if (tasks.length === 0) {
    return (
      <div className="empty-state">
        <span className="empty-state__mark" aria-hidden="true">✓</span>
        <p>Nothing on the list.</p>
        <span>Add a task to get started.</span>
      </div>
    );
  }

  return (
    <ul className="task-list" aria-label="Tasks">
      {tasks.map((task) => <TaskItem key={task.id} task={task} />)}
    </ul>
  );
}

export default function TaskManager() {
  const { tasks } = useTasks();
  const completedCount = tasks.filter((task) => task.completed).length;
  const remainingCount = tasks.length - completedCount;

  return (
    <main className="page">
      <header className="topbar">
        <a className="course-mark" href="#top" aria-label="Week 8 task manager exercise">
          <span className="course-mark__dot" /> REACT / WEEK 08
        </a>
        <span className="lesson-mark">DAY 03 · EXERCISE XP NINJA</span>
      </header>
      <div className="content" id="top">
        <section className="intro" aria-labelledby="page-title">
          <p className="eyebrow">Tasks, in their place</p>
          <h1 id="page-title">Plan the work.<br />Clear the mind.</h1>
          <p className="intro-copy">Add a task, mark it complete, or remove it when plans change.</p>
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
          <TaskList />
        </section>
        <footer className="page-footer">
          <span>useContext</span><span className="divider">/</span>
          <span>useReducer</span><span className="divider">/</span>
          <span>shared task state</span>
        </footer>
      </div>
    </main>
  );
}