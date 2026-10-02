import { useState } from 'react'

const emptyContact = {
  firstName: '',
  lastName: '',
  phone: '',
  email: '',
}

function ContactForm() {
  const [contact, setContact] = useState(emptyContact)
  const [submittedContact, setSubmittedContact] = useState(null)

  function handleChange(event) {
    const { name, value } = event.target
    setContact((currentContact) => ({ ...currentContact, [name]: value }))
  }

  function handleSubmit(event) {
    event.preventDefault()
    setSubmittedContact({ ...contact })
  }

  function handleReset() {
    setContact({ ...emptyContact })
    setSubmittedContact(null)
  }

  return submittedContact ? (
    <div className="contact-result" aria-live="polite">
      <h3>Thank you, {submittedContact.firstName}.</h3>
      <dl className="contact-details">
        <div>
          <dt>First name</dt>
          <dd>{submittedContact.firstName}</dd>
        </div>
        <div>
          <dt>Last name</dt>
          <dd>{submittedContact.lastName}</dd>
        </div>
        <div>
          <dt>Phone</dt>
          <dd>{submittedContact.phone}</dd>
        </div>
        <div>
          <dt>Email</dt>
          <dd>{submittedContact.email}</dd>
        </div>
      </dl>
      <button className="secondary-button" type="button" onClick={handleReset}>
        Reset form
      </button>
    </div>
  ) : (
    <form className="form-grid" onSubmit={handleSubmit}>
      <label className="field" htmlFor="first-name">
        <span>First name</span>
        <input
          id="first-name"
          name="firstName"
          autoComplete="given-name"
          value={contact.firstName}
          onChange={handleChange}
          required
          minLength="2"
        />
      </label>

      <label className="field" htmlFor="last-name">
        <span>Last name</span>
        <input
          id="last-name"
          name="lastName"
          autoComplete="family-name"
          value={contact.lastName}
          onChange={handleChange}
          required
          minLength="2"
        />
      </label>

      <label className="field" htmlFor="phone">
        <span>Phone</span>
        <input
          id="phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          pattern="[0-9+(). -]{7,20}"
          title="Enter a phone number with 7 to 20 digits or phone symbols."
          value={contact.phone}
          onChange={handleChange}
          required
        />
      </label>

      <label className="field" htmlFor="email">
        <span>Email</span>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          value={contact.email}
          onChange={handleChange}
          required
        />
      </label>

      <button className="submit-button" type="submit">Submit details</button>
    </form>
  )
}

export default ContactForm