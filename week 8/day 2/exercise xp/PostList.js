import React from 'react';
import posts from './posts.json';

export default function PostList() {
  return (
    <div className="post-list list-group">
      {posts.map((post) => (
        <div className="list-group-item" key={post.id || post.title}>
          <h4>{post.title}</h4>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  );
}
