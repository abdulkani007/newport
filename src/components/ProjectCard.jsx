import React, { useState, useEffect, useRef } from 'react';

export default function ProjectCard({ role, year, images, title, description, features, tech, githubUrl }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const autoSlideRef = useRef(null);

  const startAutoSlide = () => {
    if (images.length <= 1) return;
    if (autoSlideRef.current) clearInterval(autoSlideRef.current);
    autoSlideRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3500);
  };

  const pauseAutoSlide = () => {
    if (autoSlideRef.current) {
      clearInterval(autoSlideRef.current);
      autoSlideRef.current = null;
    }
  };

  useEffect(() => {
    startAutoSlide();
    return () => pauseAutoSlide();
  }, [images.length]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
    pauseAutoSlide();
    startAutoSlide();
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    pauseAutoSlide();
    startAutoSlide();
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
    pauseAutoSlide();
    startAutoSlide();
  };

  return (
    <div
      className="card project-card"
      onMouseEnter={pauseAutoSlide}
      onMouseLeave={startAutoSlide}
    >
      <div className="project-meta-header">
        <span>{role}</span>
        <span>{year}</span>
      </div>

      <div className="project-slider-wrapper">
        {images.map((imgSrc, idx) => (
          <img
            key={idx}
            src={imgSrc}
            alt={title}
            className={`project-img ${idx === currentIndex ? 'active' : ''}`}
          />
        ))}

        {images.length > 1 && (
          <>
            <button className="slider-btn prev" onClick={prevSlide} aria-label="Previous image">
              <i className="fas fa-chevron-left"></i>
            </button>
            <button className="slider-btn next" onClick={nextSlide} aria-label="Next image">
              <i className="fas fa-chevron-right"></i>
            </button>
            <div className="slider-dots">
              {images.map((_, idx) => (
                <div
                  key={idx}
                  className={`slider-dot ${idx === currentIndex ? 'active' : ''}`}
                  onClick={() => goToSlide(idx)}
                />
              ))}
            </div>
          </>
        )}
      </div>

      <div className="project-body">
        <h3 className="project-title">{title}</h3>
        <p className="project-desc">{description}</p>

        <div className="project-tags">
          {tech.map((t, idx) => (
            <span key={idx} className="tech-tag">
              {t}
            </span>
          ))}
        </div>

        <div className="project-footer">
          <a
            href={githubUrl}
            target="_blank"
            rel="noreferrer"
            className="project-link"
          >
            View Code <i className="fas fa-arrow-up-right-from-square"></i>
          </a>
        </div>
      </div>
    </div>
  );
}
