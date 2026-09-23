import React from 'react';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <span>&copy; {new Date().getFullYear()} Abdul Kani Portfolio</span>
        <span>Designed &amp; Built with Glassmorphism</span>
      </div>
    </footer>
  );
}
