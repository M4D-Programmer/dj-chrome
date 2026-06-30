import React from 'react';
import logoImage from '../assets/djchrome.png';
import './component-styles.css';

export default function Hero({ config, onBook, onWatch }){
  return (
    <section className="hero">
      <img className="hero-bg" src={logoImage} alt="DJ Chrome background" />
      <div className="overlay" />
      <div className="hero-content">
        <h1>DJ CHROME</h1>
        <p>{config?.heroText || 'High-energy entertainment for weddings, parties, festivals, and unforgettable events.'}</p>
        <div className="cta-row">
          <button className="btn" onClick={onBook}>{config?.heroButtonText || 'Book Your Event'}</button>
          <button className="btn secondary" onClick={onWatch}>{config?.heroWatchText || 'Watch DJ CHROME Live'}</button>
        </div>
      </div>
    </section>
  );
}
