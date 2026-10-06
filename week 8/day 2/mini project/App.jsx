import React from 'react';
import PostList from './PostList.jsx';
import UsersList from './UsersList.jsx';

class App extends React.Component {
  render() {
    return (
      <div className="container">
        <h1>My App</h1>

        <section className="section">
          <h2>Posts</h2>
          <PostList />
        </section>

        <section className="section">
          <h2>Users</h2>
          <UsersList />
        </section>
      </div>
    );
  }
}

export default App;
