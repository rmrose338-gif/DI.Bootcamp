import React from 'react';
import axios from 'axios';

class AxiosPostForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: '',
      title: '',
      body: '',
      response: null,
    };
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = async (event) => {
    event.preventDefault();

    const { userId, title, body } = this.state;

    const dataToSend = {
      userId,
      title,
      body,
    };

    try {
      const response = await axios.post('https://jsonplaceholder.typicode.com/posts', dataToSend);
      console.log('Posted data:', dataToSend);
      console.log('Axios response:', response.data);
      this.setState({ response: response.data });
    } catch (error) {
      console.error('Error with axios POST:', error);
    }
  };

  render() {
    const { userId, title, body } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          userId
          <input
            type="number"
            placeholder="Enter userId"
            name="userId"
            value={userId}
            onChange={this.handleChange}
          />
        </label>

        <label>
          title
          <input
            type="text"
            placeholder="Enter title"
            name="title"
            value={title}
            onChange={this.handleChange}
          />
        </label>

        <label>
          body
          <textarea
            rows="4"
            placeholder="Enter body"
            name="body"
            value={body}
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

export default AxiosPostForm;
