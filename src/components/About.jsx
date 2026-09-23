import React from 'react';

export default function About() {
  return (
    <section id="about" className="section about">
      <div className="container">
        <span className="section-tag">Capabilities & Overview</span>
        <h2 className="section-title">About Me</h2>

        <div className="about-grid">
          <div className="card about-desc-card">
            <p>
              I am a B.Tech IT student at Sri Eshwar College of Engineering (2024-2028) with a CGPA of 8.07, passionate about full-stack development, AI systems, and intelligent automation. I specialize in building scalable web applications, AI-powered platforms, and real-time systems using React, Node.js, MongoDB, and Firebase.
            </p>
            <p>
              My expertise spans developing intelligent systems including AI voice assistants, event management platforms, loan approval systems, and content workflow automation.
            </p>
            <p>
              With a strong foundation in competitive programming, I have solved 1120+ problems on SkillRack, 230+ on LeetCode, and 300+ on CodeChef. Certified 5-star Java problem solver on HackerRank, with awards at PSG Tech (Ripple Room Runner-up) and KPR College (2nd Prize Paper Presentation).
            </p>
          </div>

          <div className="capabilities-grid">
            <div className="card capability-card">
              <h4>Frontend & Interface</h4>
              <p>Crafting responsive, high-performance web interfaces with modern React frameworks and clean component architecture.</p>
              <ul className="capability-list">
                <li>React.js & State Management</li>
                <li>HTML5 & CSS3 Layouts</li>
                <li>JavaScript (ES6+)</li>
                <li>Responsive UI Architecture</li>
              </ul>
            </div>

            <div className="card capability-card">
              <h4>Backend & AI Systems</h4>
              <p>Designing secure backend APIs, database models, and intelligent AI automation integrations.</p>
              <ul className="capability-list">
                <li>Node.js & Express APIs</li>
                <li>MongoDB & Firebase NoSQL</li>
                <li>MySQL Database Schemas</li>
                <li>Python Speech & GPT Automation</li>
              </ul>
            </div>

            <div className="card capability-card">
              <h4>Problem Solving & Data</h4>
              <p>Demonstrated competitive programming efficiency and quantitative data visual analytics.</p>
              <ul className="capability-list">
                <li>1120+ SkillRack Solved</li>
                <li>230+ LeetCode Solved</li>
                <li>HackerRank 5-Star Java</li>
                <li>Power BI & Matplotlib</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
