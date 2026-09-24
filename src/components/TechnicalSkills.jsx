import React from 'react';
import Shuffle from './Shuffle';
import BorderGlow from './BorderGlow';
import ScrollStack, { ScrollStackItem } from './ScrollStack';

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

        <ScrollStack
          useWindowScroll={true}
          itemDistance={35}
          itemScale={0.025}
          itemStackDistance={75}
          stackPosition="15%"
          scaleEndPosition="10%"
          baseScale={0.88}
        >
          {skillGroups.map((group, idx) => (
            <ScrollStackItem key={idx}>
              <BorderGlow className="skill-card">
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
            </ScrollStackItem>
          ))}
        </ScrollStack>
      </div>
    </section>
  );
}
