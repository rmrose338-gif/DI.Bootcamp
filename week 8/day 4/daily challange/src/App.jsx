import { useState } from 'react';

const operations = {
  add: { label: 'Addition', symbol: '+', run: (first, second) => first + second },
  subtract: { label: 'Subtraction', symbol: '−', run: (first, second) => first - second },
  multiply: { label: 'Multiplication', symbol: '×', run: (first, second) => first * second },
  divide: { label: 'Division', symbol: '÷', run: (first, second) => first / second },
};

export default function App() {
  const [firstValue, setFirstValue] = useState('');
  const [secondValue, setSecondValue] = useState('');
  const [operation, setOperation] = useState('add');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  function calculate(event) {
    event.preventDefault();
    setError('');

    if (firstValue.trim() === '' || secondValue.trim() === '') {
      setResult(null);
      setError('Enter a number in both fields to continue.');
      return;
    }

    const first = Number(firstValue);
    const second = Number(secondValue);
    if (!Number.isFinite(first) || !Number.isFinite(second)) {
      setResult(null);
      setError('Both values must be valid numbers.');
      return;
    }
    if (operation === 'divide' && second === 0) {
      setResult(null);
      setError('A number cannot be divided by zero.');
      return;
    }

    setResult(operations[operation].run(first, second));
  }

  return (
    <main className="page-shell">
      <header className="masthead">
        <a className="wordmark" href="#calculator">quick<span>math</span></a>
        <span className="masthead-note">A SMALL TOOL FOR BIG NUMBERS</span>
      </header>

      <section className="calculator" id="calculator" aria-labelledby="page-title">
        <div className="intro">
          <p className="eyebrow"><span /> Everyday arithmetic</p>
          <h1 id="page-title">Make the<br /><em>numbers</em> work.</h1>
          <p className="intro-copy">Two values in. A clear answer out.</p>
        </div>

        <form className="calculator-form" onSubmit={calculate}>
          <div className="number-fields">
            <label className="number-field" htmlFor="first-number">
              <span className="field-label">FIRST NUMBER</span>
              <input
                id="first-number"
                type="number"
                step="any"
                inputMode="decimal"
                value={firstValue}
                onChange={(event) => setFirstValue(event.target.value)}
                placeholder="0"
              />
            </label>
            <span className="field-separator" aria-hidden="true">{operations[operation].symbol}</span>
            <label className="number-field" htmlFor="second-number">
              <span className="field-label">SECOND NUMBER</span>
              <input
                id="second-number"
                type="number"
                step="any"
                inputMode="decimal"
                value={secondValue}
                onChange={(event) => setSecondValue(event.target.value)}
                placeholder="0"
              />
            </label>
          </div>

          <label className="operation-field" htmlFor="operation">
            <span className="field-label">OPERATION</span>
            <select id="operation" value={operation} onChange={(event) => setOperation(event.target.value)}>
              {Object.entries(operations).map(([value, item]) => (
                <option key={value} value={value}>{item.label}</option>
              ))}
            </select>
          </label>

          <button className="calculate-button" type="submit">
            <span>{operation === 'add' ? 'Add Them' : 'Calculate'}</span>
            <span className="button-symbol" aria-hidden="true">{operations[operation].symbol}</span>
          </button>

          <div className={`result-panel${result !== null ? ' has-result' : ''}`} aria-live="polite" aria-atomic="true">
            <span className="result-label">{error ? 'CHECK YOUR INPUT' : result !== null ? 'THE ANSWER' : 'YOUR ANSWER'}</span>
            {error ? <p className="result-error" role="alert">{error}</p> : (
              <output className="result-value">{result === null ? '—' : result}</output>
            )}
          </div>
        </form>
      </section>

      <footer className="page-footer"><span>QUICK MATH</span><span>ADD · SUBTRACT · MULTIPLY · DIVIDE</span></footer>
    </main>
  );
}