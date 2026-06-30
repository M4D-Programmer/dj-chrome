import React from 'react';
import './component-styles.css';

export default function Trust(){
  return (
    <section className="trust">
      <div className="trust-grid">
        <div className="trust-item"><h3>200+</h3><p>Events</p></div>
        <div className="trust-item"><h3>Weddings</h3><p>Ceremonies & receptions</p></div>
        <div className="trust-item"><h3>Private</h3><p>Parties & birthdays</p></div>
        <div className="trust-item"><h3>Corporate</h3><p>Company events & conferences</p></div>
        <div className="trust-item"><h3>5★</h3><p>Average rating</p></div>
      </div>
    </section>
  );
}
