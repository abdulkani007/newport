import React, { useState } from 'react';
import AccordionGallery from './AccordionGallery';
import ProjectCard from './ProjectCard';
import Shuffle from './Shuffle';

const projectsData = [
  {
    id: 'sems',
    role: 'Fullstack Developer',
    year: '2025',
    title: 'SEMS - Smart Event Management System',
    images: ['sems1.png', 'sems2.png', 'sems3.png'],
    description:
      'A comprehensive web-based platform for colleges to streamline sports event management with unique ID-based registration, QR code verification, and secure access control.',
    features: ['Unique ID Registration', 'QR Scan Verification', 'Secure Access Control'],
    tech: ['HTML', 'CSS', 'JavaScript', 'Firebase'],
    githubUrl: 'https://github.com/abdulkani007/SEMS-3.git',
  },
  {
    id: 'abbu-assistant',
    role: 'AI & Automation Lead',
    year: '2025',
    title: 'Abbu Assistant - AI Voice Assistant',
    images: ['ai2.png', 'ai1.png'],
    description:
      'An intelligent voice-controlled personal assistant with speech recognition, YouTube automation, web search integration, and Google service connectivity.',
    features: ['Speech Recognition', 'YouTube Automation', 'Web Search'],
    tech: ['Python', 'Tkinter', 'SpeechRecognition', 'MongoDB'],
    githubUrl: 'https://github.com/abdulkani007/AI.git',
  },
  {
    id: 'agentic-loan',
    role: 'Lead Developer',
    year: '2025',
    title: 'AgenticLoan AI - Loan Approval System',
    images: ['agent1.png', 'agent2.png'],
    description:
      'An automated digital lending platform with GPT-based chatbot, voice assistant, admin dashboard, and real-time status tracking for streamlined loan processing.',
    features: ['GPT Chatbot', 'Admin Dashboard', 'Real-time Tracking'],
    tech: ['React', 'Node.js', 'MongoDB', 'GPT API'],
    githubUrl: 'https://github.com/abdulkani007/Agentic--AI.git',
  },
  {
    id: 'csp',
    role: 'Fullstack Developer',
    year: '2025',
    title: 'CSP - Content Submission Platform',
    images: ['csp1.png', 'csp2.png'],
    description:
      'A secure content workflow automation system with role-based access control and streamlined review and approval pipeline.',
    features: ['Role-based Access', 'Workflow Automation', 'Secure Review'],
    tech: ['React', 'Node.js', 'MongoDB', 'Express'],
    githubUrl: 'https://github.com/abdulkani007/content-system.git',
  },
];

export default function Projects() {
  const [viewMode, setViewMode] = useState('gallery'); // 'gallery' | 'grid'

  return (
    <section id="projects" className="section projects">
      <div className="container">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', marginBottom: '24px' }}>
          <div>
            <span className="section-tag">Selected Work</span>
            <Shuffle
              text="Projects"
              tag="h2"
              className="section-title"
              shuffleDirection="right"
              duration={0.35}
              animationMode="evenodd"
              shuffleTimes={1}
              stagger={0.03}
              triggerOnHover={true}
            />
          </div>

          {/* View Mode Toggle Controls */}
          <div style={{ display: 'inline-flex', background: 'var(--card-bg)', border: '1px solid var(--card-border)', borderRadius: '50px', padding: '4px' }}>
            <button
              type="button"
              onClick={() => setViewMode('gallery')}
              style={{
                padding: '8px 18px',
                borderRadius: '50px',
                border: 'none',
                background: viewMode === 'gallery' ? 'var(--primary)' : 'transparent',
                color: viewMode === 'gallery' ? '#ffffff' : 'var(--text-secondary)',
                fontSize: '0.78rem',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                textTransform: 'uppercase',
                letterSpacing: '0.12em'
              }}
            >
              <i className="fas fa-layer-group" style={{ marginRight: '6px' }} /> 3D Gallery
            </button>
            <button
              type="button"
              onClick={() => setViewMode('grid')}
              style={{
                padding: '8px 18px',
                borderRadius: '50px',
                border: 'none',
                background: viewMode === 'grid' ? 'var(--primary)' : 'transparent',
                color: viewMode === 'grid' ? '#ffffff' : 'var(--text-secondary)',
                fontSize: '0.78rem',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                textTransform: 'uppercase',
                letterSpacing: '0.12em'
              }}
            >
              <i className="fas fa-th-large" style={{ marginRight: '6px' }} /> Grid Cards
            </button>
          </div>
        </div>

        {/* 3D Accordion Gallery Showcase */}
        {viewMode === 'gallery' ? (
          <div style={{ width: '100%', minHeight: '520px' }}>
            <AccordionGallery
              items={projectsData}
              defaultIndex={0}
              expandRatio={0.58}
              trigger="hover"
              height={520}
              tilt={6}
              accentColor="#ef4444"
            />
          </div>
        ) : (
          /* Detailed Project Cards Grid View */
          <div className="project-grid">
            {projectsData.map((project) => (
              <ProjectCard key={project.id} {...project} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
