import React from 'react';

function FieldValue({ label, value }) {
  return (
    <div className="value-row">
      <dt>{label}</dt>
      <dd>{value || <span className="empty-value">Not entered</span>}</dd>
    </div>
  );
}

function FormValues({ formData }) {
  return (
    <aside className="live-panel" aria-live="polite">
      <div className="live-heading"><span className="live-dot"></span><span>LIVE PREVIEW</span></div>
      <h2>Traveler<br /><em>details</em></h2>
      <dl>
        <FieldValue label="First name" value={formData.firstName} />
        <FieldValue label="Last name" value={formData.lastName} />
        <FieldValue label="Age" value={formData.age} />
        <FieldValue label="Gender" value={formData.gender} />
        <FieldValue label="Destination" value={formData.destination} />
        <FieldValue label="Lactose free" value={formData.lactoseFree ? 'Yes' : 'No'} />
        <FieldValue label="Nut free" value={formData.nutsFree ? 'Yes' : 'No'} />
        <FieldValue label="Vegan" value={formData.vegan ? 'Yes' : 'No'} />
      </dl>
      <p className="preview-note">Your details update here as you fill in the form.</p>
    </aside>
  );
}

export default function FormComponent({ formData, handleChange }) {
  return (
    <main className="page">
      <header className="topbar">
        <a className="wordmark" href="/" aria-label="Wayfarer home"><span className="wordmark-icon">W</span> WAYFARER</a>
        <span className="topbar-label">TRAVELER INTAKE <span>—</span> 01</span>
      </header>
      <section className="intro">
        <p className="eyebrow">A LITTLE BEFORE THE BIG ADVENTURE</p>
        <h1>Tell us about<br />your <em>journey.</em></h1>
        <p className="intro-copy">A few details help us make your trip feel like yours. Fill in what you can and we’ll take it from here.</p>
      </section>
      <div className="content-grid">
        <form className="profile-form" method="get" action="/">
          <div className="form-section">
            <span className="step-label">01 / ABOUT YOU</span>
            <div className="field-grid">
              <label className="field">
                <span>First name</span>
                <input name="firstName" value={formData.firstName} onChange={handleChange} placeholder="John" autoComplete="given-name" required />
              </label>
              <label className="field">
                <span>Last name</span>
                <input name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Doe" autoComplete="family-name" required />
              </label>
              <label className="field field-age">
                <span>Age</span>
                <input name="age" type="number" min="1" max="120" value={formData.age} onChange={handleChange} placeholder="25" required />
              </label>
              <fieldset className="field gender-field">
                <legend>Gender</legend>
                <div className="choice-row">
                  <label className="choice"><input type="radio" name="gender" value="male" checked={formData.gender === 'male'} onChange={handleChange} required /><span>Male</span></label>
                  <label className="choice"><input type="radio" name="gender" value="female" checked={formData.gender === 'female'} onChange={handleChange} /><span>Female</span></label>
                </div>
              </fieldset>
            </div>
          </div>

          <div className="form-section destination-section">
            <span className="step-label">02 / YOUR TRIP</span>
            <label className="field">
              <span>Where are you headed?</span>
              <select name="destination" value={formData.destination} onChange={handleChange} required>
                <option value="" disabled>Select a destination</option>
                <option value="Japan">Japan</option>
                <option value="Thailand">Thailand</option>
                <option value="Brazil">Brazil</option>
                <option value="Iceland">Iceland</option>
              </select>
            </label>
          </div>

          <div className="form-section dietary-section">
            <span className="step-label">03 / FOOD NOTES</span>
            <fieldset className="dietary-options">
              <legend>Any dietary requirements?</legend>
              <label className="check-choice"><input type="checkbox" name="lactoseFree" value="on" checked={Boolean(formData.lactoseFree)} onChange={handleChange} /><span className="checkmark" aria-hidden="true"></span><span>Lactose free</span></label>
              <label className="check-choice"><input type="checkbox" name="nutsFree" value="on" checked={Boolean(formData.nutsFree)} onChange={handleChange} /><span className="checkmark" aria-hidden="true"></span><span>Nut free</span></label>
              <label className="check-choice"><input type="checkbox" name="vegan" value="on" checked={Boolean(formData.vegan)} onChange={handleChange} /><span className="checkmark" aria-hidden="true"></span><span>Vegan</span></label>
            </fieldset>
          </div>

          <button className="submit-button" type="submit"><span>Send traveler details</span><span aria-hidden="true">↗</span></button>
        </form>
        <FormValues formData={formData} />
      </div>
      <footer className="page-footer"><span>WAYFARER TRAVEL CO.</span><span>MADE FOR THE LONG WAY ROUND</span></footer>
    </main>
  );
}