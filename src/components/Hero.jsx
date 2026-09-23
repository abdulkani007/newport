import React, { useState, useEffect } from 'react';

export default function Hero() {
  const fullText = "Hello !! This is Abdul Kani";
  const [typedContent, setTypedContent] = useState('');
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index < fullText.length) {
        index++;
        setTypedContent(fullText.substring(0, index));
      } else {
        setIsTypingComplete(true);
        clearInterval(timer);
      }
    }, 100);

    return () => clearInterval(timer);
  }, []);

  const renderTypedText = () => {
    if (typedContent.includes('Abdul Kani')) {
      const parts = typedContent.split('Abdul Kani');
      return (
        <>
          {parts[0]}
          <span className="name-highlight">Abdul Kani</span>
          {parts[1]}
        </>
      );
    }
    return typedContent;
  };

  const handleSmoothScroll = (e, targetId) => {
    e.preventDefault();
    const target = document.getElementById(targetId);
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 80,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section id="home" className="hero-section">
      <div className="container">
        <div className="hero-grid">
          {/* LEFT COLUMN */}
          <div className="hero-left">
            <div className="status-badge">
              <span className="status-dot"></span>
              Available for select projects
            </div>

            <h1 className="hero-title">
              {renderTypedText()}
              <span
                className="typing-cursor"
                style={{ animation: isTypingComplete ? 'blink 0.7s infinite' : 'none' }}
              >
                |
              </span>
            </h1>

            <p className="hero-subtitle">
              Building scalable web applications, AI platforms, and competitive programming solutions with clean code, structural precision, and timeless design.
            </p>

            <div className="hero-badges">
              <span className="hero-badge">Frontend Engineering</span>
              <span className="hero-badge">MERN Stack</span>
              <span className="hero-badge">AI Systems</span>
              <span className="hero-badge">Competitive Programming</span>
            </div>

            <div className="hero-actions">
              <a
                href="#projects"
                className="btn-primary"
                onClick={(e) => handleSmoothScroll(e, 'projects')}
              >
                View Projects <i className="fas fa-arrow-up-right-from-square"></i>
              </a>

              <a
                href="Copy of Abdul's resume.pdf"
                className="btn-secondary"
                download="Copy of Abdul's resume.pdf"
              >
                Download Resume <i className="fas fa-download"></i>
              </a>

              <div className="social-pills">
                <a
                  href="https://github.com/abdulkani007"
                  target="_blank"
                  rel="noreferrer"
                  className="social-pill"
                  aria-label="GitHub"
                >
                  <i className="fab fa-github"></i>
                </a>
                <a
                  href="https://www.linkedin.com/in/abdul-kani-b-3b89aa332?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                  target="_blank"
                  rel="noreferrer"
                  className="social-pill"
                  aria-label="LinkedIn"
                >
                  <i className="fab fa-linkedin"></i>
                </a>
                <a
                  href="https://www.instagram.com/ab_naszz___?igsh=Mm1qYXB0YXBxNWY3"
                  target="_blank"
                  rel="noreferrer"
                  className="social-pill"
                  aria-label="Instagram"
                >
                  <i className="fab fa-instagram"></i>
                </a>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: PROFILE CARD */}
          <div className="hero-right">
            <div className="card profile-card">
              <div className="profile-header">
                <div className="profile-avatar-wrapper">
                  <img
                    src="me2.png"
                    alt="Abdul Kani"
                    className="profile-avatar-img"
                  />
                </div>
                <div className="profile-meta">
                  <h3>Abdul Kani B</h3>
                  <p>Fullstack Developer</p>
                  <p className="location-tag">
                    <i className="fas fa-location-dot" style={{ color: 'var(--primary)' }}></i> Cuddalore, TN, India
                  </p>
                </div>
              </div>

              <p className="profile-bio-text">
                B.Tech IT Student at Sri Eshwar College of Engineering. Specialized in building scalable MERN web applications, AI automation, and competitive problem solving.
              </p>

              <div className="profile-stats-grid">
                <div className="stat-box">
                  <span className="stat-lbl">CGPA</span>
                  <span className="stat-val">8.07</span>
                </div>
                <div className="stat-box">
                  <span className="stat-lbl">SkillRack</span>
                  <span className="stat-val">1120+</span>
                </div>
                <div className="stat-box">
                  <span className="stat-lbl">LeetCode</span>
                  <span className="stat-val">230+</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
