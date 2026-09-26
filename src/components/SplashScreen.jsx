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
      currentProgress += Math.floor(Math.random() * 7) + 3;
      if (currentProgress >= 100) {
        currentProgress = 100;
        clearInterval(interval);

        // Hold at 100% briefly then trigger smooth exit curtain
        setTimeout(() => {
          setIsExiting(true);
          setTimeout(() => {
            setIsDone(true);
            document.body.style.overflow = '';
            if (onComplete) onComplete();
          }, 850); // match CSS exit transition duration
        }, 350);
      }
      setProgress(currentProgress);
    }, 40);

    return () => {
      clearInterval(interval);
      document.body.style.overflow = '';
    };
  }, [onComplete]);

  if (isDone) return null;

  const formattedProgress = progress < 10 ? `0${progress}` : `${progress}`;

  return (
    <div className={`splash-overlay ${isExiting ? 'splash-exit' : ''}`}>
      <div className="splash-container">
        {/* Background Laser Ambient Glow Orbs */}
        <div className="splash-ambient-glow" />
        <div className="splash-laser-grid" />

        {/* Top Header System Tag */}
        <div className="splash-header">
          <div className="splash-status-dot-wrapper">
            <span className="splash-status-dot" />
            <span className="splash-tag">SYSTEM INITIALIZING</span>
          </div>
          <span className="splash-year">2026 // EDITION</span>
        </div>

        {/* Main Center Kinetic Logo Text "ABBU" */}
        <div className="splash-logo-wrapper">
          <div className="splash-logo-letters">
            <div className="splash-char-box">
              <span className="splash-char ch-1">A</span>
            </div>
            <div className="splash-char-box">
              <span className="splash-char ch-2">B</span>
            </div>
            <div className="splash-char-box">
              <span className="splash-char ch-3">B</span>
            </div>
            <div className="splash-char-box">
              <span className="splash-char ch-4">U</span>
            </div>
          </div>

          <div className="splash-logo-sub">
            <span className="splash-sub-line" />
            <span className="splash-sub-text">ABDUL KANI — CREATIVE DEVELOPER</span>
            <span className="splash-sub-line" />
          </div>
        </div>

        {/* Bottom Counter & Progress Bar */}
        <div className="splash-footer">
          <div className="splash-counter-row">
            <div className="splash-status-text">
              {progress < 35 && 'INITIALIZING ARCHITECTURE...'}
              {progress >= 35 && progress < 75 && 'COMPILING 3D EXPERIENCES...'}
              {progress >= 75 && progress < 100 && 'FINALIZING INTERFACES...'}
              {progress === 100 && 'WELCOME TO THE PORTFOLIO'}
            </div>

            <div className="splash-counter">
              <span className="splash-counter-num">{formattedProgress}</span>
              <span className="splash-counter-symbol">%</span>
            </div>
          </div>

          <div className="splash-progress-track">
            <div
              className="splash-progress-fill"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
