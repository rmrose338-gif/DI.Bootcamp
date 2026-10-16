import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: [
    { id: 'task-1', text: 'Read the Redux selector notes', completed: true },
    { id: 'task-2', text: 'Build the todo list interface', completed: false },
    { id: 'task-3', text: 'Test each visibility filter', completed: false },
  ],
  visibilityFilter: 'All',
}

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo(state, action) {
      state.items.push({ ...action.payload, completed: false })
    },
    toggleTodo(state, action) {
      const todo = state.items.find((item) => item.id === action.payload)
      if (todo) todo.completed = !todo.completed
    },
    removeTodo(state, action) {
      state.items = state.items.filter((item) => item.id !== action.payload)
    },
    setVisibilityFilter(state, action) {
      state.visibilityFilter = action.payload
    },
  },
})

export const { addTodo, toggleTodo, removeTodo, setVisibilityFilter } = todosSlice.actions
export default todosSlice.reducer