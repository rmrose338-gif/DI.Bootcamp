import { useDispatch, useSelector } from 'react-redux'
import { ageDownAsync, ageUpAsync } from '../features/age/ageSlice.js'

export default function AgeControls() {
  const dispatch = useDispatch()
  const { age, loading, operation } = useSelector((state) => state.age)

  function handleSubmit(event) {
    event.preventDefault()
    const direction = event.nativeEvent.submitter?.value
    if (direction === 'up') dispatch(ageUpAsync())
    if (direction === 'down') dispatch(ageDownAsync())
  }

  return (
    <form className="age-controls" onSubmit={handleSubmit}>
      <button className="age-button age-down" type="submit" name="direction" value="down" disabled={loading || age === 0}>
        <span className="button-icon" aria-hidden="true">−</span>
        <span className="button-copy"><strong>Age down</strong><small>One year back</small></span>
      </button>
      <button className="age-button age-up" type="submit" name="direction" value="up" disabled={loading}>
        <span className="button-copy"><strong>Age up</strong><small>One year forward</small></span>
        <span className="button-icon" aria-hidden="true">+</span>
      </button>
      <p className="control-hint" aria-live="polite">
        {loading
          ? `Counting ${operation === 'up' ? 'forward' : 'back'}...`
          : age === 0 ? 'Age cannot go below zero.' : 'Each update takes a little moment.'}
      </p>
    </form>
  )
}