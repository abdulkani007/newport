import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Collaborators from './components/Collaborators';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import TechnicalSkills from './components/TechnicalSkills';
import CodingProfiles from './components/CodingProfiles';
import Certificates from './components/Certificates';
import Achievements from './components/Achievements';
import Contact from './components/Contact';
import Messages from './components/Messages';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import Toast from './components/Toast';

export default function App() {
  const [theme, setTheme] = useState('dark');
  const [toastState, setToastState] = useState({
    show: false,
    type: 'success',
    message: '',
  });

  const [refreshMessages, setRefreshMessages] = useState(0);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const showToast = (type = 'success', message = null) => {
    setToastState({
      show: true,
      type,
      message,
    });
  };

  const hideToast = () => {
    setToastState((prev) => ({ ...prev, show: false }));
  };

  useEffect(() => {
    if (toastState.show) {
      const timer = setTimeout(() => {
        hideToast();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [toastState.show]);

  const triggerMessageRefresh = () => {
    setRefreshMessages((prev) => prev + 1);
  };

  // IntersectionObserver for subtle fadeInUp motion effect
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -30px 0px',
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.animation = 'fadeInUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards';
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const elements = document.querySelectorAll('.card');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <Hero />
      <Collaborators />
      <About />
      <Experience />
      <Projects />
      <TechnicalSkills />
      <CodingProfiles />
      <Certificates />
      <Achievements />
      <Contact showToast={showToast} onMessageSaved={triggerMessageRefresh} />
      <Messages showToast={showToast} refreshTrigger={refreshMessages} />
      <Footer />
      <BackToTop />
      <Toast toastState={toastState} onClose={hideToast} />
    </>
  );
}
