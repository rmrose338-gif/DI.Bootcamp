import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addTodo } from '../redux/todosSlice.js'

export default function AddTodo() {
  const [title, setTitle] = useState('')
  const dispatch = useDispatch()

  function handleSubmit(event) {
    event.preventDefault()
    const cleanTitle = title.trim()
    if (!cleanTitle) return

    dispatch(addTodo(cleanTitle))
    setTitle('')
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <label className="sr-only" htmlFor="new-todo">Add a task</label>
      <span className="add-symbol" aria-hidden="true">+</span>
      <input
        id="new-todo"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="Add something to your list..."
        maxLength={120}
      />
      <button type="submit" disabled={!title.trim()}>Add task <span aria-hidden="true">↗</span></button>
    </form>
  )
}