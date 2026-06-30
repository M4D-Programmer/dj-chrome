import React from 'react';
import './component-styles.css';

export default function BookingBar({ onBook, onCall, onMessage }){
  return (
    <div className="booking-bar" aria-hidden={false}>
      <div className="booking-inner">
        <button className="small-btn" onClick={onCall}>📞 Call</button>
        <button className="btn" onClick={onBook}>📅 Book</button>
        <button className="small-btn" onClick={onMessage}>✉ Message</button>
      </div>
    </div>
  );
}
