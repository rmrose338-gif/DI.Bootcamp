import { createElement, useState } from 'react'
import Garage from './Garage.js'

function Car({ carInfo }) {
  const [color] = useState('red')

  return createElement(
    'div',
    null,
    createElement('h3', null, `This car is ${color} ${carInfo.model}`),
    createElement(Garage, { size: 'small' }),
  )
}

export default Car