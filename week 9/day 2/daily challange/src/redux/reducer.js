import {
  ADD_TASK,
  DELETE_TASK,
  EDIT_TASK,
  SELECT_DAY,
  TOGGLE_TASK,
} from './actions'

const today = () => new Date().toISOString().slice(0, 10)

function readSavedState() {
  try {
    const saved = JSON.parse(localStorage.getItem('daily-planner-state'))
    if (!saved || typeof saved !== 'object') return null

    const tasksByDate = Object.fromEntries(
      Object.entries(saved.tasksByDate ?? {}).filter(
        ([, tasks]) => Array.isArray(tasks),
      ),
    )

    return {
      selectedDay: /^\d{4}-\d{2}-\d{2}$/.test(saved.selectedDay ?? '')
        ? saved.selectedDay
        : today(),
      tasksByDate,
    }
  } catch {
    return null
  }
}

export const initialState = readSavedState() ?? {
  selectedDay: today(),
  tasksByDate: {},
}

function updateDay(state, date, updateTasks) {
  const currentTasks = state.tasksByDate[date] ?? []
  const nextTasks = updateTasks(currentTasks)

  if (nextTasks === currentTasks) return state

  return {
    ...state,
    tasksByDate: { ...state.tasksByDate, [date]: nextTasks },
  }
}

export default function plannerReducer(state = initialState, action) {
  switch (action.type) {
    case SELECT_DAY:
      return /^\d{4}-\d{2}-\d{2}$/.test(action.payload)
        ? { ...state, selectedDay: action.payload }
        : state

    case ADD_TASK: {
      const task = action.payload
      if (!task?.date || !task?.id || !task.title?.trim()) return state
      return updateDay(state, task.date, (tasks) => [...tasks, task])
    }

    case EDIT_TASK: {
      const task = action.payload
      if (!task?.date || !task?.id || !task.title?.trim()) return state
      return updateDay(state, task.date, (tasks) => {
        if (!tasks.some((item) => item.id === task.id)) return tasks
        return tasks.map((item) => (item.id === task.id ? task : item))
      })
    }

    case DELETE_TASK:
      return updateDay(state, action.payload.date, (tasks) => {
        const remaining = tasks.filter((task) => task.id !== action.payload.taskId)
        return remaining.length === tasks.length ? tasks : remaining
      })

    case TOGGLE_TASK:
      return updateDay(state, action.payload.date, (tasks) => {
        if (!tasks.some((task) => task.id === action.payload.taskId)) return tasks
        return tasks.map((task) =>
          task.id === action.payload.taskId
            ? { ...task, completed: !task.completed }
            : task,
        )
      })

    default:
      return state
  }
}