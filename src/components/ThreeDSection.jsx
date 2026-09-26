import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ThreeDSection.css';

gsap.registerPlugin(ScrollTrigger);

const ThreeDSection = ({ children, id, className = '' }) => {
  const sectionRef = useRef(null);
  const pageRef = useRef(null);
  const shadowRef = useRef(null);
  const glowRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const page = pageRef.current;
    const shadow = shadowRef.current;
    const glow = glowRef.current;
    if (!section || !page) return;

    // Respect reduced motion & disable 3D page tilt scrubbing on mobile for crystal clear scrolling
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth <= 768;
    if (prefersReducedMotion || isMobile) return;

    // 3D Perspective Scroll parameters
    const enterRotateX = isMobile ? 14 : 26;
    const enterRotateY = isMobile ? -5 : -10;
    const enterTranslateZ = isMobile ? -70 : -180;
    const exitRotateX = isMobile ? -14 : -26;
    const exitRotateY = isMobile ? 5 : 10;
    const exitTranslateZ = isMobile ? -70 : -180;

    const ctx = gsap.context(() => {
      // Timeline for 3D Page Turn Scrubbing
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 95%',
          end: 'bottom 5%',
          scrub: 0.7,
          invalidateOnRefresh: true,
        },
      });

      // Step 1: Page rotates in from 3D depth into flat focus
      tl.fromTo(
        page,
        {
          rotateX: enterRotateX,
          rotateY: enterRotateY,
          translateZ: enterTranslateZ,
          scale: isMobile ? 0.93 : 0.86,
          opacity: 0.25,
          transformOrigin: '50% 0%',
        },
        {
          rotateX: 0,
          rotateY: 0,
          translateZ: 0,
          scale: 1,
          opacity: 1,
          transformOrigin: '50% 50%',
          duration: 0.45,
          ease: 'power2.out',
        }
      );

      // Step 2: Shadow overlay & Specular edge glow transition
      if (shadow) {
        tl.fromTo(
          shadow,
          { opacity: 0.75 },
          { opacity: 0, duration: 0.45, ease: 'power2.out' },
          0
        );
      }
      if (glow) {
        tl.fromTo(
          glow,
          { opacity: 0.9, scaleX: 0.7 },
          { opacity: 0.2, scaleX: 1, duration: 0.45, ease: 'power2.out' },
          0
        );
      }

      // Step 3: Hold flat & 100% crisp reading window
      tl.to(page, {
        rotateX: 0,
        rotateY: 0,
        translateZ: 0,
        scale: 1,
        opacity: 1,
        duration: 0.25,
      });

      // Step 4: Page turns away into 3D depth as user continues scrolling
      tl.to(page, {
        rotateX: exitRotateX,
        rotateY: exitRotateY,
        translateZ: exitTranslateZ,
        scale: isMobile ? 0.93 : 0.86,
        opacity: 0.25,
        transformOrigin: '50% 100%',
        duration: 0.45,
        ease: 'power2.in',
      });

      if (shadow) {
        tl.to(
          shadow,
          { opacity: 0.75, duration: 0.45, ease: 'power2.in' },
          '>-0.45'
        );
      }
      if (glow) {
        tl.to(
          glow,
          { opacity: 0.9, scaleX: 0.7, duration: 0.45, ease: 'power2.in' },
          '>-0.45'
        );
      }

      // Stagger 3D Card Floating Entry
      const cards = page.querySelectorAll(
        '.card, .project-card, .skills-category, .timeline-item, .cert-card, .achievement-card, .about-desc-card'
      );

      if (cards.length > 0) {
        gsap.fromTo(
          cards,
          {
            rotateX: isMobile ? 0 : 16,
            translateY: isMobile ? 24 : 54,
            translateZ: isMobile ? -24 : -70,
            opacity: 0.35,
          },
          {
            rotateX: 0,
            translateY: 0,
            translateZ: 0,
            opacity: 1,
            stagger: 0.08,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} id={id} className={`threed-section-scene ${className}`}>
      <div ref={pageRef} className="threed-section-page">
        <div ref={glowRef} className="threed-page-glow" aria-hidden="true" />
        <div ref={shadowRef} className="threed-page-shadow" aria-hidden="true" />
        <div className="threed-page-content">{children}</div>
      </div>
    </div>
  );
};

export default ThreeDSection;
