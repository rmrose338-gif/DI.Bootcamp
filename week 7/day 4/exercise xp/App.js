import React from 'react'
import UserFavoriteAnimals from './UserFavoriteAnimals.js'
import Exercise from './Exercise3.js'

function App() {
  const myelement = <h1>I Love JSX!</h1>
  const sum = 5 + 5
  const user = {
    firstName: 'Bob',
    lastName: 'Dylan',
    favAnimals: ['Horse', 'Turtle', 'Elephant', 'Monkey'],
  }

  return (
    <main>
      <section>
        <p>Hello World!</p>
        {myelement}
        <p>React is {sum} times better with JSX</p>
      </section>

      <section>
        <h3>{user.firstName}</h3>
        <h3>{user.lastName}</h3>
        <UserFavoriteAnimals favAnimals={user.favAnimals} />
      </section>

      <Exercise />
    </main>
  )
}

export default App
