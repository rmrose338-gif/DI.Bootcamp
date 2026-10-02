import { useEffect, useState } from 'react'

function Color() {
  const [favoriteColor, setFavoriteColor] = useState('red')

  useEffect(() => {
    window.alert('useEffect reached')
  }, [])

  return (
    <div>
      <h3>My favorite color is {favoriteColor}</h3>
      <button type="button" onClick={() => setFavoriteColor('blue')}>
        Change color
      </button>
    </div>
  )
}

export default Color