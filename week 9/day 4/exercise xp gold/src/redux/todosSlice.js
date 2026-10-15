import { createSlice, nanoid } from '@reduxjs/toolkit'

const TODOS_API_URL = 'https://jsonplaceholder.typicode.com/todos?_limit=7'

const todosSlice = createSlice({
  name: 'todos',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    addTodo: {
      reducer: (state, action) => {
        state.items.unshift(action.payload)
      },
      prepare: (title) => ({
        payload: {
          id: nanoid(),
          title,
          completed: false,
          local: true,
        },
      }),
    },
    removeTodo: (state, action) => {
      state.items = state.items.filter((todo) => todo.id !== action.payload)
    },
    toggleTodo: (state, action) => {
      const todo = state.items.find((item) => item.id === action.payload)
      if (todo) todo.completed = !todo.completed
    },
    setTodos: (state, action) => {
      state.items = action.payload
    },
    setFetchStatus: (state, action) => {
      state.status = action.payload
      state.error = null
    },
    setFetchError: (state, action) => {
      state.status = 'failed'
      state.error = action.payload
    },
  },
})

export const { addTodo, removeTodo, toggleTodo, setTodos, setFetchStatus, setFetchError } = todosSlice.actions

export const fetchTodos = () => async (dispatch) => {
  dispatch(setFetchStatus('loading'))

  try {
    const response = await fetch(TODOS_API_URL)
    if (!response.ok) throw new Error(`Request failed with status ${response.status}.`)

    const todos = await response.json()
    dispatch(setTodos(todos))
    dispatch(setFetchStatus('succeeded'))
  } catch (error) {
    dispatch(setFetchError(error instanceof Error ? error.message : 'Could not load todos.'))
  }
}

export default todosSlice.reducer