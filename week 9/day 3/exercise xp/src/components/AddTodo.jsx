import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addTodo } from '../redux/todosSlice.js'

function AddTodo() {
  const [text, setText] = useState('')
  const dispatch = useDispatch()

  function handleSubmit(event) {
    event.preventDefault()
    const trimmedText = text.trim()
    if (!trimmedText) return

    dispatch(addTodo({ id: crypto.randomUUID(), text: trimmedText, completed: false }))
    setText('')
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <label className="sr-only" htmlFor="new-todo">Add a task</label>
      <input
        id="new-todo"
        type="text"
        value={text}
        onChange={(event) => setText(event.target.value)}
        placeholder="What needs doing?"
        autoComplete="off"
        maxLength={120}
      />
      <button type="submit" aria-label="Add task" disabled={!text.trim()}>
        <span aria-hidden="true">+</span>
      </button>
    </form>
  )
}

export default AddTodo