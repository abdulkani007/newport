import React, { useRef, useEffect } from 'react';
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
  const cardSwapRef = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    let lastScrollY = window.scrollY || window.pageYOffset || 0;
    let accumulatedScroll = 0;
    const threshold = 140;

    const handleScroll = () => {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight || 800;

      // Only trigger when Technical Skills is in viewport
      if (rect.top > windowHeight * 0.85 || rect.bottom < windowHeight * 0.15) return;

      const currentScrollY = window.scrollY || window.pageYOffset || 0;
      const delta = currentScrollY - lastScrollY;
      lastScrollY = currentScrollY;

      if (Math.abs(delta) < 4) return;

      accumulatedScroll += delta;

      if (accumulatedScroll >= threshold) {
        accumulatedScroll = 0;
        if (cardSwapRef.current && !cardSwapRef.current.isAnimating()) {
          cardSwapRef.current.swapForward();
        }
      } else if (accumulatedScroll <= -threshold) {
        accumulatedScroll = 0;
        if (cardSwapRef.current && !cardSwapRef.current.isAnimating()) {
          cardSwapRef.current.swapBackward();
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="skills" className="section technical-skills" ref={sectionRef}>
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
            ref={cardSwapRef}
            width={620}
            height={190}
            cardDistance={35}
            verticalDistance={45}
            scrollDriven={true}
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
