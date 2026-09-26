import React, { useState, useEffect } from 'react';
import PillNav from './PillNav';
import abLogo from '../assets/ab.jpg';

const navItems = [
  { label: 'ABOUT', href: '#about' },
  { label: 'SKILLS', href: '#skills' },
  { label: 'CAREER', href: '#experience' },
  { label: 'WORK', href: '#projects' },
  { label: 'CODING', href: '#coding' },
  { label: 'MERIT', href: '#achievements' },
  { label: 'CONTACT', href: '#contact' },
];

export default function Navbar({ theme, toggleTheme }) {
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.pageYOffset;
      setIsScrolled(scrollY > 25);

      const sections = document.querySelectorAll('section[id]');
      let current = 'home';
      const scrollPosition = scrollY + 220;
      sections.forEach((section) => {
        const sectionTop = section.getBoundingClientRect().top + scrollY;
        if (scrollPosition >= sectionTop) {
          current = section.getAttribute('id') || 'home';
        }
      });
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleItemClick = (e, href) => {
    if (href && href.startsWith('#')) {
      e.preventDefault();
      const id = href.slice(1);
      const target = document.getElementById(id);
      if (target) {
        const targetTop = target.getBoundingClientRect().top + window.pageYOffset;
        window.scrollTo({
          top: Math.max(0, targetTop - 80),
          behavior: 'smooth',
        });
      }
    }
  };

  return (
    <PillNav
      logo={abLogo}
      logoAlt="AB Monogram"
      brandName="Abdul Kani"
      items={navItems}
      activeHref={`#${activeSection}`}
      onItemClick={handleItemClick}
      theme={theme}
      toggleTheme={toggleTheme}
      resumeUrl="Copy of Abdul's resume.pdf"
      isScrolled={isScrolled}
    />
  );
}
