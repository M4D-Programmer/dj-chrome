import React, { useState, useEffect } from 'react';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import './component-styles.css';

export default function BookingModal({ open, onClose, defaultDate = null }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    eventType: 'Wedding',
    date: defaultDate || '',
    venue: '',
    notes: ''
  });
  const [status, setStatus] = useState('');

  useEffect(() => {
    if (defaultDate) {
      setForm(prev => ({ ...prev, date: defaultDate }));
    }
  }, [defaultDate]);

  useEffect(() => {
    if (!open) {
      setStatus('');
    }
  }, [open]);

  if (!open) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const submitRequest = async (e) => {
    e.preventDefault();
    setStatus('Sending request...');
    try {
      await addDoc(collection(db, 'bookingRequests'), {
        ...form,
        status: 'New',
        createdAt: serverTimestamp()
      });
      setStatus('Booking request sent. We will follow up soon.');
      setForm({ name: '', email: '', phone: '', eventType: 'Wedding', date: defaultDate || '', venue: '', notes: '' });
    } catch (error) {
      setStatus('Could not save request. Please refresh and try again.');
      console.error(error);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <button className="modal-close" onClick={onClose} aria-label="Close booking form">×</button>
        <h3>Request DJ CHROME</h3>
        <p>Tell us about your event and we&apos;ll confirm availability.</p>
        <form className="modal-form" onSubmit={submitRequest}>
          <div className="form-grid">
            <label>
              Name
              <input name="name" value={form.name} onChange={handleChange} required />
            </label>
            <label>
              Email
              <input name="email" type="email" value={form.email} onChange={handleChange} required />
            </label>
            <label>
              Phone
              <input name="phone" value={form.phone} onChange={handleChange} required />
            </label>
            <label>
              Date
              <input name="date" type="date" value={form.date} onChange={handleChange} required />
            </label>
            <label>
              Event type
              <select className="eventSelections" name="eventType" value={form.eventType} onChange={handleChange}>
                <option className="eventSelections">Wedding</option>
                <option className="eventSelections">Private party</option>
                <option className="eventSelections">Corporate event</option>
                <option className="eventSelections">Festival</option>
                <option className="eventSelections">Other</option>
              </select>
            </label>
            <label>
              Venue
              <input name="venue" value={form.venue} onChange={handleChange} />
            </label>
          </div>
          <label className="textarea-field">
            Notes
            <textarea name="notes" value={form.notes} onChange={handleChange} rows="4" placeholder="Tell us your vision, guest count, or music preferences." />
          </label>
          <button className="btn" type="submit">Send Request</button>
          {status && <div className="form-status">{status}</div>}
        </form>
      </div>
    </div>
  );
}
