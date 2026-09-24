import React, { useState, useEffect, useRef } from 'react';
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
  const trackRef = useRef(null);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const track = trackRef.current;
      if (!track) return;

      const rect = track.getBoundingClientRect();
      const windowHeight = window.innerHeight || 800;
      const scrollableDist = rect.height - windowHeight;

      if (scrollableDist <= 0) return;

      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(0.999, scrolled / scrollableDist));
      const step = Math.floor(progress * skillGroups.length);

      setActiveStep(step);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="skills" className="section technical-skills-pinned-track" ref={trackRef}>
      <div className="technical-skills-sticky-viewport">
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
              width={760}
              height={290}
              cardDistance={50}
              verticalDistance={38}
              stepIndex={activeStep}
              skewAmount={3}
              easing="elastic"
            >
              {skillGroups.map((group, idx) => (
                <Card key={idx}>
                  <BorderGlow className="skill-card-inner" style={{ height: '100%', padding: '2rem 2.4rem', borderRadius: '24px' }}>
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
      </div>
    </section>
  );
}
