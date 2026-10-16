import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  categories: [
    { id: 'work', name: 'Work', color: 'green' },
    { id: 'personal', name: 'Personal', color: 'coral' },
    { id: 'learning', name: 'Learning', color: 'blue' },
  ],
  tasks: [
    { id: 'task-1', title: 'Plan the week’s priorities', notes: 'Choose the three outcomes that matter most.', categoryId: 'work', progress: 100 },
    { id: 'task-2', title: 'Prepare project check-in', notes: 'Bring the latest timeline and open questions.', categoryId: 'work', progress: 45 },
    { id: 'task-3', title: 'Take a proper lunch break', notes: 'Step away from the desk for a while.', categoryId: 'personal', progress: 0 },
    { id: 'task-4', title: 'Review Redux selectors', notes: 'Try memoizing derived data with createSelector.', categoryId: 'learning', progress: 70 },
  ],
}

const productivitySlice = createSlice({
  name: 'productivity',
  initialState,
  reducers: {
    addTask(state, action) {
      state.tasks.push({ ...action.payload, progress: 0 })
    },
    editTask(state, action) {
      const task = state.tasks.find((item) => item.id === action.payload.id)
      if (task) Object.assign(task, action.payload)
    },
    deleteTask(state, action) {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload)
    },
    updateTaskProgress(state, action) {
      const task = state.tasks.find((item) => item.id === action.payload.id)
      if (task) task.progress = Math.max(0, Math.min(100, action.payload.progress))
    },
    setTaskCompleted(state, action) {
      const task = state.tasks.find((item) => item.id === action.payload.id)
      if (task) task.progress = action.payload.completed ? 100 : 0
    },
    addCategory(state, action) {
      state.categories.push(action.payload)
    },
    editCategory(state, action) {
      const category = state.categories.find((item) => item.id === action.payload.id)
      if (category) category.name = action.payload.name
    },
    deleteCategory(state, action) {
      state.categories = state.categories.filter((category) => category.id !== action.payload)
      state.tasks = state.tasks.filter((task) => task.categoryId !== action.payload)
    },
  },
})

export const {
  addTask,
  editTask,
  deleteTask,
  updateTaskProgress,
  setTaskCompleted,
  addCategory,
  editCategory,
  deleteCategory,
} = productivitySlice.actions

export default productivitySlice.reducer