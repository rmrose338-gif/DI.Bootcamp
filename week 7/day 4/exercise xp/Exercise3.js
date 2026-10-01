import React from 'react'
import reactLogo from './react-logo.svg'
import './Exercise.css'

class Exercise extends React.Component {
  render() {
    const style_header = {
      color: 'white',
      backgroundColor: 'DodgerBlue',
      padding: '10px',
      fontFamily: 'Arial',
    }

    return (
      <section>
        <h1 style={style_header}>This is a React exercise</h1>
        <p className="para">This paragraph is styled with CSS.</p>
        <a href="https://react.dev/" target="_blank" rel="noreferrer">
          Learn about React
        </a>
        <form>
          <label htmlFor="exercise-name">Name:</label>
          <input id="exercise-name" name="name" type="text" />
          <button type="button">Submit</button>
        </form>
        <img src={reactLogo} alt="React logo" width="120" />
        <ul>
          <li>JSX</li>
          <li>Components</li>
          <li>Props</li>
        </ul>
      </section>
    )
  }
}

export default Exercise
