import React, { useEffect, useRef } from 'react';
import Shuffle from './Shuffle';
import BorderGlow from './BorderGlow';

function StatCounter({ target, label }) {
  const countRef = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = countRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true;
            const targetNum = parseInt(target, 10);
            let count = 0;
            const increment = targetNum / 50;
            const timer = setInterval(() => {
              count += increment;
              if (count >= targetNum) {
                el.textContent = targetNum + '+';
                clearInterval(timer);
              } else {
                el.textContent = Math.floor(count);
              }
            }, 30);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div className="stat-counter-item">
      <span ref={countRef} className="stat-number" data-target={target}>
        0
      </span>
      <span className="stat-label">{label}</span>
    </div>
  );
}

export default function CodingProfiles() {
  return (
    <section id="coding" className="section coding-profiles">
      <div className="container">
        <span className="section-tag">Competitive Metrics</span>
        <Shuffle
          text="Coding Profiles"
          tag="h2"
          className="section-title"
          shuffleDirection="right"
          duration={0.35}
          animationMode="evenodd"
          shuffleTimes={1}
          stagger={0.03}
          triggerOnHover={true}
        />

        <div className="coding-grid">
          <a
            href="https://leetcode.com/u/Abbu_007/"
            target="_blank"
            rel="noreferrer"
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <BorderGlow className="coding-card">
              <div className="coding-card-top">
                <div className="coding-platform-title">
                  <i className="fas fa-code"></i>
                  <span>LeetCode</span>
                </div>
                <div className="rank-badge">Rank: 621,246</div>
              </div>

              <div className="stat-counter-wrapper">
                <StatCounter target="230" label="Problems Solved" />
                <StatCounter target="24" label="Max Streak" />
                <StatCounter target="100" label="Active Days" />
              </div>
            </BorderGlow>
          </a>

          <a
            href="https://www.skillrack.com/faces/resume.xhtml?id=515445&key=8067d22b7b62e8ff15f4bc28fad9987419437ae7"
            target="_blank"
            rel="noreferrer"
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <BorderGlow className="coding-card">
              <div className="coding-card-top">
                <div className="coding-platform-title">
                  <i className="fas fa-laptop-code"></i>
                  <span>SkillRack</span>
                </div>
              </div>

              <div className="stat-counter-wrapper">
                <StatCounter target="1120" label="Problems Solved" />
              </div>
            </BorderGlow>
          </a>

          <BorderGlow className="coding-card">
            <div className="coding-card-top">
              <div className="coding-platform-title">
                <i className="fas fa-trophy"></i>
                <span>CodeChef</span>
              </div>
              <div className="rank-badge">Global Rank: 41,635</div>
            </div>

            <div className="stat-counter-wrapper">
              <StatCounter target="300" label="Problems Solved" />
            </div>
          </BorderGlow>

          <a
            href="https://www.hackerrank.com/profile/abdulkani_b20241"
            target="_blank"
            rel="noreferrer"
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <BorderGlow className="coding-card">
              <div className="coding-card-top">
                <div className="coding-platform-title">
                  <i className="fas fa-star"></i>
                  <span>HackerRank</span>
                </div>
                <div className="rank-badge">Certified Solver</div>
              </div>

              <div className="hackerrank-badges">
                <div className="badge-item">
                  <span className="badge-stars">★★★★★</span>
                  <span>Java</span>
                </div>
                <div className="badge-item">
                  <span className="badge-stars">★★</span>
                  <span>C++</span>
                </div>
                <div className="badge-item">
                  <span className="badge-stars">★★</span>
                  <span>SQL</span>
                </div>
                <div className="badge-item">
                  <span className="badge-stars">★</span>
                  <span>C</span>
                </div>
                <div className="badge-item">
                  <span className="badge-stars">★</span>
                  <span>Python</span>
                </div>
              </div>
            </BorderGlow>
          </a>
        </div>
      </div>
    </section>
  );
}
