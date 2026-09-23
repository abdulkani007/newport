import React, { useState, useEffect } from 'react';
import PillNav from './PillNav';

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Coding', href: '#coding' },
  { label: 'Awards', href: '#achievements' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar({ theme, toggleTheme }) {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section');
      let current = 'home';
      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 180) {
          current = section.getAttribute('id') || 'home';
        }
      });
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleItemClick = (e, href) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const id = href.slice(1);
      const target = document.getElementById(id);
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 80,
          behavior: 'smooth',
        });
      }
    }
  };

  return (
    <header className="navbar">
      <div className="container nav-container">
        <PillNav
          items={navItems}
          activeHref={`#${activeSection}`}
          onItemClick={handleItemClick}
          baseColor={theme === 'dark' ? '#050507' : '#ffffff'}
          pillColor={theme === 'dark' ? '#0e0e11' : '#f4f4f7'}
          pillTextColor={theme === 'dark' ? '#ffffff' : '#09090b'}
          hoveredPillTextColor="#ffffff"
          ease="power3.easeOut"
          initialLoadAnimation={true}
        />

        <div className="nav-actions">
          <button
            className="theme-toggle-btn"
            onClick={toggleTheme}
            aria-label="Toggle dark/light theme"
            title="Toggle theme"
          >
            <i className={theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon'}></i>
          </button>
        </div>
      </div>
    </header>
  );
}
