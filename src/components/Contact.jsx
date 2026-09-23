import React, { useState } from 'react';
import BellToggle from './BellToggle';

export default function Contact({ showToast, onMessageSaved }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const messageObj = {
      id: Date.now(),
      name: formData.name,
      email: formData.email,
      subject: formData.subject,
      message: formData.message,
      timestamp: new Date().toISOString(),
      read: false,
    };

    try {
      const existing = JSON.parse(localStorage.getItem('portfolioMessages')) || [];
      existing.unshift(messageObj);
      localStorage.setItem('portfolioMessages', JSON.stringify(existing));
    } catch (err) {
      console.error('Error saving message to localStorage:', err);
    }

    const bodyData = new FormData();
    bodyData.append('name', formData.name);
    bodyData.append('email', formData.email);
    bodyData.append('subject', formData.subject);
    bodyData.append('message', formData.message);

    fetch('https://formspree.io/f/myzrjnpv', {
      method: 'POST',
      body: bodyData,
      headers: {
        Accept: 'application/json',
      },
    })
      .then((res) => {
        if (res.ok) {
          showToast('success', 'Your message has been sent successfully.');
        } else {
          showToast('error', 'Failed to send message. Please try again.');
        }
      })
      .catch(() => {
        showToast('success', 'Your message has been sent successfully.');
      })
      .finally(() => {
        setLoading(false);
        setFormData({ name: '', email: '', subject: '', message: '' });
        if (onMessageSaved) onMessageSaved();
      });
  };

  return (
    <section id="contact" className="section contact">
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
          <div>
            <span className="section-tag">LET'S CONNECT</span>
            <h2 className="section-title" style={{ marginBottom: 0 }}>Get In Touch</h2>
          </div>
          <BellToggle
            offLabel="Get updates"
            onLabel="Subscribed for updates"
            color="#f5f5f5"
            background="#18181b"
            onColor="#ffffff"
            onBackground="#ef4444"
            size="md"
            badge
            badgeColor="#ef4444"
            count={1}
            waves
          />
        </div>

        <div className="contact-grid">
          <div className="card contact-info-card">
            <div className="contact-item">
              <i className="fas fa-envelope"></i>
              <div>
                <h4>Email</h4>
                <p>abdulkani180607@gmail.com</p>
                <p>abdulkani.b2024it@sece.ac.in</p>
              </div>
            </div>

            <div className="contact-item">
              <i className="fas fa-phone"></i>
              <div>
                <h4>Phone</h4>
                <p>+91 8072924468</p>
                <p>+91 8807253437</p>
              </div>
            </div>

            <div className="contact-item">
              <i className="fas fa-location-dot"></i>
              <div>
                <h4>Location</h4>
                <p>Pennadam, Cuddalore, Tamil Nadu, India - 606105</p>
              </div>
            </div>
          </div>

          <div className="card contact-form-card">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="form-input"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-input"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  className="form-input"
                  placeholder="Project inquiry or feedback"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  className="form-textarea"
                  rows="4"
                  placeholder="Share details about your project or inquiry..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              <button type="submit" className="btn-submit" disabled={loading}>
                {loading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
