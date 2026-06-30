import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from './firebase/firebase';
import Nav from './components/Nav';
import Hero from './components/Hero';
import Trust from './components/Trust';
import Services from './components/Services';
import Experience from './components/Experience';
import Gallery from './components/Gallery';
import Media from './components/Media';
import Testimonials from './components/Testimonials';
import BookingBar from './components/BookingBar';
import Footer from './components/Footer';
import Admin from './pages/Admin';
import About from './pages/About';
import Booking from './pages/Booking';
import Events from './pages/Events';
import Jobs from './pages/Jobs';
import BookingModal from './components/BookingModal';
import VideoModal from './components/VideoModal';
import FAQ from './components/FAQ';

const defaultConfig = {
  heroText: 'High-energy entertainment for weddings, parties, festivals, and unforgettable events.',
  heroButtonText: 'Book Your Event',
  heroWatchText: 'Watch DJ CHROME Live',
  aboutText: 'High-energy entertainment for weddings, parties, festivals, and unforgettable events. DJ CHROME combines professional sound, dynamic lighting, crowd interaction, and customized playlists to create unforgettable moments.',
  youtubeEmbed: 'https://www.youtube.com/embed/XA3BdLsK8-0',
  spotifyEmbed: 'https://open.spotify.com/embed/artist/2KqjAthmAXSkjfKTs50Re5?utm_source=generator&theme=0&si=8858ca60110f453a',
  phone: '(555) 555-5555',
  email: 'dj.chrome740@gmail.com',
  faq: [
    { q: 'What types of events does DJ CHROME book?', a: 'Weddings, corporate events, private parties, festivals, and more.' },
    { q: 'How soon should I book?', a: 'We recommend booking 3-6 months in advance for peak dates and venue coordination.' },
    { q: 'Can I request custom playlists?', a: 'Yes — every event includes custom music planning and crowd-tailored song selections.' }
  ]
};

function App() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [videoOpen, setVideoOpen] = useState(false);
  const [siteConfig, setSiteConfig] = useState(defaultConfig);

  useEffect(() => {
    async function loadConfig() {
      try {
        const configRef = doc(db, 'siteConfig', 'main');
        const snapshot = await getDoc(configRef);
        if (snapshot.exists()) {
          setSiteConfig(prev => ({ ...prev, ...snapshot.data() }));
        }
      } catch (error) {
        console.error('Error fetching site config:', error);
      }
    }

    loadConfig();
  }, []);

  return (
    <BrowserRouter basename="/dj-chrome">
      <div className="App">
        <Nav />
        <Routes>
          <Route path="/" element={ <>
            <Hero config={siteConfig} onBook={() => setBookingOpen(true)} onWatch={() => setVideoOpen(true)} />
            <Trust />
            <Services />
            <Experience />
            <Media />
            
            <Testimonials />
          </> } />
          <Route path="/about" element={<About config={siteConfig} />} />
          <Route path="/booking" element={<Booking onBook={() => setBookingOpen(true)} config={siteConfig} />} />
          <Route path="/events" element={<Events />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/dj/admin" element={<Admin />} />
        </Routes>
        <BookingBar
          onBook={() => setBookingOpen(true)}
          onCall={() => window.location.href = `tel:${siteConfig.phone.replace(/[^0-9+]/g, '')}`}
          onMessage={() => window.location.href = `mailto:${siteConfig.email}`}
        />
        <Footer />
        <BookingModal open={bookingOpen} onClose={() => setBookingOpen(false)} />
        <VideoModal open={videoOpen} onClose={() => setVideoOpen(false)} src={siteConfig.youtubeEmbed} />
      </div>
    </BrowserRouter>
  );
}

export default App;
