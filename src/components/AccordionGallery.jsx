import { useRef, useEffect, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import './AccordionGallery.css';

const DEFAULT_ITEMS = [
  { image: 'sems1.png', label: 'SEMS - Smart Event Management', link: 'https://github.com/abdulkani007/SEMS-3.git' },
  { image: 'ai2.png', label: 'Abbu Assistant - AI Voice Assistant', link: 'https://github.com/abdulkani007/AI.git' },
  { image: 'agent1.png', label: 'AgenticLoan AI - Loan Approval', link: 'https://github.com/abdulkani007/Agentic--AI.git' },
  { image: 'csp1.png', label: 'CSP - Content Submission System', link: 'https://github.com/abdulkani007/content-system.git' }
];

const AccordionGallery = ({
  items = DEFAULT_ITEMS,
  defaultIndex = 0,
  accentColor = '#ef4444',
  overlayColor = '#060010',
  textColor = '#ffffff',
  height = 520,
  gap = 14,
  radius = 20,
  expandRatio = 0.58,
  orientation = 'horizontal',
  duration = 0.5,
  ease = 'power3.out',
  parallax = 0.3,
  tilt = 6,
  trigger = 'hover',
  className = ''
}) => {
  const rootRef = useRef(null);
  const panelRefs = useRef([]);
  const mediaRefs = useRef([]);
  const bodyRefs = useRef([]);
  const labelRefs = useRef([]);
  const tlRef = useRef(null);
  const firstRunRef = useRef(true);
  const mediaSizeRef = useRef(380);

  const vertical = orientation === 'vertical';
  const count = items.length;
  const [active, setActive] = useState(Math.min(Math.max(defaultIndex, 0), count - 1));

  const prefersReduced =
    typeof window !== 'undefined' && window.matchMedia
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false;

  const applyLayout = useCallback(
    animate => {
      const panels = panelRefs.current;
      if (!panels.length) return;

      const r = Math.min(Math.max(expandRatio, 0.2), 0.9);
      const grow = count > 1 ? (r * (count - 1)) / (1 - r) : 1;
      const mediaSize = mediaSizeRef.current;

      tlRef.current?.kill();
      const dur = animate && !prefersReduced ? duration : 0;
      const tl = gsap.timeline();

      panels.forEach((panel, i) => {
        if (!panel) return;
        const isActive = i === active;
        const media = mediaRefs.current[i];
        const body = bodyRefs.current[i];
        const label = labelRefs.current[i];

        const rot = isActive ? 0 : i < active ? tilt : -tilt;
        const rotProp = vertical ? { rotateX: -rot } : { rotateY: rot };

        tl.to(panel, { flexGrow: isActive ? grow : 1, ...rotProp, duration: dur, ease }, 0);

        if (media) {
          const drift = Math.max(-1.5, Math.min(1.5, active - i));
          const shift = drift * parallax * mediaSize * 0.05;
          tl.to(
            media,
            {
              xPercent: -50,
              yPercent: -50,
              x: vertical ? 0 : isActive ? 0 : shift,
              y: vertical ? (isActive ? 0 : shift) : 0,
              '--ag-dim': isActive ? 0.1 : 0.4,
              duration: dur,
              ease
            },
            0
          );
        }

        if (label) {
          tl.to(label, { opacity: isActive ? 0 : 1, duration: dur * 0.5, ease }, 0);
        }

        if (body) {
          if (isActive) {
            tl.to(body, { opacity: 1, y: 0, pointerEvents: 'auto', duration: dur, ease, delay: 0.05 }, 0);
          } else {
            tl.to(body, { opacity: 0, y: 15, pointerEvents: 'none', duration: dur * 0.4, ease }, 0);
          }
        }
      });

      tlRef.current = tl;
    },
    [
      active,
      count,
      expandRatio,
      duration,
      ease,
      vertical,
      tilt,
      parallax,
      prefersReduced
    ]
  );

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    let rafId = 0;
    const measure = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const total = vertical ? rect.height : rect.width;
        const usable = Math.max(total - gap * (count - 1), 120);
        const size = Math.max(140, usable * Math.min(Math.max(expandRatio, 0.2), 0.9) * 1.25);
        mediaSizeRef.current = size;
        el.style.setProperty('--ag-media-size', `${size}px`);
        applyLayout(!firstRunRef.current);
      });
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
    };
  }, [applyLayout, gap, count, expandRatio, vertical]);

  useEffect(() => {
    applyLayout(!firstRunRef.current);
    firstRunRef.current = false;
  }, [applyLayout]);

  useEffect(
    () => () => {
      tlRef.current?.kill();
    },
    []
  );

  const handleEnter = i => {
    if (trigger === 'hover') setActive(i);
  };

  const handleClick = (i, e) => {
    if (i !== active) {
      e.preventDefault();
      setActive(i);
    }
  };

  const handleKeyDown = (i, e) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      setActive((i + 1) % count);
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((i - 1 + count) % count);
    }
  };

  return (
    <div
      ref={rootRef}
      className={`accordion-gallery${vertical ? ' accordion-gallery--vertical' : ''}${className ? ` ${className}` : ''}`}
      style={{
        '--ag-accent': accentColor,
        '--ag-overlay': overlayColor,
        '--ag-text': textColor,
        '--ag-gap': `${gap}px`,
        '--ag-radius': `${radius}px`,
        height: vertical ? `${Math.round(height * 1.6)}px` : `${height}px`
      }}
      role="list"
      aria-label="Projects accordion gallery"
    >
      {items.map((item, i) => {
        const isActive = i === active;
        const mainImage = Array.isArray(item.images) ? item.images[0] : (item.image || 'sems1.png');

        return (
          <div
            key={item.id || i}
            ref={el => (panelRefs.current[i] = el)}
            className={`ag-panel${isActive ? ' ag-panel--active' : ''}`}
            style={{ borderRadius: `${radius}px` }}
            onClick={e => handleClick(i, e)}
            onMouseEnter={() => handleEnter(i)}
            onFocus={() => setActive(i)}
            onKeyDown={e => handleKeyDown(i, e)}
            role="listitem"
            tabIndex={0}
            aria-current={isActive ? 'true' : undefined}
            aria-label={item.title || item.label}
          >
            <span className="ag-panel__frame">
              <span className="ag-panel__media" ref={el => (mediaRefs.current[i] = el)}>
                <img src={mainImage} alt={item.title || item.label || ''} draggable="false" />
              </span>
              <span className="ag-panel__overlay" aria-hidden="true" />
            </span>

            {/* Collapsed side label - shown ONLY when panel is collapsed */}
            <div
              ref={el => (labelRefs.current[i] = el)}
              className="ag-collapsed-label"
              aria-hidden="true"
            >
              <span className="ag-collapsed-bar" />
              <span className="ag-collapsed-text">{item.title || item.label}</span>
            </div>

            {/* Active panel details box - shown ONLY when expanded */}
            <div
              ref={el => (bodyRefs.current[i] = el)}
              className="ag-panel__details"
            >
              <div className="ag-details-header">
                <span className="ag-role-badge">{item.role || 'Fullstack Developer'}</span>
                <span className="ag-year-badge">{item.year || '2025'}</span>
              </div>

              <h3 className="ag-details-title">{item.title || item.label}</h3>
              {item.description && <p className="ag-details-desc">{item.description}</p>}

              {item.tech && Array.isArray(item.tech) && (
                <div className="ag-tech-tags">
                  {item.tech.map((t, idx) => (
                    <span key={idx} className="ag-tech-tag">
                      {t}
                    </span>
                  ))}
                </div>
              )}

              {item.githubUrl && (
                <a
                  href={item.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="ag-github-btn"
                  onClick={e => e.stopPropagation()}
                >
                  View Code <i className="fas fa-arrow-up-right-from-square" />
                </a>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AccordionGallery;
