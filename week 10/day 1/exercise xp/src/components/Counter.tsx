import { useState } from 'react'

type CounterAction = 'increment' | 'decrement'

function Counter() {
  const [count, setCount] = useState<number>(0)
  const [lastAction, setLastAction] = useState<CounterAction | null>(null)

  const updateCount = (action: CounterAction) => {
    setCount((currentCount) =>
      action === 'increment' ? currentCount + 1 : currentCount - 1,
    )
    setLastAction(action)
  }

  return (
    <div>
      <div className="counter">
        <output className="counter-value" aria-live="polite">
          {count}
        </output>
        <div className="counter-actions">
          <button
            type="button"
            aria-label="Decrement counter"
            onClick={() => updateCount('decrement')}
          >
            −
          </button>
          <button
            type="button"
            aria-label="Increment counter"
            onClick={() => updateCount('increment')}
          >
            +
          </button>
        </div>
      </div>
      <p className="last-action" aria-live="polite">
        Last action: <strong>{lastAction ?? 'No action yet'}</strong>
      </p>
    </div>
  )
}

export default Counter
