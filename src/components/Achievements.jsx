import React from 'react';
import Shuffle from './Shuffle';
import BorderGlow from './BorderGlow';
import ScrollStack, { ScrollStackItem } from './ScrollStack';

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
          itemDistance={35}
          itemScale={0.025}
          itemStackDistance={75}
          stackPosition="15%"
          scaleEndPosition="10%"
          baseScale={0.88}
        >
          {achievementsData.map((item, idx) => (
            <ScrollStackItem key={idx}>
              <BorderGlow className="achievement-card">
                <div className="achievement-icon">
                  <i className={item.icon}></i>
                </div>
                <div className="achievement-details">
                  <h3>{item.title}</h3>
                  <p>{item.subtitle}</p>
                  <span className="achievement-venue">{item.venue}</span>
                </div>
              </BorderGlow>
            </ScrollStackItem>
          ))}
        </ScrollStack>
      </div>
    </section>
  );
}
