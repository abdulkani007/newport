import React, { useEffect, useRef, useState } from 'react';
import './CustomCursor.css';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const trailRef = useRef(null);

  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable on desktop pointer devices
    const isTouchDevice = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
    if (isTouchDevice) return;

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let trailX = -100;
    let trailY = -100;
    let rafId = null;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!isVisible) {
        setIsVisible(true);
        ringX = mouseX;
        ringY = mouseY;
        trailX = mouseX;
        trailY = mouseY;
      }

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    const render = () => {
      // Lerp smooth follow physics for ring and trail
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;

      trailX += (mouseX - trailX) * 0.08;
      trailY += (mouseY - trailY) * 0.08;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      }

      if (trailRef.current) {
        trailRef.current.style.transform = `translate3d(${trailX}px, ${trailY}px, 0)`;
      }

      rafId = requestAnimationFrame(render);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    rafId = requestAnimationFrame(render);

    // Track interactive hover state across clickable elements
    const handleElementHover = () => {
      const interactiveSelector = 'a, button, input, textarea, .skills-filter-btn, .coding-card, .project-card, .specular-button, [role="button"]';
      
      const handleOver = (e) => {
        if (e.target.closest(interactiveSelector)) {
          setIsHovered(true);
        }
      };

      const handleOut = (e) => {
        if (!e.relatedTarget || !e.relatedTarget.closest(interactiveSelector)) {
          setIsHovered(false);
        }
      };

      document.addEventListener('mouseover', handleOver, { passive: true });
      document.addEventListener('mouseout', handleOut, { passive: true });

      return () => {
        document.removeEventListener('mouseover', handleOver);
        document.removeEventListener('mouseout', handleOut);
      };
    };

    const cleanupHover = handleElementHover();

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      cleanupHover();
    };
  }, [isVisible]);

  if (typeof window !== 'undefined' && window.matchMedia('(hover: none) and (pointer: coarse)').matches) {
    return null;
  }

  return (
    <div className={`cyber-cursor-wrapper ${isVisible ? 'visible' : ''}`}>
      {/* Outer ambient pulsing laser trail */}
      <div
        ref={trailRef}
        className={`cyber-cursor-trail ${isHovered ? 'hovered' : ''} ${isClicking ? 'clicking' : ''}`}
      />

      {/* Main spring magnetic ring */}
      <div
        ref={ringRef}
        className={`cyber-cursor-ring ${isHovered ? 'hovered' : ''} ${isClicking ? 'clicking' : ''}`}
      >
        <span className="cursor-crosshair ch-tl" />
        <span className="cursor-crosshair ch-tr" />
        <span className="cursor-crosshair ch-bl" />
        <span className="cursor-crosshair ch-br" />
      </div>

      {/* Precision inner center dot */}
      <div
        ref={dotRef}
        className={`cyber-cursor-dot ${isHovered ? 'hovered' : ''} ${isClicking ? 'clicking' : ''}`}
      />
    </div>
  );
}
