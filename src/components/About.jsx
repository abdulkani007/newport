import React from 'react';
import Shuffle from './Shuffle';
import BorderGlow from './BorderGlow';
import './About.css';

const focusItems = [
  {
    icon: 'fas fa-graduation-cap',
    title: 'Academic Excellence',
    description: 'B.Tech IT Student (2024–2028) at Sri Eshwar College of Engineering with an 8.05 CGPA.',
    accentColor: '#8B5CF6',
  },
  {
    icon: 'fas fa-layer-group',
    title: 'Full-Stack Architecture',
    description: 'Engineering high-performance web systems, responsive UIs, microservices, and secure APIs.',
    accentColor: '#EF4444',
  },
  {
    icon: 'fas fa-robot',
    title: 'AI & Intelligent Automation',
    description: 'Integrating AI voice assistants, speech processing, and GPT automation into production workflows.',
    accentColor: '#10B981',
  },
  {
    icon: 'fas fa-lightbulb',
    title: 'Innovation & Leadership',
    description: 'Active contributor to tech communities, hackathons, and autonomous engineering projects.',
    accentColor: '#3B82F6',
  },
];

export default function About() {
  return (
    <section id="about" className="section about-section">
      <div className="container">
        <span className="section-tag">Capabilities & Overview</span>
        <Shuffle
          text="About Me"
          tag="h2"
          className="section-title"
          shuffleDirection="right"
          duration={0.35}
          animationMode="evenodd"
          shuffleTimes={1}
          stagger={0.03}
          triggerOnHover={true}
        />

        <div className="about-wrapper">
          {/* Main Bio Card */}
          <BorderGlow className="about-bio-card">
            <p>
              I am a B.Tech Information Technology student at Sri Eshwar College of Engineering (2024–2028), passionate about building high-performance web systems, intelligent automation, and scalable software solutions.
            </p>
            <p>
              Driven by curiosity and engineering rigor, I focus on turning complex ideas into intuitive digital experiences—ranging from real-time full-stack web applications and AI voice platforms to automated loan engines and telemetry tools.
            </p>
          </BorderGlow>

          {/* 4 Focus Grid Cards */}
          <div className="about-focus-grid">
            {focusItems.map((item, idx) => (
              <BorderGlow
                key={idx}
                className="about-focus-card"
                style={{
                  '--accent-color': item.accentColor,
                  borderBottom: `3px solid ${item.accentColor}`
                }}
              >
                <div
                  className="focus-icon-box"
                  style={{
                    color: item.accentColor,
                    borderColor: `${item.accentColor}55`,
                    backgroundColor: `${item.accentColor}15`
                  }}
                >
                  <i className={item.icon}></i>
                </div>
                <h3 className="focus-title">{item.title}</h3>
                <p className="focus-desc">{item.description}</p>
              </BorderGlow>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
