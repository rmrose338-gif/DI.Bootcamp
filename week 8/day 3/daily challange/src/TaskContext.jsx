import { createContext, useContext, useReducer } from 'react';

const TaskContext = createContext(null);
const initialState = { tasks: [], nextId: 1, filter: 'all' };

function taskReducer(state, action) {
  switch (action.type) {
    case 'ADD_TASK': {
      const text = action.text.trim();
      if (!text) return state;
      return {
        ...state,
        tasks: [...state.tasks, { id: state.nextId, text, completed: false }],
        nextId: state.nextId + 1,
      };
    }
    case 'TOGGLE_TASK':
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.id ? { ...task, completed: !task.completed } : task
        ),
      };
    case 'EDIT_TASK': {
      const text = action.text.trim();
      if (!text) return state;
      return {
        ...state,
        tasks: state.tasks.map((task) => task.id === action.id ? { ...task, text } : task),
      };
    }
    case 'REMOVE_TASK':
      return { ...state, tasks: state.tasks.filter((task) => task.id !== action.id) };
    case 'FILTER_TASKS':
      return ['all', 'active', 'completed'].includes(action.filter)
        ? { ...state, filter: action.filter }
        : state;
    default:
      return state;
  }
}

export function TaskProvider({ children }) {
  const [state, dispatch] = useReducer(taskReducer, initialState);
  const value = {
    ...state,
    addTask: (text) => dispatch({ type: 'ADD_TASK', text }),
    toggleTask: (id) => dispatch({ type: 'TOGGLE_TASK', id }),
    editTask: (id, text) => dispatch({ type: 'EDIT_TASK', id, text }),
    removeTask: (id) => dispatch({ type: 'REMOVE_TASK', id }),
    setFilter: (filter) => dispatch({ type: 'FILTER_TASKS', filter }),
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}

export function useTasks() {
  const context = useContext(TaskContext);
  if (!context) throw new Error('useTasks must be used inside TaskProvider');
  return context;
}