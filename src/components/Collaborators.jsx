import React from 'react';
import LogoLoop from './LogoLoop';

const techItems = [
  { title: "React.js", node: <span className="marquee-item"><i className="fab fa-react" style={{ color: '#ef4444' }}></i> React.js</span> },
  { title: "Node.js", node: <span className="marquee-item"><i className="fab fa-node-js" style={{ color: '#ef4444' }}></i> Node.js</span> },
  { title: "Python", node: <span className="marquee-item"><i className="fab fa-python" style={{ color: '#ef4444' }}></i> Python</span> },
  { title: "Java", node: <span className="marquee-item"><i className="fab fa-java" style={{ color: '#ef4444' }}></i> Java</span> },
  { title: "MongoDB", node: <span className="marquee-item"><i className="fas fa-database" style={{ color: '#ef4444' }}></i> MongoDB</span> },
  { title: "Firebase", node: <span className="marquee-item"><i className="fas fa-fire" style={{ color: '#ef4444' }}></i> Firebase</span> },
  { title: "MySQL", node: <span className="marquee-item"><i className="fas fa-server" style={{ color: '#ef4444' }}></i> MySQL</span> },
  { title: "Flutter", node: <span className="marquee-item"><i className="fas fa-mobile-alt" style={{ color: '#ef4444' }}></i> Flutter</span> },
  { title: "SkillRack (1120+)", node: <span className="marquee-item"><i className="fas fa-code" style={{ color: '#ef4444' }}></i> SkillRack (1120+)</span> },
  { title: "LeetCode (230+)", node: <span className="marquee-item"><i className="fas fa-laptop-code" style={{ color: '#ef4444' }}></i> LeetCode (230+)</span> },
];

export default function Collaborators() {
  return (
    <div className="marquee-section">
      <div className="container" style={{ padding: '0 12px' }}>
        <LogoLoop
          logos={techItems}
          speed={85}
          direction="left"
          logoHeight={26}
          gap={48}
          hoverSpeed={0}
          fadeOut={true}
          scaleOnHover={true}
          ariaLabel="Technologies and achievements ticker"
        />
      </div>
    </div>
  );
}
