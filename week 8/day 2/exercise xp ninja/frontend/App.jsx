import React from 'react';
import UsersList from './components/UsersList.jsx';
import Customers from './components/Customers.jsx';

class App extends React.Component {
  render() {
    return (
      <div className="container">
        <h1>Express + React Data Fetch</h1>

        <div className="app-grid">
          <section className="panel">
            <h2>Exercise 1: Users from backend</h2>
            <UsersList />
          </section>

          <section className="panel">
            <h2>Exercise 2: Customers from backend</h2>
            <Customers />
          </section>
        </div>
      </div>
    );
  }
}

export default App;
