import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  tasksByDate: {},
}

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action) => {
      const { date, task } = action.payload
      state.tasksByDate[date] ??= []
      state.tasksByDate[date].push(task)
    },
    editTask: (state, action) => {
      const { date, taskId, updates } = action.payload
      const task = state.tasksByDate[date]?.find((item) => item.id === taskId)
      if (task) Object.assign(task, updates)
    },
    deleteTask: (state, action) => {
      const { date, taskId } = action.payload
      const dayTasks = state.tasksByDate[date]
      if (!dayTasks) return

      state.tasksByDate[date] = dayTasks.filter((task) => task.id !== taskId)
      if (state.tasksByDate[date].length === 0) delete state.tasksByDate[date]
    },
  },
})

export const { addTask, editTask, deleteTask } = tasksSlice.actions
export default tasksSlice.reducer