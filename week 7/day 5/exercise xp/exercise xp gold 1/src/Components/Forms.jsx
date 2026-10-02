import { useState } from 'react'

function Forms() {
  const [username, setUsername] = useState('')
  const [age, setAge] = useState(null)
  const [errormessage, setErrormessage] = useState('')
  const [message, setMessage] = useState('Hello! This is a message in the textarea.')
  const [selectedCar, setSelectedCar] = useState('Volvo')

  function handleChange(event) {
    const { name, value } = event.target

    if (name === 'username') {
      setUsername(value)
      return
    }

    if (name === 'age') {
      setAge(value)
      setErrormessage(
        value.trim() !== '' && Number.isNaN(Number(value))
          ? 'Your age must be a number.'
          : '',
      )
    }
  }

  function mySubmitHandler(event) {
    event.preventDefault()
    window.alert(username)
  }

  let header = null
  if (username) {
    header = (
      <h2 className="greeting">
        Hello {username}
        {age !== null && age !== '' ? `, age ${age}` : ''}!
      </h2>
    )
  }

  return (
    <section className="form-exercise" aria-label="Interactive form exercises">
      {header}

      <form className="form-fields" onSubmit={mySubmitHandler}>
        <label htmlFor="username">Name</label>
        <input
          id="username"
          name="username"
          type="text"
          value={username}
          onChange={handleChange}
          autoComplete="name"
        />

        <label htmlFor="age">Age</label>
        <input
          id="age"
          name="age"
          type="text"
          inputMode="decimal"
          value={age ?? ''}
          onChange={handleChange}
          aria-invalid={Boolean(errormessage)}
          aria-describedby={errormessage ? 'age-error' : undefined}
        />
        {errormessage && (
          <p className="error-message" id="age-error" role="alert">
            {errormessage}
          </p>
        )}

        <button type="submit">Submit</button>
      </form>

      <section className="extra-fields" aria-label="Textarea and select exercises">
        <div className="field-group">
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            rows="4"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
          />
        </div>

        <div className="field-group">
          <label htmlFor="car">Car brand</label>
          <select
            id="car"
            name="car"
            value={selectedCar}
            onChange={(event) => setSelectedCar(event.target.value)}
          >
            <option value="Volvo">Volvo</option>
            <option value="Saab">Saab</option>
            <option value="Mercedes">Mercedes</option>
            <option value="Audi">Audi</option>
          </select>
        </div>
      </section>
    </section>
  )
}

export default Forms