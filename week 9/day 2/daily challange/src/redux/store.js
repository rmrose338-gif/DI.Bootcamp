import { legacy_createStore as createStore } from 'redux'
import plannerReducer from './reducer'

const store = createStore(plannerReducer)

store.subscribe(() => {
  const { selectedDay, tasksByDate } = store.getState()
  localStorage.setItem(
    'daily-planner-state',
    JSON.stringify({ selectedDay, tasksByDate }),
  )
})

export default store