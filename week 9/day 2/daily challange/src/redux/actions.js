export const SELECT_DAY = 'planner/selectDay'
export const ADD_TASK = 'planner/addTask'
export const EDIT_TASK = 'planner/editTask'
export const DELETE_TASK = 'planner/deleteTask'
export const TOGGLE_TASK = 'planner/toggleTask'

export const selectDay = (date) => ({ type: SELECT_DAY, payload: date })
export const addTask = (task) => ({ type: ADD_TASK, payload: task })
export const editTask = (task) => ({ type: EDIT_TASK, payload: task })
export const deleteTask = (date, taskId) => ({
  type: DELETE_TASK,
  payload: { date, taskId },
})
export const toggleTask = (date, taskId) => ({
  type: TOGGLE_TASK,
  payload: { date, taskId },
})