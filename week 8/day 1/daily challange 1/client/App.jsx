import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      input: '',
      response: '',
    };
  }

  async componentDidMount() {
    try {
      const response = await fetch('/api/hello');
      const data = await response.json();
      this.setState({ message: data.message });
    } catch (error) {
      console.error('Error fetching hello message:', error);
    }
  }

  handleChange = (event) => {
    this.setState({ input: event.target.value });
  };

  handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('/api/world', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ value: this.state.input }),
      });

      const data = await response.json();
      this.setState({ response: data.message, input: '' });
    } catch (error) {
      console.error('Error sending POST request:', error);
    }
  };

  render() {
    return (
      <div className="container">
        <h1>{this.state.message}</h1>

        <form onSubmit={this.handleSubmit} className="form-box">
          <label htmlFor="messageInput">Type something:</label>
          <input
            id="messageInput"
            type="text"
            value={this.state.input}
            onChange={this.handleChange}
            placeholder="Enter a message"
          />
          <button type="submit">Send</button>
        </form>

        {this.state.response && <p className="response">{this.state.response}</p>}
      </div>
    );
  }
}

export default App;
