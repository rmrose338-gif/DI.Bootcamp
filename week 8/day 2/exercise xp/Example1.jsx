import React from 'react';
import data from './data.json';

class Example1 extends React.Component {
  render() {
    return (
      <div className="example-block">
        <h3>Example 1</h3>
        {data.SocialMedias.map((item, index) => (
          <div className="border rounded p-2 mb-2" key={index}>
            {item}
          </div>
        ))}
      </div>
    );
  }
}

export default Example1;
