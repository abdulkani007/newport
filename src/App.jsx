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

      <ThreeDSection pageNumber="01">
        <Hero />
      </ThreeDSection>

      <Collaborators />

      <ThreeDSection pageNumber="02">
        <About />
      </ThreeDSection>

      <ThreeDSection pageNumber="03">
        <Experience />
      </ThreeDSection>

      <ThreeDSection pageNumber="04">
        <Projects />
      </ThreeDSection>

      <ThreeDSection pageNumber="05">
        <TechnicalSkills />
      </ThreeDSection>

      <ThreeDSection pageNumber="06">
        <CodingProfiles />
      </ThreeDSection>

      <ThreeDSection pageNumber="07">
        <Achievements />
      </ThreeDSection>

      <ThreeDSection pageNumber="08">
        <Contact showToast={showToast} onMessageSaved={triggerMessageRefresh} />
      </ThreeDSection>

      <Messages showToast={showToast} refreshTrigger={refreshMessages} />
      <Footer />
      <BackToTop />
      <Toast toastState={toastState} onClose={hideToast} />
    </>
  );
}
