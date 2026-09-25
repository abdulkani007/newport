import React from 'react';
import Shuffle from './Shuffle';
import BorderGlow from './BorderGlow';
import ScrollStack, { ScrollStackItem } from './ScrollStack';

const achievementsData = [
  {
    icon: 'fas fa-star',
    award: 'UX Excellence Award',
    college: 'Sri Eshwar College of Engineering',
    event: 'Agentverse Hackathon',
    badge: 'SPECIAL AWARD',
  },
  {
    icon: 'fas fa-trophy',
    award: 'Runner-up (Ripple Room)',
    college: 'PSG Tech',
    event: 'Srishti 2K25',
    badge: '2ND PLACE',
  },
  {
    icon: 'fas fa-award',
    award: '2nd Prize (Paper Presentation)',
    college: "Fiestaa '26 - KPR College",
    event: 'Paper Presentation',
    badge: '2ND PLACE',
  },
  {
    icon: 'fas fa-certificate',
    award: 'Project Presentation Finalist',
    college: 'Karpagam Institute of Technology',
    event: 'Project Presentation',
    badge: 'FINALIST',
  },
  {
    icon: 'fas fa-laptop-code',
    award: 'Top 10 (24-Hour Hackathon)',
    college: 'CMR College, Hyderabad',
    event: '24-Hour Hackathon',
    badge: 'TOP 10',
  },
  {
    icon: 'fas fa-medal',
    award: 'Embadathon Finalist',
    college: 'Embedded Systems Hackathon',
    event: 'Embadathon',
    badge: 'FINALIST',
  },
];

export default function Achievements() {
  return (
    <section id="achievements" className="section achievements">
      <div className="container">
        <span className="section-tag">RECOGNITION & HONORS</span>
        <Shuffle
          text="Achievements"
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
          itemDistance={24}
          itemScale={0.018}
          itemStackDistance={32}
          stackPosition="18%"
          scaleEndPosition="10%"
          baseScale={0.92}
        >
          {achievementsData.map((item, idx) => (
            <ScrollStackItem key={idx}>
              <BorderGlow className="achievement-card">
                <div className="achievement-left">
                  <div className="achievement-icon">
                    <i className={item.icon}></i>
                  </div>
                  <div className="achievement-content">
                    <h3 className="achievement-award-title">{item.award}</h3>
                    <p className="achievement-college-name">
                      <strong>{item.college}</strong>
                    </p>
                    <span className="achievement-event-name">
                      <strong>Event:</strong> {item.event}
                    </span>
                  </div>
                </div>

                <div className="achievement-right">
                  <div className="achievement-badge-pill">
                    <i className="fas fa-award"></i>
                    <span>{item.badge}</span>
                  </div>
                </div>
              </BorderGlow>
            </ScrollStackItem>
          ))}
        </ScrollStack>
      </div>
    </section>
  );
}
