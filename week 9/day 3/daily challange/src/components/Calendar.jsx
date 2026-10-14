import { addDays, startOfWeek, toDateKey } from '../utils/dates.js'

const weekdayFormatter = new Intl.DateTimeFormat('en', { weekday: 'short' })
const monthFormatter = new Intl.DateTimeFormat('en', { month: 'long', year: 'numeric' })

function Calendar({ selectedDate, onSelectDate, onPreviousWeek, onNextWeek, onToday }) {
  const weekStart = startOfWeek(selectedDate)
  const days = Array.from({ length: 7 }, (_, index) => addDays(weekStart, index))

  return (
    <section className="calendar" aria-label="Choose a day">
      <div className="calendar-heading">
        <div className="month-label">
          <span className="calendar-kicker">YOUR WEEK</span>
          <h2>{monthFormatter.format(selectedDate)}</h2>
        </div>
        <div className="calendar-controls">
          <button className="icon-button" type="button" onClick={onPreviousWeek} aria-label="Previous week" title="Previous week">‹</button>
          <button className="today-button" type="button" onClick={onToday}>Today</button>
          <button className="icon-button" type="button" onClick={onNextWeek} aria-label="Next week" title="Next week">›</button>
        </div>
      </div>
      <div className="week-grid">
        {days.map((date) => {
          const isSelected = toDateKey(date) === toDateKey(selectedDate)
          const isToday = toDateKey(date) === toDateKey(new Date())
          return (
            <button
              className={`day-button${isSelected ? ' selected' : ''}${isToday ? ' today' : ''}`}
              type="button"
              key={toDateKey(date)}
              aria-pressed={isSelected}
              aria-label={`${weekdayFormatter.format(date)}, ${date.toLocaleDateString('en', { month: 'long', day: 'numeric', year: 'numeric' })}${isToday ? ', today' : ''}`}
              onClick={() => onSelectDate(date)}
            >
              <span className="day-name">{weekdayFormatter.format(date)}</span>
              <span className="day-number">{date.getDate()}</span>
              <span className="day-indicator" aria-hidden="true" />
            </button>
          )
        })}
      </div>
    </section>
  )
}

export default Calendar