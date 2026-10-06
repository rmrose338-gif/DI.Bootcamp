import React from 'react';
import data from './data.json';

class Example2 extends React.Component {
  render() {
    return (
      <div className="example-block">
        <h3>Example 2</h3>
        {data.Skills.map((skill, index) => (
          <div className="border rounded p-3 mb-2" key={index}>
            <strong>{skill.name}</strong>
            <ul className="mb-0 mt-2">
              {skill.items.map((item, itemIndex) => (
                <li key={itemIndex}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    );
  }
}

export default Example2;
