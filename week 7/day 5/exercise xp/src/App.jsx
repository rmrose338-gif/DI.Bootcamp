import Car from './Components/Car.js'
import Events from './Components/Events.jsx'
import Phone from './Components/Phone.jsx'
import Color from './Components/Color.jsx'

const carinfo = { name: 'Ford', model: 'Mustang' }

function App() {
  return (
    <main className="page">
      <header className="page-header">
        <p className="eyebrow">React practice</p>
        <h1>Components and Hooks</h1>
      </header>

      <div className="exercise-grid">
        <section className="exercise" aria-labelledby="car-heading">
          <h2 id="car-heading">Car and Garage</h2>
          <Car carInfo={carinfo} />
        </section>

        <section className="exercise" aria-labelledby="events-heading">
          <h2 id="events-heading">Events</h2>
          <Events />
        </section>

        <section className="exercise" aria-labelledby="phone-heading">
          <h2 id="phone-heading">Phone</h2>
          <Phone />
        </section>

        <section className="exercise" aria-labelledby="color-heading">
          <h2 id="color-heading">Favorite color</h2>
          <Color />
        </section>
      </div>
    </main>
  )
}

export default App