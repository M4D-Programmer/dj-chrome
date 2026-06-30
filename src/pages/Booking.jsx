import React, { useState, useEffect } from 'react';
import Calendar from '../components/Calendar';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import '../App.css';

export default function Booking({ onBook, config }){
  const [blockedDates, setBlockedDates] = useState([]);
  const [eventList, setEventList] = useState([]);

  useEffect(() => {
    async function loadEvents() {
      try {
        const snapshot = await getDocs(collection(db, 'events'));
        const events = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setEventList(events);
        setBlockedDates(events.map(event => event.date).filter(Boolean));
      } catch (error) {
        console.error('Could not load events', error);
      }
    }

    loadEvents();
  }, []);

  return (
    <div style={{ padding: 24, maxWidth: 1100, margin: '0 auto' }}>
      <h1>Booking</h1>
      <p>{config?.aboutText || 'Choose your date and see which days are already blocked for events.'}</p>
      <button className="btn" style={{ marginBottom: 20 }} onClick={onBook}>Request a Booking</button>
      <Calendar blockedDates={blockedDates.length ? blockedDates : ['2026-07-05', '2026-08-22', '2026-08-30']} />
      <section style={{ marginTop: 32, color: '#ced7e0' }}>
        <h2>Upcoming reserved dates</h2>
        <ul>
          {eventList.length ? eventList.map(event => (
            <li key={event.id}>
              <strong>{event.date}</strong> — {event.title || event.eventType || 'Reserved'} at {event.venue || 'venue'}
            </li>
          )) : <li>No upcoming public events available yet.</li>}
        </ul>
      </section>
    </div>
  );
}
