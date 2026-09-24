import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ThreeDSection.css';

gsap.registerPlugin(ScrollTrigger);

const ThreeDSection = ({ children, id, className = '', pageNumber = '' }) => {
  const sectionRef = useRef(null);
  const pageRef = useRef(null);
  const shadowRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const page = pageRef.current;
    const shadow = shadowRef.current;
    if (!section || !page) return;

    // Respect reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const isMobile = window.innerWidth <= 768;

    // 3D Perspective Scroll parameters (Dramatic & Clearly Visible)
    const enterRotateX = isMobile ? 12 : 22;
    const enterRotateY = isMobile ? -4 : -8;
    const enterTranslateZ = isMobile ? -60 : -160;
    const exitRotateX = isMobile ? -12 : -22;
    const exitRotateY = isMobile ? 4 : 8;
    const exitTranslateZ = isMobile ? -60 : -160;

    const ctx = gsap.context(() => {
      // Timeline for 3D Page Turn Scrubbing
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 92%',
          end: 'bottom 8%',
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
      });

      // Step 1: Page enters from 3D depth, rotating into flat focus
      tl.fromTo(
        page,
        {
          rotateX: enterRotateX,
          rotateY: enterRotateY,
          translateZ: enterTranslateZ,
          scale: isMobile ? 0.94 : 0.88,
          opacity: 0.3,
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

      // Step 2: Shadow overlay fades out as page levels flat
      if (shadow) {
        tl.fromTo(
          shadow,
          { opacity: 0.6 },
          { opacity: 0, duration: 0.45, ease: 'power2.out' },
          0
        );
      }

      // Step 3: Hold flat & crisp reading window
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
        scale: isMobile ? 0.94 : 0.88,
        opacity: 0.3,
        transformOrigin: '50% 100%',
        duration: 0.45,
        ease: 'power2.in',
      });

      if (shadow) {
        tl.to(
          shadow,
          { opacity: 0.6, duration: 0.45, ease: 'power2.in' },
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
            rotateX: isMobile ? 0 : 14,
            translateY: isMobile ? 20 : 50,
            translateZ: isMobile ? -20 : -60,
            opacity: 0.4,
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
        <div ref={shadowRef} className="threed-page-shadow" aria-hidden="true" />

        {pageNumber && (
          <div className="notebook-page-tag" aria-hidden="true">
            <span className="page-tag-line" />
            <span>PAGE {pageNumber}</span>
          </div>
        )}

        <div className="threed-page-content">{children}</div>
      </div>
    </div>
  );
};

export default ThreeDSection;
