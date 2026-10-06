import React from 'react';
import PostForm from './PostForm.jsx';
import AxiosPostForm from './AxiosPostForm.jsx';

class App extends React.Component {
  render() {
    return (
      <div className="container">
        <h1>Week 8 - Day 2 - Exercise XP Gold</h1>

        <div className="exercise-box">
          <h2>Exercise 1: POST JSON Data</h2>
          <PostForm />
        </div>

        <div className="exercise-box">
          <h2>Exercise 1: POST JSON Data with Axios</h2>
          <AxiosPostForm />
        </div>
      </div>
    );
  }
}

export default App;
