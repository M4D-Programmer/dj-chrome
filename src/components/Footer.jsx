import React from 'react';
import './component-styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTiktok, faYoutube } from '@fortawesome/free-brands-svg-icons';

export default function Footer(){
  return (
    <footer className="site-footer">
      <div style={{maxWidth:1000,margin:'0 auto',display:'flex',flexDirection:'column',alignItems:'center',gap:14}}>
        <div>
          <strong>DJ CHROME</strong>
        </div>
        <div style={{color:'#9aa0a6',textAlign:'center'}}>Phone: (555) 555-5555 • Email: dj.chrome740@gmail.com</div>
        <div style={{display:'flex',gap:18,alignItems:'center'}}>
          <a href="https://www.facebook.com" target="_blank" rel="noreferrer" style={{color:'#9aa0a6'}}><FontAwesomeIcon icon={faFacebook} /></a>
          <a href="https://www.tiktok.com" target="_blank" rel="noreferrer" style={{color:'#9aa0a6'}}><FontAwesomeIcon icon={faTiktok} /></a>
          <a href="https://www.youtube.com" target="_blank" rel="noreferrer" style={{color:'#9aa0a6'}}><FontAwesomeIcon icon={faYoutube} /></a>
        </div>
        <div style={{color:'#7f8790'}}>© {new Date().getFullYear()} DJ CHROME</div>
      </div>
      <br />
      <br />
      <br />
    </footer>
  );
}
