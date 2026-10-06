import React from 'react';

class UsersList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      loaded: false,
    };
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        return response.json();
      })
      .then((data) => {
        this.setState({ users: data, loaded: true });
      })
      .catch((error) => {
        console.error(error);
        this.setState({ loaded: false });
      });
  }

  render() {
    const { users, loaded } = this.state;

    if (!loaded) {
      return <div className="loading">Loading...</div>;
    }

    return (
      <ul className="user-list">
        {users.map((user) => (
          <li className="user-item" key={user.id}>
            <h3>{user.name}</h3>
            <p>{user.email}</p>
          </li>
        ))}
      </ul>
    );
  }
}

export default UsersList;
