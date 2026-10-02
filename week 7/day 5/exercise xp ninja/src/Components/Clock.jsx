import { useEffect, useState } from 'react'

function Clock() {
  const [currentDate, setCurrentDate] = useState(() => new Date())

  function tick() {
    setCurrentDate(new Date())
  }

  useEffect(() => {
    const intervalId = window.setInterval(tick, 1000)
    return () => window.clearInterval(intervalId)
  }, [])

  return (
    <time className="clock" dateTime={currentDate.toISOString()}>
      {currentDate.toLocaleTimeString()}
    </time>
  )
}

export default Clock