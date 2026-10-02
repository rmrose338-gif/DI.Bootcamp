import { useState } from 'react'

function Events() {
  const [isToggleOn, setIsToggleOn] = useState(true)

  const clickMe = () => window.alert('I was clicked')

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      window.alert(event.currentTarget.value)
    }
  }

  const toggleState = () => setIsToggleOn((currentState) => !currentState)

  return (
    <div className="control-stack">
      <button type="button" onClick={clickMe}>Click me</button>
      <label className="field-label" htmlFor="enter-message">
        Press Enter to display the text
      </label>
      <input
        id="enter-message"
        type="text"
        onKeyDown={handleKeyDown}
        placeholder="Type a message"
      />
      <button type="button" onClick={toggleState}>
        {isToggleOn ? 'ON' : 'OFF'}
      </button>
    </div>
  )
}

export default Events