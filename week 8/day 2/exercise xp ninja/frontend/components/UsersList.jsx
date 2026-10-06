import React from 'react';

class UsersList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
    };
  }

  componentDidMount() {
    fetch('/users')
      .then((response) => response.json())
      .then((data) => this.setState({ users: data }))
      .catch((error) => console.error('Error fetching users:', error));
  }

  render() {
    const { users } = this.state;

    return (
      <ul className="user-list">
        {users.map((user) => (
          <li key={user.id} className="user-item">
            <strong>{user.username}</strong>
          </li>
        ))}
      </ul>
    );
  }
}

export default UsersList;
