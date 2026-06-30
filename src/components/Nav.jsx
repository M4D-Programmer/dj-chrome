import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import logoImage from '../assets/logo.png';
import '../components/component-styles.css';

export default function Nav(){
  const [menuOpen, setMenuOpen] = useState(false);
  const navItems = [
    { to: '/about', label: 'About' },
    { to: '/booking', label: 'Booking' },
    { to: '/events', label: 'Upcoming Events' },
    { to: '/jobs', label: 'Jobs' },
    { to: '/dj/admin', label: 'Admin' },
  ];

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="nav-logo">
          <img src={logoImage} alt="DJ CHROME" />
        </Link>
        <div className="nav-links">
          {navItems.map(item => (
            <Link key={item.to} to={item.to} className="nav-link" onClick={() => setMenuOpen(false)}>
              {item.label}
            </Link>
          ))}
        </div>
        <button className="nav-menu-button" onClick={() => setMenuOpen(open => !open)}>
          <FontAwesomeIcon icon={menuOpen ? faTimes : faBars} />
        </button>
      </div>
      <div className={`nav-mobile ${menuOpen ? 'open' : ''}`}>
        {navItems.map(item => (
          <Link key={item.to} to={item.to} className="nav-mobile-link" onClick={() => setMenuOpen(false)}>
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
