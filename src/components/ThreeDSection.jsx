import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ThreeDSection.css';

gsap.registerPlugin(ScrollTrigger);

const ThreeDSection = ({ children, id, className = '', pageNumber = '' }) => {
  const sectionRef = useRef(null);
  const pageRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const page = pageRef.current;
    if (!section || !page) return;

    // Respect reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const isMobile = window.innerWidth <= 768;

    // 3D Perspective Scroll scrub values
    const enterRotateX = isMobile ? 5 : 12;
    const enterRotateY = isMobile ? -2 : -5;
    const enterTranslateZ = isMobile ? -30 : -100;
    const exitRotateX = isMobile ? -5 : -12;
    const exitRotateY = isMobile ? 2 : 5;
    const exitTranslateZ = isMobile ? -30 : -100;

    // Create GSAP ScrollTrigger timeline for 3D page transition
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top bottom-=5%',
          end: 'bottom top+=5%',
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      });

      // Entry: page comes from 3D depth into flat focus
      tl.fromTo(
        page,
        {
          rotateX: enterRotateX,
          rotateY: enterRotateY,
          translateZ: enterTranslateZ,
          scale: 0.94,
          opacity: 0.35,
        },
        {
          rotateX: 0,
          rotateY: 0,
          translateZ: 0,
          scale: 1,
          opacity: 1,
          duration: 0.4,
          ease: 'power2.out',
        }
      )
        // Middle reading window: remains flat, crisp, and fully readable
        .to(page, {
          rotateX: 0,
          rotateY: 0,
          translateZ: 0,
          scale: 1,
          opacity: 1,
          duration: 0.2,
        })
        // Exit: page rotates away into 3D depth
        .to(page, {
          rotateX: exitRotateX,
          rotateY: exitRotateY,
          translateZ: exitTranslateZ,
          scale: 0.94,
          opacity: 0.35,
          duration: 0.4,
          ease: 'power2.in',
        });

      // 3D Stagger animation for internal cards when section enters viewport
      const cards = page.querySelectorAll('.card, .project-card, .skills-category, .timeline-item, .cert-card, .achievement-card');
      if (cards.length > 0) {
        gsap.fromTo(
          cards,
          {
            rotateY: isMobile ? 0 : -6,
            translateZ: isMobile ? -15 : -40,
            opacity: 0.6,
          },
          {
            rotateY: 0,
            translateZ: 0,
            opacity: 1,
            stagger: 0.06,
            duration: 0.5,
            ease: 'power1.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 75%',
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
        {pageNumber && (
          <div className="notebook-page-tag" aria-hidden="true">
            <span>PAGE {pageNumber}</span>
          </div>
        )}
        <div className="threed-page-content">{children}</div>
      </div>
    </div>
  );
};

export default ThreeDSection;
