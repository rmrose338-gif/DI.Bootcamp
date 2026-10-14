import { useState } from 'react'
import AddTask from './components/AddTask.jsx'
import Calendar from './components/Calendar.jsx'
import TaskList from './components/TaskList.jsx'
import { addDays, toDateKey } from './utils/dates.js'

const longDateFormatter = new Intl.DateTimeFormat('en', { weekday: 'long', month: 'long', day: 'numeric' })

function App() {
  const [selectedDate, setSelectedDate] = useState(() => new Date())
  const dateKey = toDateKey(selectedDate)

  return (
    <main className="app-shell">
      <header className="topbar">
        <a className="brand" href="#planner" aria-label="Daymark planner home">
          <span className="brand-symbol" aria-hidden="true">d</span>
          <span>daymark<span className="brand-period">.</span></span>
        </a>
        <div className="topbar-right">
          <span className="today-label"><span className="online-dot" /> YOUR PERSONAL PLANNER</span>
          <span className="avatar-mark" aria-hidden="true">✳</span>
        </div>
      </header>

      <div className="page-content" id="planner">
        <div className="page-intro">
          <div>
            <p className="eyebrow">MAKE A LITTLE SPACE</p>
            <h1>Plan your <em>days.</em></h1>
          </div>
          <p className="intro-aside">A clearer day starts<br />with one small plan.</p>
        </div>

        <Calendar
          selectedDate={selectedDate}
          onSelectDate={setSelectedDate}
          onPreviousWeek={() => setSelectedDate((date) => addDays(date, -7))}
          onNextWeek={() => setSelectedDate((date) => addDays(date, 7))}
          onToday={() => setSelectedDate(new Date())}
        />

        <div className="planner-grid">
          <section className="day-panel" aria-labelledby="selected-day-title">
            <div className="day-panel-heading">
              <div>
                <p className="panel-kicker">YOUR AGENDA</p>
                <h2 id="selected-day-title">{longDateFormatter.format(selectedDate)}</h2>
              </div>
              <span className="date-stamp">{selectedDate.getDate()}<small>{new Intl.DateTimeFormat('en', { month: 'short' }).format(selectedDate).toUpperCase()}</small></span>
            </div>
            <TaskList date={dateKey} />
          </section>

          <aside className="add-panel" aria-labelledby="add-heading">
            <div className="add-panel-heading">
              <span className="add-mark" aria-hidden="true">+</span>
              <div>
                <p className="panel-kicker">MAKE IT HAPPEN</p>
                <h2 id="add-heading">Add a task</h2>
              </div>
            </div>
            <p className="add-description">Putting it on the page is a good first step.</p>
            <AddTask date={dateKey} />
            <div className="selected-date-note">
              <span className="note-calendar" aria-hidden="true">▦</span>
              <span>Adding to <strong>{longDateFormatter.format(selectedDate)}</strong></span>
            </div>
          </aside>
        </div>
      </div>

      <footer className="page-footer">
        <span>DAYMARK / DAILY PLANNER</span>
        <span>ONE DAY AT A TIME <i aria-hidden="true">✳</i></span>
      </footer>
    </main>
  )
}

export default App