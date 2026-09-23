import React from 'react';
import Shuffle from './Shuffle';
import BorderGlow from './BorderGlow';

export default function Experience() {
  return (
    <section id="experience" className="section experience">
      <div className="container">
        <span className="section-tag">Career Timeline</span>
        <Shuffle
          text="Experience"
          tag="h2"
          className="section-title"
          shuffleDirection="right"
          duration={0.35}
          animationMode="evenodd"
          shuffleTimes={1}
          stagger={0.03}
          triggerOnHover={true}
        />

        <div className="timeline">
          <BorderGlow className="timeline-card">
            <div className="timeline-header">
              <div>
                <h3 className="timeline-role">Web Development Intern</h3>
                <div className="timeline-company">iGenuine Technologies</div>
              </div>
              <span className="timeline-date">December 2025</span>
            </div>

            <ul className="timeline-bullets">
              <li>Developed MERN stack web applications with responsive design principles</li>
              <li>Built dynamic frontend interfaces using React.js and modern component state</li>
              <li>Implemented RESTful backend APIs with Node.js and Express</li>
              <li>Integrated MongoDB database for efficient real-time data management</li>
              <li>Managed seamless data flow and security between frontend and backend systems</li>
            </ul>
          </BorderGlow>
        </div>
      </div>
    </section>
  );
}
