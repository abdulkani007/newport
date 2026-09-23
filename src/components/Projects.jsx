import React from 'react';
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
  return (
    <section id="projects" className="section projects">
      <div className="container">
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

        <div className="project-grid">
          {projectsData.map((project) => (
            <ProjectCard key={project.id} {...project} />
          ))}
        </div>
      </div>
    </section>
  );
}
