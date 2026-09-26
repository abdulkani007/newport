import React, { useEffect, useState } from 'react';
import abLogo from '../../ab.jpg';
import './SplashScreen.css';

export default function SplashScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    // Lock scroll during splash load
    document.body.style.overflow = 'hidden';

    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += Math.floor(Math.random() * 8) + 4;
      if (currentProgress >= 100) {
        currentProgress = 100;
        clearInterval(interval);

        setTimeout(() => {
          setIsExiting(true);
          setTimeout(() => {
            setIsDone(true);
            document.body.style.overflow = '';
            if (onComplete) onComplete();
          }, 700);
        }, 350);
      }
      setProgress(currentProgress);
    }, 35);

    return () => {
      clearInterval(interval);
      document.body.style.overflow = '';
    };
  }, [onComplete]);

  if (isDone) return null;

  const formattedProgress = progress < 10 ? `0${progress}` : `${progress}`;

  return (
    <div className={`splash-overlay ${isExiting ? 'splash-exit' : ''}`}>
      {/* Background Ambient Glow */}
      <div className="splash-ambient-glow" />

      <div className="splash-content">
        {/* Seamless AB Monogram Logo */}
        <div className="splash-logo-wrapper">
          <img src={abLogo} alt="AB Monogram" className="splash-logo-img" />
        </div>

        <h1 className="splash-title">ABDUL KANI</h1>

        {/* Sleek Minimal Loader Line & Counter */}
        <div className="splash-loader-block">
          <div className="splash-progress-track">
            <div className="splash-progress-fill" style={{ width: `${progress}%` }} />
          </div>

          <div className="splash-info-row">
            <span className="splash-status-text">
              {progress < 100 ? 'INITIALIZING' : 'WELCOME'}
            </span>
            <span className="splash-counter">{formattedProgress}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
