import React from 'react';
import './component-styles.css';

const services = [
  {title:'Wedding Events', items:['Custom playlists','MC services','Ceremony audio','Reception entertainment']},
  {title:'Private Parties', items:['Birthdays','Graduations','Reunions','Custom music flows']},
  {title:'Corporate Events', items:['Company events','Conferences','Celebrations','Professional setups']},
  {title:'Festival / Community', items:['Live entertainment','Crowd engagement','Sound systems','Stage coordination']}
]

export default function Services(){
  return (
    <section className="services">
      <div style={{maxWidth:1100,margin:'0 auto 24px'}}>
        <h2 style={{fontFamily:'Montserrat, sans-serif',color:'white'}}>Services</h2>
        <p style={{color:'#cbd5e1'}}>Choose the right package for your event.</p>
      </div>
      <div className="services-grid">
        {services.map(s=> (
          <div className="card" key={s.title}>
            <h4>{s.title}</h4>
            <ul>
              {s.items.map(i=> <li key={i}>{i}</li>)}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
