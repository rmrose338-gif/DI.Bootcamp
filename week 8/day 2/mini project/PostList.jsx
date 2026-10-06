import React from 'react';

class PostList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      errorMsg: '',
    };
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }
        return response.json();
      })
      .then((data) => {
        this.setState({ posts: data, errorMsg: '' });
      })
      .catch((error) => {
        this.setState({ errorMsg: error.message });
      });
  }

  render() {
    const { posts, errorMsg } = this.state;

    if (errorMsg) {
      return <div className="error">{errorMsg}</div>;
    }

    if (!posts.length) {
      return <div className="loading">Loading posts...</div>;
    }

    return (
      <ul className="post-list">
        {posts.slice(0, 10).map((post) => (
          <li className="post-item" key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
    );
  }
}

export default PostList;
