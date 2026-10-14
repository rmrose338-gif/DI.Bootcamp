import { useDispatch } from 'react-redux'
import { logoutUser } from '../redux/authSlice.js'

function Logout() {
  const dispatch = useDispatch()

  return (
    <button className="text-button" type="button" onClick={() => dispatch(logoutUser())}>
      Sign out <span aria-hidden="true">↗</span>
    </button>
  )
}

export default Logout