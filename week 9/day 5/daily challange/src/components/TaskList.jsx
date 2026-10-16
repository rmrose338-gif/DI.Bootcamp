import { useCallback, useState } from 'react'
import { nanoid } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import {
  addTask,
  deleteTask,
  editTask,
  setTaskCompleted,
  updateTaskProgress,
} from '../redux/productivitySlice.js'
import { selectCategories, selectCategoryById, selectTasksByCategory } from '../redux/selectors.js'

function TaskRow({ task, categories, onToggleCompleted, onProgressChange, onDelete, onSaveEdit }) {
  const [isEditing, setIsEditing] = useState(false)
  const [titleDraft, setTitleDraft] = useState(task.title)
  const [notesDraft, setNotesDraft] = useState(task.notes)
  const [categoryDraft, setCategoryDraft] = useState(task.categoryId)
  const isCompleted = task.progress === 100

  const handleSave = useCallback((event) => {
    event.preventDefault()
    const title = titleDraft.trim()
    if (!title) return

    onSaveEdit(task.id, { title, notes: notesDraft.trim(), categoryId: categoryDraft })
    setIsEditing(false)
  }, [categoryDraft, notesDraft, onSaveEdit, task.id, titleDraft])

  const handleCancel = useCallback(() => {
    setTitleDraft(task.title)
    setNotesDraft(task.notes)
    setCategoryDraft(task.categoryId)
    setIsEditing(false)
  }, [task.categoryId, task.notes, task.title])

  return (
    <article className={`task-card${isCompleted ? ' is-complete' : ''}`}>
      <button
        className="task-check"
        type="button"
        role="checkbox"
        aria-checked={isCompleted}
        aria-label={`${isCompleted ? 'Mark in progress' : 'Mark completed'}: ${task.title}`}
        onClick={() => onToggleCompleted(task.id, !isCompleted)}
      >
        <span aria-hidden="true">{isCompleted ? '✓' : ''}</span>
      </button>

      <div className="task-content">
        {isEditing ? (
          <form className="task-edit-form" onSubmit={handleSave}>
            <input
              aria-label="Task title"
              value={titleDraft}
              onChange={(event) => setTitleDraft(event.target.value)}
              maxLength={100}
              autoFocus
            />
            <textarea
              aria-label="Task notes"
              value={notesDraft}
              onChange={(event) => setNotesDraft(event.target.value)}
              rows={2}
              maxLength={180}
            />
            <select aria-label="Task category" value={categoryDraft} onChange={(event) => setCategoryDraft(event.target.value)}>
              {categories.map((category) => <option value={category.id} key={category.id}>{category.name}</option>)}
            </select>
            <div className="edit-actions">
              <button type="button" className="quiet-button" onClick={handleCancel}>Cancel</button>
              <button type="submit" className="save-button">Save changes</button>
            </div>
          </form>
        ) : (
          <>
            <div className="task-title-row">
              <h3>{task.title}</h3>
              <div className="task-actions">
                <button type="button" aria-label={`Edit ${task.title}`} title="Edit task" onClick={() => setIsEditing(true)}>✎</button>
                <button type="button" aria-label={`Delete ${task.title}`} title="Delete task" onClick={() => onDelete(task.id)}>×</button>
              </div>
            </div>
            {task.notes && <p className="task-notes">{task.notes}</p>}
            <div className="task-meta">
              <span className={`task-category-tag tag-${categories.find((category) => category.id === task.categoryId)?.color || 'green'}`}>
                {categories.find((category) => category.id === task.categoryId)?.name || 'Unassigned'}
              </span>
              <span className="task-progress-label">{isCompleted ? 'COMPLETE' : `${task.progress}% COMPLETE`}</span>
            </div>
            <label className="progress-control">
              <span className="visually-hidden">Progress for {task.title}</span>
              <input
                type="range"
                min="0"
                max="100"
                step="5"
                value={task.progress}
                aria-label={`Progress for ${task.title}`}
                onChange={(event) => onProgressChange(task.id, Number(event.target.value))}
              />
            </label>
          </>
        )}
      </div>
    </article>
  )
}

