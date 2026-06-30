import React from 'react';
import './component-styles.css';

const quotes = [
  {q:'DJ CHROME kept everyone dancing all night.', who:'— Alex, Bride'},
  {q:'Professional, organized, and amazing energy.', who:'— Jordan, Event Planner'},
  {q:'Best DJ we\'ve ever hired.', who:'— Morgan, Client'}
]

export default function Testimonials(){
  return (
    <section className="testimonials">
      <h2 style={{fontFamily:'Montserrat, sans-serif',textAlign:'center'}}>Testimonials</h2>
      <div className="testimonials-grid">
        {quotes.map((t,i)=> (
          <div className="testimonial" key={i}>
            <p style={{fontSize:16}}>{t.q}</p>
            <p style={{marginTop:8,color:'#9aa0a6'}}>{t.who}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
