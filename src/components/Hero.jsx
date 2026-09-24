import React, { useState, useEffect, useRef } from 'react';
import ScrambledText from './ScrambledText';
import SpecularButton from './SpecularButton';

export default function Hero() {
  const fullText = "Hello !! This is Abdul Kani";
  const [typedContent, setTypedContent] = useState('');
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const visualRef = useRef(null);

  const [tiltStyle, setTiltStyle] = useState({
    transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)',
    transition: 'transform 0.5s ease-out',
  });

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
      const targetTop = target.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: Math.max(0, targetTop - 80),
        behavior: 'smooth',
      });
    }
  };

  // 3D Parallax Tilt Effect matching Keyvo Motion
  const handleMouseMove = (e) => {
    if (!visualRef.current) return;
    const rect = visualRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rotateX = (-y / rect.height) * 18;
    const rotateY = (x / rect.width) * 18;

    setTiltStyle({
      transform: `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale(1.03)`,
      transition: 'transform 0.1s ease-out',
    });
  };

  const handleMouseLeave = () => {
    setTiltStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)',
      transition: 'transform 0.6s ease-out',
    });
  };

  return (
    <section id="home" className="hero-section">
      <div className="container">
        <div className="hero-grid">
          {/* LEFT COLUMN: KEYVO 3D PARALLAX & ANIMATED GEOMETRIC FRAME */}
          <div
            className="hero-left-visual"
            ref={visualRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={tiltStyle}
          >
            {/* Ambient Glowing Orbs */}
            <div className="glow-orb orb-1"></div>
            <div className="glow-orb orb-2"></div>
            <div className="glow-orb orb-center"></div>

            {/* Smooth Floating Geometric Triangle Frame with Traveling Laser */}
            <div className="geo-triangle-wrapper">
              <svg viewBox="0 0 500 500" className="geo-triangle-svg">
                <defs>
                  <linearGradient id="redGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ef4444" />
                    <stop offset="50%" stopColor="#f87171" />
                    <stop offset="100%" stopColor="#dc2626" />
                  </linearGradient>

                  <linearGradient id="laserGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ffffff" />
                    <stop offset="50%" stopColor="#ef4444" />
                    <stop offset="100%" stopColor="#b91c1c" />
                  </linearGradient>

                  <filter id="redGlow" x="-30%" y="-30%" width="160%" height="160%">
                    <feGaussianBlur stdDeviation="6" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>

                {/* Base Stroke */}
                <path
                  d="M 410 60 L 65 230 Q 45 245 65 260 L 395 450 Q 415 465 430 445 L 435 80 Q 440 60 410 60 Z"
                  fill="none"
                  stroke="url(#redGrad)"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  filter="url(#redGlow)"
                  opacity="0.8"
                />

                {/* Traveling Crimson Laser Beam */}
                <path
                  d="M 410 60 L 65 230 Q 45 245 65 260 L 395 450 Q 415 465 430 445 L 435 80 Q 440 60 410 60 Z"
                  fill="none"
                  stroke="url(#laserGrad)"
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="geo-laser-stroke"
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

            {/* Floating Role Pills */}
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

            <ScrambledText
              className="hero-subtitle"
              radius={100}
              duration={1.2}
              speed={0.5}
              scrambleChars=".:#@$%&*"
            >
              Building scalable web applications, AI platforms, and competitive programming solutions with clean code, structural precision, and timeless design.
            </ScrambledText>

            <div className="hero-badges">
              <SpecularButton
                size="sm"
                radius={8}
                tint="var(--badge-bg)"
                tintOpacity={0.5}
                textColor="var(--text-secondary)"
                lineColor="#ffffff"
                baseColor="#525252"
                intensity={0.9}
                shineSize={12}
                shineFade={35}
                proximity={200}
                className="hero-badge-specular"
              >
                Frontend Engineering
              </SpecularButton>

              <SpecularButton
                size="sm"
                radius={8}
                tint="var(--badge-bg)"
                tintOpacity={0.5}
                textColor="var(--text-secondary)"
                lineColor="#ffffff"
                baseColor="#525252"
                intensity={0.9}
                shineSize={12}
                shineFade={35}
                proximity={200}
                className="hero-badge-specular"
              >
                MERN Stack
              </SpecularButton>

              <SpecularButton
                size="sm"
                radius={8}
                tint="var(--badge-bg)"
                tintOpacity={0.5}
                textColor="var(--text-secondary)"
                lineColor="#ffffff"
                baseColor="#525252"
                intensity={0.9}
                shineSize={12}
                shineFade={35}
                proximity={200}
                className="hero-badge-specular"
              >
                AI Systems
              </SpecularButton>

              <SpecularButton
                size="sm"
                radius={8}
                tint="var(--badge-bg)"
                tintOpacity={0.5}
                textColor="var(--text-secondary)"
                lineColor="#ffffff"
                baseColor="#525252"
                intensity={0.9}
                shineSize={12}
                shineFade={35}
                proximity={200}
                className="hero-badge-specular"
              >
                Competitive Programming
              </SpecularButton>
            </div>

            <div className="hero-actions">
              <SpecularButton
                size="lg"
                radius={8}
                tint="#ef4444"
                tintOpacity={0.95}
                textColor="#ffffff"
                lineColor="#ffffff"
                baseColor="#dc2626"
                intensity={1.2}
                shineSize={14}
                shineFade={40}
                proximity={280}
                onClick={(e) => handleSmoothScroll(e, 'projects')}
                className="btn-specular-primary"
              >
                View Projects <i className="fas fa-arrow-up-right-from-square"></i>
              </SpecularButton>

              <SpecularButton
                size="lg"
                radius={8}
                tint="var(--card-bg)"
                tintOpacity={0.8}
                textColor="var(--text-primary)"
                lineColor="#ffffff"
                baseColor="#525252"
                intensity={1.0}
                shineSize={14}
                shineFade={40}
                proximity={280}
                onClick={() => {
                  const link = document.createElement('a');
                  link.href = "Copy of Abdul's resume.pdf";
                  link.download = "Copy of Abdul's resume.pdf";
                  link.click();
                }}
                className="btn-specular-secondary"
              >
                Download Resume <i className="fas fa-download"></i>
              </SpecularButton>

              <div className="social-pills">
                <SpecularButton
                  size="sm"
                  radius={8}
                  tint="var(--card-bg)"
                  tintOpacity={0.7}
                  textColor="var(--text-secondary)"
                  lineColor="#ef4444"
                  baseColor="#525252"
                  intensity={1.1}
                  shineSize={16}
                  shineFade={40}
                  proximity={200}
                  onClick={() => window.open('https://github.com/abdulkani007', '_blank', 'noreferrer')}
                  className="social-pill-specular"
                >
                  <i className="fab fa-github"></i>
                </SpecularButton>
                <SpecularButton
                  size="sm"
                  radius={8}
                  tint="var(--card-bg)"
                  tintOpacity={0.7}
                  textColor="var(--text-secondary)"
                  lineColor="#ef4444"
                  baseColor="#525252"
                  intensity={1.1}
                  shineSize={16}
                  shineFade={40}
                  proximity={200}
                  onClick={() => window.open('https://www.linkedin.com/in/abdul-kani-b-3b89aa332?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app', '_blank', 'noreferrer')}
                  className="social-pill-specular"
                >
                  <i className="fab fa-linkedin"></i>
                </SpecularButton>
                <SpecularButton
                  size="sm"
                  radius={8}
                  tint="var(--card-bg)"
                  tintOpacity={0.7}
                  textColor="var(--text-secondary)"
                  lineColor="#ef4444"
                  baseColor="#525252"
                  intensity={1.1}
                  shineSize={16}
                  shineFade={40}
                  proximity={200}
                  onClick={() => window.open('https://www.instagram.com/ab_naszz___?igsh=Mm1qYXB0YXBxNWY3', '_blank', 'noreferrer')}
                  className="social-pill-specular"
                >
                  <i className="fab fa-instagram"></i>
                </SpecularButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
