import { useState } from 'react'

function Phone() {
  const [phone, setPhone] = useState({
    brand: 'Samsung',
    model: 'Galaxy S20',
    color: 'black',
    year: 2020,
  })

  const changeColor = () => setPhone((currentPhone) => ({ ...currentPhone, color: 'blue' }))

  return (
    <div>
      <p>Brand: {phone.brand}</p>
      <p>Model: {phone.model}</p>
      <p>Color: {phone.color}</p>
      <p>Year: {phone.year}</p>
      <button type="button" onClick={changeColor}>Change color</button>
    </div>
  )
}

export default Phone