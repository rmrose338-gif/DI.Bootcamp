import { useSelector } from 'react-redux'

export default function AgeDisplay() {
  const { age, loading, operation } = useSelector((state) => state.age)

  return (
    <section className="age-display" aria-live="polite" aria-busy={loading}>
      <div className="orbit orbit-one" aria-hidden="true" />
      <div className="orbit orbit-two" aria-hidden="true" />
      <p className="display-label">YOUR AGE, RIGHT NOW</p>
      <div className="age-number-wrap">
        <span className={loading ? 'age-number changing' : 'age-number'}>{age}</span>
        {loading && <span className="spinner" role="status" aria-label={`Updating age ${operation === 'up' ? 'up' : 'down'}`} />}
      </div>
      <p className="age-unit">YEARS YOUNG</p>
      <div className="age-meter" aria-hidden="true">
        <span style={{ width: `${Math.min(age / 100, 1) * 100}%` }} />
      </div>
      <p className="meter-caption"><span>0</span><span>100</span></p>
    </section>
  )
}