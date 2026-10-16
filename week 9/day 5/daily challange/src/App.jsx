import { useState } from 'react'
import CategorySelector from './components/CategorySelector.jsx'
import TaskList from './components/TaskList.jsx'
import { useSelector } from 'react-redux'
import { selectCompletedTasks, selectTotalTasks } from './redux/selectors.js'

function App() {
  const [selectedCategoryId, setSelectedCategoryId] = useState('all')
  const completedTasks = useSelector(selectCompletedTasks)
  const totalTasks = useSelector(selectTotalTasks)
  const completionRate = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100)

  return (
    <main className="tracker-shell">
      <header className="topbar">
        <a className="brand" href="#overview" aria-label="Daymark home">
          <span className="brand-symbol" aria-hidden="true">d<span>.</span></span>
          <span>DAYMARK</span>
        </a>
        <span className="topbar-caption">A CLEARER VIEW OF THE DAY</span>
        <span className="issue-label">DAILY LOG <span>/</span> 01</span>
      </header>

      <section className="overview" id="overview" aria-labelledby="page-title">
        <div>
          <p className="eyebrow"><span className="eyebrow-dot" /> YOUR WORK, IN FOCUS <span className="eyebrow-slash">/</span> TODAY</p>
          <h1 id="page-title">Make progress<br /><em>visible.</em></h1>
        </div>
        <div className="progress-summary" aria-label={`${completedTasks} of ${totalTasks} tasks complete`}>
          <div className="summary-topline"><span>DAILY PROGRESS</span><strong>{completionRate}%</strong></div>
          <div className="progress-track"><span style={{ width: `${completionRate}%` }} /></div>
          <p>{completedTasks} of {totalTasks} tasks completed</p>
        </div>
      </section>

      <div className="workspace">
        <CategorySelector
          selectedCategoryId={selectedCategoryId}
          onSelectCategory={setSelectedCategoryId}
        />
        <TaskList categoryId={selectedCategoryId} />
      </div>

      <footer className="page-footer">
        <span>DAYMARK <span>/</span> DAILY WORKSPACE</span>
        <span>ONE STEP, THEN THE NEXT <span aria-hidden="true">✳</span></span>
      </footer>
    </main>
  )
}

export default App