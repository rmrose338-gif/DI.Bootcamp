import { useState } from 'react'
import Input from './Input.jsx'

const initialValues = {
  firstName: '',
  lastName: '',
  phone: '',
  email: '',
}

function validate(values) {
  const errors = {}

  for (const [name, value] of Object.entries(values)) {
    if (!value.trim()) {
      errors[name] = 'This field is required.'
    }
  }

  if (values.phone.trim()) {
    const digits = values.phone.replace(/\D/g, '')
    if (!/^\+?[\d\s().-]+$/.test(values.phone) || digits.length < 7 || digits.length > 15) {
      errors.phone = 'Enter a valid phone number.'
    }
  }

  if (values.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email)) {
    errors.email = 'Enter a valid email address.'
  }

  return errors
}

function Form() {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  function handleChange(event) {
    const { name, value } = event.target
    const nextValues = { ...values, [name]: value }
    setValues(nextValues)
    setErrors(validate(nextValues))
    setSubmitted(false)
  }

  function handleSubmit(event) {
    event.preventDefault()
    const nextErrors = validate(values)
    setErrors(nextErrors)
    setSubmitted(Object.keys(nextErrors).length === 0)
  }

  return (
    <form className="form-grid" onSubmit={handleSubmit} noValidate>
      <Input id="first-name" label="First name" name="firstName" value={values.firstName} onChange={handleChange} error={errors.firstName} autoComplete="given-name" />
      <Input id="last-name" label="Last name" name="lastName" value={values.lastName} onChange={handleChange} error={errors.lastName} autoComplete="family-name" />
      <Input id="phone" label="Phone" name="phone" value={values.phone} onChange={handleChange} error={errors.phone} autoComplete="tel" />
      <Input id="email" label="Email" name="email" value={values.email} onChange={handleChange} error={errors.email} autoComplete="email" />
      <button className="submit-button" type="submit">Submit</button>
      {submitted && (
        <p className="success-message" role="status">
          Form submitted successfully.
        </p>
      )}
    </form>
  )
}

export default Form