import React from 'react';

const techs = [
  'React.js',
  'Node.js',
  'Python',
  'Java',
  'MongoDB',
  'Firebase',
  'MySQL',
  'Flutter',
  'SkillRack (1120+)',
  'LeetCode (230+)',
];

export default function Collaborators() {
  return (
    <div className="marquee-section">
      <div className="container marquee-container">
        {techs.map((tech, idx) => (
          <div key={idx} className="marquee-item">
            <span></span>
            {tech}
          </div>
        ))}
      </div>
    </div>
  );
}
