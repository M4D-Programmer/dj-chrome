import React, { useState } from 'react';
import './component-styles.css';

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

function getWeekday(date) {
  return new Date(date).getDay();
}

function formatKey(date) {
  return date.toISOString().slice(0, 10);
}

export default function Calendar({ blockedDates = [] }) {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const [selectedDate, setSelectedDate] = useState(null);

  const monthName = currentMonth.toLocaleString('default', { month: 'long' });
  const year = currentMonth.getFullYear();
  const totalDays = getDaysInMonth(year, currentMonth.getMonth());
  const firstWeekday = getWeekday(new Date(year, currentMonth.getMonth(), 1));

  const days = Array.from({ length: totalDays }, (_, index) => {
    const date = new Date(year, currentMonth.getMonth(), index + 1);
    const key = formatKey(date);
    const blocked = blockedDates.includes(key);
    return { date, key, blocked };
  });

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="calendar-shell">
      <div className="calendar-header">
        <button onClick={() => setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1))}>&lsaquo;</button>
        <div>{monthName} {year}</div>
        <button onClick={() => setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1))}>&rsaquo;</button>
      </div>
      <div className="calendar-grid labels">
        {weekDays.map(day => <div key={day} className="calendar-label">{day}</div>)}
      </div>
      <div className="calendar-grid">
        {Array.from({ length: firstWeekday }).map((_, index) => <div key={`blank-${index}`} className="calendar-cell empty" />)}
        {days.map(day => (
          <div
            key={day.key}
            className={`calendar-cell ${day.blocked ? 'blocked' : 'available'} ${selectedDate === day.key ? 'selected' : ''}`}
            onClick={() => setSelectedDate(day.key)}
          >
            <span>{day.date.getDate()}</span>
          </div>
        ))}
      </div>
      <div className="calendar-meta">
        <span><strong>{blockedDates.length}</strong> blocked day(s)</span>
        <span><strong>{totalDays - blockedDates.length}</strong> available day(s)</span>
      </div>
    </div>
  );
}
