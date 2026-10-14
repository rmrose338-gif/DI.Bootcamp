import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  todos: [
    { id: 'todo-1', text: 'Plan the week ahead', completed: true },
    { id: 'todo-2', text: 'Finish the Redux exercise', completed: false },
    { id: 'todo-3', text: 'Take a proper screen break', completed: false },
  ],
}

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.todos.push(action.payload)
    },
    toggleTodo: (state, action) => {
      const todo = state.todos.find((item) => item.id === action.payload)
      if (todo) todo.completed = !todo.completed
    },
    removeTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload)
    },
  },
})

export const { addTodo, toggleTodo, removeTodo } = todosSlice.actions
export default todosSlice.reducer