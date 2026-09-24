import React from 'react';
import Shuffle from './Shuffle';
import BorderGlow from './BorderGlow';

const certsData = [
  {
    title: 'Database Management System',
    issuer: 'NPTEL - September 2025',
    img: 'nptl.jpg',
    alt: 'NPTEL DBMS',
  },
  {
    title: 'MATLAB Onramp',
    issuer: 'MathWorks - November 2024',
    img: 'math.png',
    alt: 'MATLAB',
  },
  {
    title: 'Robotics and AI',
    issuer: 'Great Learning',
    img: 'robo.jpg',
    alt: 'Robotics AI',
  },
  {
    title: 'C & C++ Training',
    issuer: 'IIT Bombay - December 2024',
    img: 'cpp.png',
    alt: 'C C++',
  },
  {
    title: 'Java Oracle Batch',
    issuer: 'Oracle Learning - November 2025',
    img: 'oracal.png',
    alt: 'Java Oracle',
  },
  {
    title: 'SoloLearn Introduction to C',
    issuer: 'SoloLearn - December 2025',
    img: 'solo.jpg',
    alt: 'SoloLearn C',
  },
  {
    title: 'Salesforce Agentforce Specialist',
    issuer: 'Salesforce - December 2025',
    img: 'Sales force.jpg',
    alt: 'Salesforce',
  },
];

export default function Certificates() {
  return (
    <section id="certificates" className="section certificate">
      <div className="container">
        <span className="section-tag">VERIFIED CREDENTIALS</span>
        <Shuffle
          text="Certifications"
          tag="h2"
          className="section-title"
          shuffleDirection="right"
          duration={0.35}
          animationMode="evenodd"
          shuffleTimes={1}
          stagger={0.03}
          triggerOnHover={true}
        />

        <div className="cert-grid">
          {certsData.map((cert, idx) => (
            <BorderGlow key={idx} className="card cert-card">
              <div className="cert-img-wrapper">
                <img src={cert.img} alt={cert.alt} />
              </div>
              <div className="cert-content">
                <h3>{cert.title}</h3>
                <p>{cert.issuer}</p>
              </div>
            </BorderGlow>
          ))}
        </div>
      </div>
    </section>
  );
}
