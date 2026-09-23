import React, { useState, useEffect, useCallback } from 'react';

export default function Messages({ showToast, refreshTrigger }) {
  const [messages, setMessages] = useState([]);

  const loadMessages = useCallback(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('portfolioMessages')) || [];
      setMessages(stored);
    } catch (err) {
      console.error('Error loading messages from localStorage:', err);
      setMessages([]);
    }
  }, []);

  useEffect(() => {
    loadMessages();
  }, [loadMessages, refreshTrigger]);

  const handleDeleteMessage = (id) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      const updated = messages.filter((msg) => msg.id !== id);
      localStorage.setItem('portfolioMessages', JSON.stringify(updated));
      setMessages(updated);
      showToast('success', 'Message deleted successfully.');
    }
  };

  const handleReplyMessage = (email, subject) => {
    const mailtoLink = `mailto:${email}?subject=Re: ${encodeURIComponent(subject)}`;
    window.open(mailtoLink);
  };

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to delete all messages?')) {
      localStorage.removeItem('portfolioMessages');
      setMessages([]);
      showToast('success', 'All messages cleared successfully.');
    }
  };

  return (
    <section id="messages" className="section messages">
      <div className="container">
        <span className="section-tag">INBOX HISTORY</span>
        <h2 className="section-title">Messages</h2>

        <div className="card messages-card">
          <div className="messages-header">
            <h3>Messages sent to abdulkani180607@gmail.com</h3>
            <button className="btn-clear" onClick={handleClearAll}>
              <i className="fas fa-trash"></i> Clear All
            </button>
          </div>

          {messages.length > 0 ? (
            <div className="messages-list">
              {messages.map((msg) => {
                const date = new Date(msg.timestamp);
                const formattedDate =
                  date.toLocaleDateString() + ' ' + date.toLocaleTimeString();

                return (
                  <div key={msg.id} className="message-item">
                    <div className="message-header-row">
                      <div className="message-sender">
                        <h4>{msg.name}</h4>
                        <span>{msg.email}</span>
                      </div>
                      <div className="message-date">{formattedDate}</div>
                    </div>
                    <div className="message-subject">{msg.subject}</div>
                    <div className="message-body">{msg.message}</div>
                    <div className="message-actions">
                      <button
                        className="btn-msg-reply"
                        onClick={() => handleReplyMessage(msg.email, msg.subject)}
                      >
                        <i className="fas fa-reply"></i> Reply
                      </button>
                      <button
                        className="btn-msg-delete"
                        onClick={() => handleDeleteMessage(msg.id)}
                      >
                        <i className="fas fa-trash"></i> Delete
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="no-messages">
              <i className="fas fa-inbox"></i>
              <p>No messages yet. Messages will appear here after submission.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
