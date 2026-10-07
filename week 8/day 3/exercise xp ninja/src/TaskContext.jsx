import { createContext, useContext, useReducer } from 'react';

const TaskContext = createContext(null);
const initialState = { tasks: [], nextId: 1 };

function taskReducer(state, action) {
  switch (action.type) {
    case 'add': {
      const text = action.text.trim();
      if (!text) return state;
      return {
        tasks: [...state.tasks, { id: state.nextId, text, completed: false }],
        nextId: state.nextId + 1,
      };
    }
    case 'toggle':
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.id ? { ...task, completed: !task.completed } : task
        ),
      };
    case 'remove':
      return { ...state, tasks: state.tasks.filter((task) => task.id !== action.id) };
    default:
      return state;
  }
}

export function TaskProvider({ children }) {
  const [state, dispatch] = useReducer(taskReducer, initialState);
  const value = {
    tasks: state.tasks,
    addTask: (text) => dispatch({ type: 'add', text }),
    toggleTask: (id) => dispatch({ type: 'toggle', id }),
    removeTask: (id) => dispatch({ type: 'remove', id }),
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}

export function useTasks() {
  const context = useContext(TaskContext);
  if (!context) throw new Error('useTasks must be used inside TaskProvider');
  return context;
}