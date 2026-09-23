import React from 'react';

const achievementsData = [
  {
    icon: 'fas fa-trophy',
    title: 'Runner-up',
    subtitle: 'Ripple Room - Srishti 2K25',
    venue: 'PSG Tech',
  },
  {
    icon: 'fas fa-award',
    title: '2nd Prize',
    subtitle: 'Paper Presentation',
    venue: "Fiestaa '26 - KPR College",
  },
  {
    icon: 'fas fa-medal',
    title: 'Finalist',
    subtitle: 'Embadathon',
    venue: 'Embedded Systems Hackathon',
  },
  {
    icon: 'fas fa-laptop-code',
    title: 'Hackathon Participant',
    subtitle: 'Gen AI & IoT Hackathons',
    venue: 'Multiple Platforms',
  },
  {
    icon: 'fas fa-lightbulb',
    title: 'Innovation Events',
    subtitle: 'Creatathon & Freshathon',
    venue: 'Active Participant',
  },
  {
    icon: 'fas fa-code',
    title: 'Online Hackathons',
    subtitle: 'Unstop & Devfolio',
    venue: 'Regular Participant',
  },
];

export default function Achievements() {
  return (
    <section id="achievements" className="section achievements">
      <div className="container">
        <span className="section-tag">RECOGNITION & HONORS</span>
        <h2 className="section-title">Achievements</h2>

        <div className="achievements-grid">
          {achievementsData.map((item, idx) => (
            <div key={idx} className="card achievement-card">
              <div className="achievement-icon">
                <i className={item.icon}></i>
              </div>
              <div className="achievement-details">
                <h3>{item.title}</h3>
                <p>{item.subtitle}</p>
                <span className="achievement-venue">{item.venue}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
