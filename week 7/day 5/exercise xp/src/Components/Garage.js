import { createElement } from 'react'

function Garage({ size }) {
  return createElement('p', null, `Who lives in my ${size} Garage?`)
}

export default Garage