import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Collaborators from './components/Collaborators';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import TechnicalSkills from './components/TechnicalSkills';
import CodingProfiles from './components/CodingProfiles';
import Achievements from './components/Achievements';
import Certificates from './components/Certificates';
import Contact from './components/Contact';
import Messages from './components/Messages';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import Toast from './components/Toast';
import ThreeDSection from './components/ThreeDSection';

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

  return (
    <>
      <Navbar theme={theme} toggleTheme={toggleTheme} />

      <ThreeDSection>
        <Hero />
      </ThreeDSection>

      <Collaborators />

      <ThreeDSection>
        <About />
      </ThreeDSection>

      <ThreeDSection>
        <Experience />
      </ThreeDSection>

      <ThreeDSection>
        <Projects />
      </ThreeDSection>

      <ThreeDSection>
        <TechnicalSkills />
      </ThreeDSection>

      <ThreeDSection>
        <CodingProfiles />
      </ThreeDSection>

      <ThreeDSection>
        <Achievements />
      </ThreeDSection>

      <ThreeDSection>
        <Certificates />
      </ThreeDSection>

      <ThreeDSection>
        <Contact showToast={showToast} onMessageSaved={triggerMessageRefresh} />
      </ThreeDSection>

      <Messages showToast={showToast} refreshTrigger={refreshMessages} />
      <Footer />
      <BackToTop />
      <Toast toastState={toastState} onClose={hideToast} />
    </>
  );
}
