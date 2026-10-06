import React from 'react';

class PostForm extends React.Component {
  state = {
    user: '',
    email: '',
    response: null,
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = async (event) => {
    event.preventDefault();

    const dataToSend = {
      user: this.state.user,
      email: this.state.email,
    };

    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });

      const result = await response.json();
      console.log('Posted data:', dataToSend);
      console.log('Server response:', result);
      this.setState({ response: result });
    } catch (error) {
      console.error('Error posting data:', error);
    }
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          User
          <input
            type="text"
            name="user"
            placeholder="Enter username"
            value={this.state.user}
            onChange={this.handleChange}
          />
        </label>

        <label>
          Email
          <input
            type="email"
            name="email"
            placeholder="Enter email"
            value={this.state.email}
            onChange={this.handleChange}
          />
        </label>

        <button type="submit">Submit</button>

        {this.state.response && (
          <pre>{JSON.stringify(this.state.response, null, 2)}</pre>
        )}
      </form>
    );
  }
}

export default PostForm;
