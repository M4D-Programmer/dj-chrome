import React from 'react';
import imgA from '../assets/photogallery/rs=w_1280,h_854.webp';
import imgB from '../assets/photogallery/rs=w_1280,h_854 (1).webp';
import './component-styles.css';

export default function Experience(){
  return (
    <section className="experience">
      <h2 style={{fontFamily:'Montserrat, sans-serif'}}>More than music — an experience</h2>
      <p className="lead">DJ CHROME combines professional sound, dynamic lighting, crowd interaction, and customized playlists to create unforgettable moments.</p>
      <div style={{display:'flex',gap:12,justifyContent:'center',flexWrap:'wrap'}}>
        <img src={imgA} alt="setup" style={{width:300,height:200,objectFit:'cover',borderRadius:8}}/>
        <img src={imgB} alt="dance" style={{width:300,height:200,objectFit:'cover',borderRadius:8}}/>
      </div>
    </section>
  );
}
