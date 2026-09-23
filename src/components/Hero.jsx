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
          {/* LEFT COLUMN: ANIMATED GEOMETRIC PHOTO FRAME */}
          <div className="hero-left-visual">
            {/* Ambient Glowing Orbs */}
            <div className="glow-orb orb-1"></div>
            <div className="glow-orb orb-2"></div>

            {/* Smooth Floating Geometric Triangle Frame */}
            <div className="geo-triangle-wrapper">
              <svg viewBox="0 0 500 500" className="geo-triangle-svg">
                <defs>
                  <linearGradient id="redGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ef4444" />
                    <stop offset="50%" stopColor="#f87171" />
                    <stop offset="100%" stopColor="#dc2626" />
                  </linearGradient>
                  <filter id="redGlow" x="-30%" y="-30%" width="160%" height="160%">
                    <feGaussianBlur stdDeviation="6" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>
                <path
                  d="M 410 60 L 65 230 Q 45 245 65 260 L 395 450 Q 415 465 430 445 L 435 80 Q 440 60 410 60 Z"
                  fill="none"
                  stroke="url(#redGrad)"
                  strokeWidth="5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  filter="url(#redGlow)"
                />
              </svg>
            </div>

            {/* User Photo */}
            <div className="hero-photo-wrapper">
              <img
                src="me2.png"
                alt="Abdul Kani"
                className="hero-person-photo"
              />
            </div>

            {/* Floating Role Pills (UI Designer & AI Enthusiast) */}
            <div className="floating-stat-pill pill-cgpa">
              <span className="pill-val">UI/UX Designer</span>
              <span className="pill-lbl">Interface & Motion</span>
            </div>

            <div className="floating-stat-pill pill-skillrack">
              <span className="pill-val">AI Enthusiast</span>
              <span className="pill-lbl">Intelligent Systems</span>
            </div>
          </div>

          {/* RIGHT COLUMN: DEVELOPER INTRO & CTAs */}
          <div className="hero-right-content">
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
        </div>
      </div>
    </section>
  );
}
