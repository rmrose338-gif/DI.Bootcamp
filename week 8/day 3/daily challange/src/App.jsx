import { TaskProvider } from './TaskContext.jsx';
import TaskManager from './TaskManager.jsx';

export default function App() {
  return <TaskProvider><TaskManager /></TaskProvider>;
}