import React, { useState, useEffect } from 'react';
import Calendar from '../components/Calendar';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebase';

export default function Events(){
  const [events, setEvents] = useState([]);
  const [blockedDates, setBlockedDates] = useState([]);

  useEffect(() => {
    async function loadEvents() {
      try {
        const snapshot = await getDocs(collection(db, 'events'));
        const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setEvents(items);
        setBlockedDates(items.map(item => item.date).filter(Boolean));
      } catch (err) {
        console.error('Could not load events', err);
      }
    }

    loadEvents();
  }, []);

  return (
    <div style={{ padding: 24, maxWidth: 1100, margin: '0 auto' }}>
      <h1>Upcoming Events</h1>
      <p>These dates are reserved for upcoming DJ CHROME events.</p>
      <Calendar blockedDates={blockedDates.length ? blockedDates : ['2026-07-04', '2026-07-12', '2026-07-18', '2026-08-02']} />
      <div style={{ marginTop: 28 }}>
        {events.length ? events.map(event => (
          <div key={event.id} style={{ padding: 16, border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, marginBottom: 12 }}>
            <h3 style={{ margin: '0 0 6px', color: '#fff' }}>{event.title || event.eventType || 'Event'}</h3>
            <div style={{ color: '#c7d1e0', fontSize: 14 }}>
              <div><strong>Date:</strong> {event.date || 'TBD'}</div>
              <div><strong>Venue:</strong> {event.venue || 'N/A'}</div>
              <div><strong>Status:</strong> {event.status || 'Scheduled'}</div>
            </div>
          </div>
        )) : <p style={{ color: '#c7d1e0' }}>No public events have been published yet.</p>}
      </div>
    </div>
  );
}
