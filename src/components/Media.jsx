import React from 'react';
import photo1 from '../assets/photogallery/rs=w_1280,h_854.webp';
import photo2 from '../assets/photogallery/rs=w_1280,h_854 (1).webp';
import photo3 from '../assets/photogallery/cr=w_70,h_70,a_cc.webp';
import photo4 from '../assets/photogallery/cr=w_70,h_70,a_cc (1).webp';
import photo5 from '../assets/photogallery/cr=w_70,h_70,a_cc (2).webp';
import photo6 from '../assets/photogallery/cr=w_70,h_70,a_cc (3).webp';
import video1 from '../assets/1.mp4';
import video2 from '../assets/2.mp4';
import video3 from '../assets/3.mp4';
import posterImage from '../assets/dj2.png';
import './component-styles.css';

const photos = [photo1, photo2, photo3, photo4, photo5, photo6];

const videos = [video1, video2, video3];

export default function Media(){
  return (
    <section className="gallery" style={{padding:'40px 20px 20px'}}>
      <h2 style={{fontFamily:'Montserrat, sans-serif',textAlign:'center',color:'#fff'}}>Videos & Highlights</h2>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(240px,1fr))',gap:16}}>
        {videos.map((src,i)=>(
          <video key={i} controls poster={posterImage} style={{width:'100%',borderRadius:12,background:'#000'}}>
            <source src={src} type="video/mp4" />
          </video>
        ))}
      </div>
    </section>
  );
}
