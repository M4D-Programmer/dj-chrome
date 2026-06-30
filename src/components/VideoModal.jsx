import React from 'react';
import './component-styles.css';

export default function VideoModal({ open, onClose, src }) {
  if (!open) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-card video-modal-card">
        <button className="modal-close" onClick={onClose} aria-label="Close video">×</button>
        <h3>DJ CHROME Live Reel</h3>
        <div className="video-frame">
          <iframe
            title="DJ CHROME live reel"
            width="100%"
            height="100%"
            src={src || 'https://www.youtube.com/embed/ScMzIvxBSi4'}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
}
