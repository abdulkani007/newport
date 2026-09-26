import React, { useEffect, useState } from 'react';
import abLogo from '../assets/ab.jpg';
import './SplashScreen.css';

export default function SplashScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [transparentLogoUrl, setTransparentLogoUrl] = useState(null);

  useEffect(() => {
    // Process ab.jpg to strip out non-transparent background pixels dynamically
    const img = new Image();
    img.src = abLogo;
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = img.naturalWidth || 600;
        canvas.height = img.naturalHeight || 350;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);

        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imgData.data;

        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          // Remove dark background pixels (threshold 60)
          if (r < 60 && g < 60 && b < 60) {
            data[i + 3] = 0; // Set Alpha to 0 (100% transparent)
          }
        }

        ctx.putImageData(imgData, 0, 0);
        setTransparentLogoUrl(canvas.toDataURL('image/png'));
      } catch (err) {
        console.warn('Logo background stripping fallback:', err);
        setTransparentLogoUrl(abLogo);
      }
    };
  }, []);

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
        {/* Seamless Transparent Monogram AB Logo */}
        <div className="splash-logo-wrapper">
          <img
            src={transparentLogoUrl || abLogo}
            alt="AB Monogram"
            className="splash-logo-img"
          />
        </div>

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
