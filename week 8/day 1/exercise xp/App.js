import React from 'react';
import ErrorBoundary from './ErrorBoundary.js';

class BuggyCounter extends React.Component {
  state = { counter: 0 };

  handleClick = () => {
    this.setState(({ counter }) => ({ counter: counter + 1 }));
  };

  render() {
    if (this.state.counter === 5) {
      throw new Error('I crashed!');
    }

    return (
      <button className="counter" onClick={this.handleClick}>
        {this.state.counter}
      </button>
    );
  }
}

class Child extends React.Component {
  componentWillUnmount() {
    window.alert('The child component is about to unmount.');
  }

  render() {
    return <h2 className="hello">Hello World!</h2>;
  }
}

class ColorLifecycle extends React.Component {
  state = { favoriteColor: 'red' };

  componentDidMount() {
    this.colorTimer = window.setTimeout(() => {
      this.setState({ favoriteColor: 'yellow' });
    }, 2500);
  }

  shouldComponentUpdate() {
    return true;
  }

  getSnapshotBeforeUpdate() {
    console.log('in getSnapshotBeforeUpdate');
    return null;
  }

  componentDidUpdate() {
    console.log('after update');
  }

  componentWillUnmount() {
    window.clearTimeout(this.colorTimer);
  }

  changeColor = () => {
    this.setState({ favoriteColor: 'blue' });
  };

  render() {
    return (
      <div className="lifecycle-copy">
        <span className="eyebrow">Updating phase</span>
        <h3>Favorite color: <span style={{ color: this.state.favoriteColor }}>{this.state.favoriteColor}</span></h3>
        <p>Starts red, changes to yellow after mounting, and can be changed to blue.</p>
        <button className="action-button" onClick={this.changeColor}>Change color</button>
      </div>
    );
  }
}

function SectionHeading({ number, title, note }) {
  return (
    <div className="section-heading">
      <span className="section-number">{number}</span>
      <div>
        <h2>{title}</h2>
        <p>{note}</p>
      </div>
    </div>
  );
}

export default class App extends React.Component {
  state = { showUnboundedDemo: false, show: true };

  runUnboundedDemo = () => {
    this.setState({ showUnboundedDemo: true });
  };

  deleteChild = () => {
    this.setState({ show: false });
  };

  render() {
    if (this.state.showUnboundedDemo) {
      return <BuggyCounter />;
    }

    return (
      <main className="page-shell">
        <header className="masthead">
          <p className="course-label">WEEK 08 <span>·</span> DAY 01</p>
          <h1>React <em>under pressure.</em></h1>
          <p className="intro">Error boundaries, update lifecycle, and what happens when a component leaves the tree.</p>
        </header>

        <section className="exercise-section">
          <SectionHeading
            number="01"
            title="Error boundary simulations"
            note="Click a counter five times to trigger the render error."
          />

          <div className="simulation-grid">
            <article className="simulation simulation-wide">
              <div className="simulation-title"><span>Simulation 1</span><span className="scope-tag">One boundary · two counters</span></div>
              <p>One crash replaces both counters.</p>
              <ErrorBoundary>
                <div className="counter-row"><BuggyCounter /><BuggyCounter /></div>
              </ErrorBoundary>
            </article>

            <article className="simulation">
              <div className="simulation-title"><span>Simulation 2</span><span className="scope-tag">Separate boundaries</span></div>
              <p>Each counter fails independently.</p>
              <div className="counter-row">
                <ErrorBoundary><BuggyCounter /></ErrorBoundary>
                <ErrorBoundary><BuggyCounter /></ErrorBoundary>
              </div>
            </article>

            <article className="simulation simulation-danger">
              <div className="simulation-title"><span>Simulation 3</span><span className="scope-tag">No boundary</span></div>
              <p>The uncaught error clears the app when it reaches five.</p>
              <button className="danger-button" onClick={this.runUnboundedDemo}>Run unbounded counter</button>
            </article>
          </div>
        </section>

        <section className="exercise-section lifecycle-section">
          <SectionHeading
            number="02–03"
            title="Lifecycle in motion"
            note="Watch the console for update lifecycle logs; remove the child to see unmounting."
          />
          <div className="lifecycle-panel">
            <ColorLifecycle />
            <div className="child-area">
              {this.state.show ? <Child /> : <p className="child-removed">Child component removed.</p>}
              {this.state.show && <button className="delete-button" onClick={this.deleteChild}>Delete</button>}
            </div>
          </div>
        </section>

        <footer><span>CLASS COMPONENTS</span><span>RENDER · UPDATE · UNMOUNT</span></footer>
      </main>
    );
  }
}