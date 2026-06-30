import React from 'react';
import img1 from '../assets/photogallery/rs=w_1280,h_854.webp';
import img2 from '../assets/photogallery/rs=w_1280,h_854 (1).webp';
import img3 from '../assets/photogallery/cr=w_70,h_70,a_cc.webp';
import img4 from '../assets/photogallery/cr=w_70,h_70,a_cc (1).webp';
import img5 from '../assets/photogallery/cr=w_70,h_70,a_cc (2).webp';
import img6 from '../assets/photogallery/cr=w_70,h_70,a_cc (3).webp';
import './component-styles.css';

const imgs = [img1, img2, img3, img4, img5, img6];

export default function Gallery(){
  return (
    <section className="gallery">
      <h2 style={{fontFamily:'Montserrat, sans-serif',textAlign:'center',color:'#fff'}}>Photo Gallery</h2>
      <div className="gallery-grid" style={{gridTemplateColumns:'repeat(3,1fr)'}}>
        {imgs.map((src,i)=> <img key={i} src={src} alt={`gallery-${i}`} />)}
      </div>
    </section>
  );
}
