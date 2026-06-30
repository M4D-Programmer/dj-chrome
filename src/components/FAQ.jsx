import React from 'react';
import './component-styles.css';

export default function FAQ({ items = [] }) {
  const questions = items.length ? items : [
    { q: 'What types of events does DJ CHROME book?', a: 'Weddings, corporate events, private parties, festivals, and more.' },
    { q: 'How soon should I book?', a: 'We recommend booking 3-6 months in advance for peak dates and venue coordination.' },
    { q: 'Can I request custom playlists?', a: 'Yes — every event includes custom music planning and crowd-tailored song selections.' },
  ];

  return (
    <section className="faq-section">
      <div style={{ maxWidth: 980, margin: '0 auto' }}>
        <h2 style={{ fontFamily: 'Montserrat, sans-serif', color: '#fff', textAlign: 'center' }}>Frequently Asked Questions</h2>
        <div className="faq-grid">
          {questions.map((item, index) => (
            <div key={index} className="faq-item">
              <h4>{item.q}</h4>
              <p>{item.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
