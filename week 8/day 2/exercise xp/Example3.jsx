import React from 'react';
import data from './data.json';

class Example3 extends React.Component {
  render() {
    return (
      <div className="example-block">
        <h3>Example 3</h3>
        {data.Experiences.map((experience, index) => (
          <div className="border rounded p-3 mb-2" key={index}>
            <strong>{experience.company}</strong>
            {experience.projects.map((project, projectIndex) => (
              <div className="mt-2" key={`${experience.company}-${projectIndex}`}>
                <div>{project.name}</div>
                <div className="text-muted">
                  {project.stack.join(' • ')}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  }
}

export default Example3;
