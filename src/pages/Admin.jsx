import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebase/firebase';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { collection, getDocs, updateDoc, doc, getDoc, setDoc } from 'firebase/firestore';
import '../components/component-styles.css';

const adminTabs = ['Requests', 'Events', 'Site config'];

export default function Admin() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState(adminTabs[0]);
  const [requests, setRequests] = useState([]);
  const [events, setEvents] = useState([]);
  const [config, setConfig] = useState({});
  const [saveStatus, setSaveStatus] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (current) => {
      setUser(current);
      if (current) {
        loadAdminData();
      }
    });
    return unsubscribe;
  }, []);

  async function loadAdminData() {
    try {
      const [reqSnap, eventSnap, configSnap] = await Promise.all([
        getDocs(collection(db, 'bookingRequests')),
        getDocs(collection(db, 'events')),
        getDoc(doc(db, 'siteConfig', 'main'))
      ]);

      setRequests(reqSnap.docs.map((d) => ({ id: d.id, ...d.data() })));
      setEvents(eventSnap.docs.map((d) => ({ id: d.id, ...d.data() })));
      if (configSnap.exists()) {
        setConfig(configSnap.data());
      }
    } catch (error) {
      console.error('Failed to load admin data', error);
    }
  }

  async function login(e) {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setUser(auth.currentUser);
      loadAdminData();
    } catch (error) {
      console.error('Login failed', error);
    }
  }

  async function logout() {
    await signOut(auth);
    setUser(null);
  }

  async function approveRequest(request) {
    try {
      await updateDoc(doc(db, 'bookingRequests', request.id), { status: 'Approved' });
      loadAdminData();
    } catch (error) {
      console.error(error);
    }
    alert("This is stil be worked on")
  }

  async function saveConfig() {
    try {
      await setDoc(doc(db, 'siteConfig', 'main'), config);
      setSaveStatus('Saved successfully.');
      setTimeout(() => setSaveStatus(''), 3000);
    } catch (error) {
      setSaveStatus('Save failed.');
      console.error(error);
    }
    alert("This page is still be worked on")
  }

  const handleConfigChange = (field) => (e) => {
    setConfig((prev) => ({ ...prev, [field]: e.target.value }));
  };

  if (!user) {
    return (
      <div className="admin-shell">
        <div className="admin-panel" style={{ maxWidth: 520, margin: '0 auto' }}>
          <h2>Admin Login</h2>
          <form className="admin-form" onSubmit={login}>
            <label>
              Email
              <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required />
            </label>
            <label>
              Password
              <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" required />
            </label>
            <button className="btn" type="submit">Sign In</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-shell">
      <div className="admin-panel" style={{ maxWidth: 1000, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <h2>DJ CHROME Admin</h2>
          <button className="btn secondary" onClick={logout}>Sign Out</button>
        </div>
        <div className="admin-tabs">
          {adminTabs.map((tab) => (
            <button key={tab} className={activeTab === tab ? 'active' : ''} onClick={() => setActiveTab(tab)}>{tab}</button>
          ))}
        </div>

        {activeTab === 'Requests' && (
          <div className="admin-section">
            <h3>Booking Requests</h3>
            {requests.length ? requests.map((request) => (
              <div key={request.id} className="event-card">
                <div className="event-detail"><strong>Name:</strong> {request.name}</div>
                <div className="event-detail"><strong>Email:</strong> {request.email}</div>
                <div className="event-detail"><strong>Phone:</strong> {request.phone}</div>
                <div className="event-detail"><strong>Date:</strong> {request.date || 'N/A'}</div>
                <div className="event-detail"><strong>Type:</strong> {request.eventType}</div>
                <div className="event-detail"><strong>Venue:</strong> {request.venue || 'N/A'}</div>
                <div className="event-detail"><strong>Status:</strong> {request.status}</div>
                <button className="btn secondary" onClick={() => approveRequest(request)}>Approve</button>
              </div>
            )) : <p>No booking requests yet.</p>}
          </div>
        )}

        {activeTab === 'Events' && (
          <div className="admin-section">
            <h3>Published Events</h3>
            {events.length ? events.map((event) => (
              <div key={event.id} className="event-card">
                <div className="event-detail"><strong>Title:</strong> {event.title || event.eventType}</div>
                <div className="event-detail"><strong>Date:</strong> {event.date}</div>
                <div className="event-detail"><strong>Venue:</strong> {event.venue || 'N/A'}</div>
                <div className="event-detail"><strong>Status:</strong> {event.status || 'Scheduled'}</div>
              </div>
            )) : <p>No events published yet.</p>}
          </div>
        )}

        {activeTab === 'Site config' && (
          <div className="admin-section">
            <h3>Site Content</h3>
            <form className="admin-form" onSubmit={(e) => { e.preventDefault(); saveConfig(); }}>
              <label>
                Hero text
                <textarea value={config.heroText || ''} onChange={handleConfigChange('heroText')} />
              </label>
              <label>
                YouTube embed URL
                <input value={config.youtubeEmbed || ''} onChange={handleConfigChange('youtubeEmbed')} />
              </label>
              <label>
                Spotify embed URL
                <input value={config.spotifyEmbed || ''} onChange={handleConfigChange('spotifyEmbed')} />
              </label>
              <label>
                Contact phone
                <input value={config.phone || ''} onChange={handleConfigChange('phone')} />
              </label>
              <label>
                Contact email
                <input value={config.email || ''} onChange={handleConfigChange('email')} />
              </label>
              <button className="btn" type="submit">Save Site Content</button>
              {saveStatus && <div className="form-status">{saveStatus}</div>}
            </form>
          </div>
        )}
      </div>
    </div>
  );
  
}
