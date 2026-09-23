import React from 'react';

export default function Experience() {
  return (
    <section id="experience" className="section experience">
      <div className="container">
        <span className="section-tag">Career Timeline</span>
        <h2 className="section-title">Experience</h2>

        <div className="timeline">
          <div className="card timeline-card">
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
          </div>
        </div>
      </div>
    </section>
  );
}