function TaskList({ categoryId }) {
  const dispatch = useDispatch()
  const tasks = useSelector((state) => selectTasksByCategory(state, categoryId))
  const categories = useSelector(selectCategories)
  const selectedCategory = useSelector((state) => selectCategoryById(state, categoryId))
  const [title, setTitle] = useState('')
  const [notes, setNotes] = useState('')
  const [newTaskCategoryId, setNewTaskCategoryId] = useState('')

  const handleAddTask = useCallback((event) => {
    event.preventDefault()
    const cleanTitle = title.trim()
    if (!cleanTitle || categories.length === 0) return

    const categoryForTask = newTaskCategoryId || (categoryId === 'all' ? categories[0].id : categoryId)
    dispatch(addTask({
      id: nanoid(),
      title: cleanTitle,
      notes: notes.trim(),
      categoryId: categoryForTask,
    }))
    setTitle('')
    setNotes('')
    setNewTaskCategoryId('')
  }, [categories, categoryId, dispatch, newTaskCategoryId, notes, title])

  const handleToggleCompleted = useCallback((taskId, completed) => {
    dispatch(setTaskCompleted({ id: taskId, completed }))
  }, [dispatch])

  const handleProgressChange = useCallback((taskId, progress) => {
    dispatch(updateTaskProgress({ id: taskId, progress }))
  }, [dispatch])

  const handleDeleteTask = useCallback((taskId) => {
    dispatch(deleteTask(taskId))
  }, [dispatch])

  const handleSaveEdit = useCallback((taskId, updates) => {
    dispatch(editTask({ id: taskId, ...updates }))
  }, [dispatch])

  return (
    <section className="tasks-panel" aria-labelledby="tasks-title">
      <div className="tasks-heading">
        <div>
          <p className="panel-kicker">{selectedCategory ? selectedCategory.name.toUpperCase() : 'ALL CATEGORIES'}</p>
          <h2 id="tasks-title">Tasks <span>{String(tasks.length).padStart(2, '0')}</span></h2>
        </div>
        <span className="task-sort-label">PRIORITY <span aria-hidden="true">↓</span></span>
      </div>

      <form className="new-task-form" onSubmit={handleAddTask}>
        <div className="new-task-fields">
          <label className="visually-hidden" htmlFor="task-title">Task title</label>
          <input
            id="task-title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Add a task to your day..."
            maxLength={100}
          />
          <label className="visually-hidden" htmlFor="task-notes">Task notes</label>
          <input
            id="task-notes"
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
            placeholder="A note, if useful"
            maxLength={180}
          />
        </div>
        {categoryId === 'all' && categories.length > 0 && (
          <label className="new-task-category">
            <span className="visually-hidden">Choose task category</span>
            <select value={newTaskCategoryId || categories[0].id} onChange={(event) => setNewTaskCategoryId(event.target.value)}>
              {categories.map((category) => <option value={category.id} key={category.id}>{category.name}</option>)}
            </select>
          </label>
        )}
        <button className="add-task-button" type="submit" disabled={!title.trim() || categories.length === 0}>
          Add task <span aria-hidden="true">+</span>
        </button>
      </form>

      <div className="task-list" aria-live="polite">
        {tasks.map((task) => (
          <TaskRow
            task={task}
            categories={categories}
            key={task.id}
            onToggleCompleted={handleToggleCompleted}
            onProgressChange={handleProgressChange}
            onDelete={handleDeleteTask}
            onSaveEdit={handleSaveEdit}
          />
        ))}
        {tasks.length === 0 && (
          <div className="empty-tasks">
            <span aria-hidden="true">✳</span>
            <h3>A little breathing room.</h3>
            <p>Add a task here to get this category moving.</p>
          </div>
        )}
      </div>
    </section>
  )
}

export default TaskList