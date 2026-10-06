import React from 'react';
import AutoCompletedText from './AutoCompletedText.jsx';

class App extends React.Component {
  render() {
    return (
      <div className="app">
        <h1>Country Search</h1>
        <AutoCompletedText />
      </div>
    );
  }
}

export default App;
