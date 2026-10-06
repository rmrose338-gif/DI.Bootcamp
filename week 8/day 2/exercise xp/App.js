import React from 'react';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import ErrorBoundary from './ErrorBoundary.js';
import PostList from './PostList.js';
import Example1 from './Example1.jsx';
import Example2 from './Example2.jsx';
import Example3 from './Example3.jsx';

function HomeScreen() {
  return (
    <header className="page-header">
      <h1>Home</h1>
      <p>Welcome to the router exercise demo.</p>
    </header>
  );
}

function ProfileScreen() {
  return (
    <header className="page-header">
      <h1>Profile</h1>
      <p>Here is the profile section.</p>
    </header>
  );
}

function ShopScreen() {
  throw new Error('The shop page crashed on purpose.');
}

const sendJsonData = async () => {
  const webhookUrl = 'https://webhook.site/your-unique-url';
  const data = {
    key1: 'myusername',
    email: 'mymail@gmail.com',
    name: 'Isaac',
    lastname: 'Doe',
    age: 27,
  };

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.text();
    console.log('Webhook response:', result);
  } catch (error) {
    console.error('Failed to send data:', error);
  }
};

function App() {
  return (
    <BrowserRouter>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <NavLink className="navbar-brand" to="/">
            React Router Demo
          </NavLink>
          <div className="navbar-nav ms-auto">
            <NavLink
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              to="/"
            >
              Home
            </NavLink>
            <NavLink
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              to="/profile"
            >
              Profile
            </NavLink>
            <NavLink
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              to="/shop"
            >
              Shop
            </NavLink>
          </div>
        </div>
      </nav>

      <div className="container py-4">
        <Routes>
          <Route path="/" element={<ErrorBoundary><HomeScreen /></ErrorBoundary>} />
          <Route path="/profile" element={<ErrorBoundary><ProfileScreen /></ErrorBoundary>} />
          <Route path="/shop" element={<ErrorBoundary><ShopScreen /></ErrorBoundary>} />
        </Routes>

        <section className="card p-4 mt-4">
          <h2>Exercise 2: Display JSON Data</h2>
          <PostList />
        </section>

        <section className="card p-4 mt-4">
          <h2>Exercise 3: Display and Parse JSON Data</h2>
          <div className="row g-4">
            <div className="col-md-4">
              <Example1 />
            </div>
            <div className="col-md-4">
              <Example2 />
            </div>
            <div className="col-md-4">
              <Example3 />
            </div>
          </div>
        </section>

        <section className="card p-4 mt-4 webhook-panel">
          <h2>Exercise 4: Post JSON Data</h2>
          <button className="btn btn-primary" onClick={sendJsonData}>
            Send JSON
          </button>
        </section>
      </div>
    </BrowserRouter>
  );
}

export default App;
