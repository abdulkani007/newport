import React from 'react';
import Shuffle from './Shuffle';
import CardSwap, { Card } from './CardSwap';
import BorderGlow from './BorderGlow';

const skillGroups = [
  {
    icon: 'fas fa-code',
    title: 'Programming Languages',
    tags: ['C', 'C++', 'Python', 'Java'],
  },
  {
    icon: 'fas fa-laptop-code',
    title: 'Frontend Development',
    tags: ['HTML5', 'CSS3', 'JavaScript', 'React.js'],
  },
  {
    icon: 'fas fa-server',
    title: 'Backend Development',
    tags: ['Node.js', 'Express.js'],
  },
  {
    icon: 'fas fa-database',
    title: 'Database Management',
    tags: ['MySQL', 'MongoDB', 'Firebase'],
  },
  {
    icon: 'fas fa-tools',
    title: 'Tools & Technologies',
    tags: ['VS Code', 'Git', 'IntelliJ IDEA', 'Canva', 'Flutter', 'Shell Scripting'],
  },
  {
    icon: 'fas fa-chart-bar',
    title: 'Data & Visualization',
    tags: ['Matplotlib', 'Power BI'],
  },
];

export default function TechnicalSkills() {
  return (
    <section id="skills" className="section technical-skills">
      <div className="container">
        <span className="section-tag">Stack & Tooling</span>
        <Shuffle
          text="Technical Skills"
          tag="h2"
          className="section-title"
          shuffleDirection="right"
          duration={0.35}
          animationMode="evenodd"
          shuffleTimes={1}
          stagger={0.03}
          triggerOnHover={true}
        />

        <div className="card-swap-wrapper">
          <CardSwap
            width={620}
            height={190}
            cardDistance={35}
            verticalDistance={45}
            scrollDriven={true}
            pauseOnHover={true}
            skewAmount={2}
            easing="elastic"
          >
            {skillGroups.map((group, idx) => (
              <Card key={idx}>
                <BorderGlow className="skill-card-inner" style={{ borderRadius: '20px' }}>
                  <div className="skill-card-header">
                    <i className={group.icon}></i>
                    <h3>{group.title}</h3>
                  </div>
                  <div className="skill-pills">
                    {group.tags.map((tag, tIdx) => (
                      <span key={tIdx} className="skill-pill">
                        {tag}
                      </span>
                    ))}
                  </div>
                </BorderGlow>
              </Card>
            ))}
          </CardSwap>
        </div>
      </div>
    </section>
  );
}
