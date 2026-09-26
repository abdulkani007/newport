import React, { useEffect, useState } from 'react';
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
        }, 300);
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
      <div className="splash-ambient-glow" />

      <div className="splash-box">
        {/* Monogram ABBU */}
        <div className="splash-logo-letters">
          <div className="splash-char-box"><span className="splash-char ch-1">A</span></div>
          <div className="splash-char-box"><span className="splash-char ch-2">B</span></div>
          <div className="splash-char-box"><span className="splash-char ch-3">B</span></div>
          <div className="splash-char-box"><span className="splash-char ch-4">U</span></div>
        </div>

        <span className="splash-sub-text">ABDUL KANI</span>

        {/* Minimal Loader Line & Counter */}
        <div className="splash-loader-block">
          <div className="splash-progress-track">
            <div className="splash-progress-fill" style={{ width: `${progress}%` }} />
          </div>

          <div className="splash-info-row">
            <span className="splash-status-text">
              {progress < 100 ? 'LOADING' : 'READY'}
            </span>
            <span className="splash-counter">{formattedProgress}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
