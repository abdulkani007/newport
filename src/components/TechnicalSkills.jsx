import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import Shuffle from './Shuffle';
import BorderGlow from './BorderGlow';
import './TechnicalSkills.css';

const skillGroups = [
  {
    id: 'languages',
    icon: 'fas fa-code',
    category: 'Languages',
    title: 'Programming Languages',
    description: 'Strong foundation in object-oriented, functional, and system programming.',
    tags: ['C', 'C++', 'Python', 'Java']
  },
  {
    id: 'frontend',
    icon: 'fas fa-laptop-code',
    category: 'Frontend',
    title: 'Frontend Development',
    description: 'Crafting fluid, high-performance web applications and responsive interfaces.',
    tags: ['HTML5', 'CSS3', 'JavaScript', 'React.js']
  },
  {
    id: 'backend',
    icon: 'fas fa-server',
    category: 'Backend',
    title: 'Backend Development',
    description: 'Building robust API gateways, server application logic, and microservices.',
    tags: ['Node.js', 'Express.js']
  },
  {
    id: 'databases',
    icon: 'fas fa-database',
    category: 'Databases',
    title: 'Database Management',
    description: 'Designing structured schemas, relational databases, and real-time stores.',
    tags: ['MySQL', 'MongoDB', 'Firebase']
  },
  {
    id: 'tools',
    icon: 'fas fa-tools',
    category: 'Tools',
    title: 'Tools & Technologies',
    description: 'Version control, developer utilities, workflow automation, and cross-platform tools.',
    tags: ['VS Code', 'Git', 'IntelliJ IDEA', 'Canva', 'Flutter', 'Shell Scripting']
  },
  {
    id: 'visualization',
    icon: 'fas fa-chart-bar',
    category: 'Visualization',
    title: 'Data & Visualization',
    description: 'Data analytics, quantitative metrics, visual dashboards, and charting.',
    tags: ['Matplotlib', 'Power BI']
  }
];

export default function TechnicalSkills() {
  const [activeFilter, setActiveFilter] = useState('all');
  const gridRef = useRef(null);

  const filterCategories = [
    { id: 'all', label: 'SHOW ALL' },
    { id: 'languages', label: 'LANGUAGES' },
    { id: 'frontend', label: 'FRONTEND' },
    { id: 'backend', label: 'BACKEND' },
    { id: 'databases', label: 'DATABASES' },
    { id: 'tools', label: 'TOOLS' },
    { id: 'visualization', label: 'VISUALIZATION' },
  ];

  const filteredGroups = activeFilter === 'all'
    ? skillGroups
    : skillGroups.filter(g => g.id === activeFilter);

  // Scroll reveal animation
  useEffect(() => {
    const cards = gridRef.current?.querySelectorAll('.skills-card');
    if (!cards || cards.length === 0) return;

    gsap.fromTo(
      cards,
      { opacity: 0, y: 35, scale: 0.94 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        stagger: 0.08,
        ease: 'power3.out',
        overwrite: 'auto'
      }
    );
  }, [activeFilter]);

  return (
    <section id="skills" className="section technical-skills-section">
      <div className="container">
        <div className="skills-header-row">
          <div className="skills-title-col">
            <span className="section-tag">02 / SYSTEMS & CAPABILITIES</span>
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
          </div>

          <p className="skills-intro-desc">
            Interactive breakdown of technologies, frameworks, and developer tools powering full-stack web applications and data systems.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="skills-filter-bar">
          {filterCategories.map((cat) => (
            <button
              key={cat.id}
              className={`skills-filter-btn ${activeFilter === cat.id ? 'active' : ''}`}
              onClick={() => setActiveFilter(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Cards Grid */}
        <div ref={gridRef} className="skills-grid">
          {filteredGroups.map((group, idx) => (
            <div key={group.id} className="skills-card">
              <BorderGlow className="skills-card-inner" style={{ borderRadius: '24px' }}>
                <div className="skills-card-header">
                  <div className="skills-icon-badge">
                    <i className={group.icon}></i>
                  </div>
                  <span className="skills-number">0{idx + 1}</span>
                </div>

                <div className="skills-card-body">
                  <h3>{group.title}</h3>
                  <p>{group.description}</p>
                </div>

                <div className="skills-card-footer">
                  <div className="skills-pills-list">
                    {group.tags.map((tag, tIdx) => (
                      <span key={tIdx} className="skill-pill-tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </BorderGlow>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
