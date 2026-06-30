import React from 'react';
import Gallery from '../components/Gallery';
import FAQ from '../components/FAQ';

export default function About({ config }){
  const youtubeSrc = config?.youtubeEmbed || 'https://www.youtube.com/watch?v=XA3BdLsK8-0';
  const spotifySrc = config?.spotifyEmbed || 'https://open.spotify.com/artist/2KqjAthmAXSkjfKTs50Re5?si=pcFu4a3BQHCfn9QFgGQDcA&nd=1&dlsi=07457114cc664641';

  return (
    <div style={{ padding: 24, maxWidth: 1100, margin: '0 auto' }}>
      <h1>About DJ CHROME</h1>
      <p style={{ maxWidth: 840, color: '#cfd6e1' }}>{config?.aboutText || 'High-energy entertainment for weddings, parties, festivals, and unforgettable events. DJ CHROME combines professional sound, dynamic lighting, crowd interaction, and customized playlists to create unforgettable moments.'}</p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginTop: 24 }}>
        <div className="embed-container">
          <h3 style={{ color: '#fff', marginBottom: 12 }}>YouTube Live Reel</h3>
          <iframe title="DJ CHROME video" src={youtubeSrc} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
        </div>
        <div className="embed-container">
          <h3 style={{ color: '#fff', marginBottom: 12 }}>Spotify Mix</h3>
          <iframe title="DJ CHROME Spotify" src={spotifySrc} height="352" frameBorder="0" allow="encrypted-media" allowFullScreen />
        </div>
      </div>
      <Gallery />
      <FAQ items={config.faq} />
    </div>
  );
}
