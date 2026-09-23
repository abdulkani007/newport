import React from 'react';

export default function Toast({ toastState, onClose }) {
  const { show, type, message } = toastState;

  if (!show) return null;

  const isSuccess = type === 'success';

  return (
    <div className={`toast ${show ? 'show' : ''}`} id="toast">
      <div className="toast-content">
        <i className={isSuccess ? 'fas fa-check-circle toast-icon' : 'fas fa-exclamation-circle toast-icon'}></i>
        <div className="toast-message">
          <h4>{isSuccess ? 'Success!' : 'Error!'}</h4>
          <p>{message || (isSuccess ? 'Your message has been sent successfully.' : 'Something went wrong. Please try again.')}</p>
        </div>
        <button className="toast-close" onClick={onClose} aria-label="Close notification">
          <i className="fas fa-times"></i>
        </button>
      </div>
    </div>
  );
}
