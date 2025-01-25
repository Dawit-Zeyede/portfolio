import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav
      style={{
        background: 'linear-gradient(to right, #4facfe, #00f2fe)',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '10px 20px',
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      >
        <Link
          to="/"
          style={{
            fontSize: '24px',
            fontWeight: 'bold',
            color: 'white',
            textDecoration: 'none',
          }}
        >
          Internship Platform
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          style={{
            border: 'none',
            background: 'transparent',
            color: 'white',
            fontSize: '18px',
            cursor: 'pointer',
            display: 'none',
          }}
        >
          <span style={{ fontSize: '24px' }}>&#9776;</span>
        </button>
        <div
          style={{
            display: 'flex',
            gap: '20px',
          }}
        >
          <Link
            to="/dashboard"
            style={{
              fontSize: '18px',
              color: 'white',
              textDecoration: 'none',
              padding: '8px 12px',
              borderRadius: '8px',
              transition: 'background 0.3s',
            }}
            onMouseEnter={(e) => (e.target.style.background = 'rgba(255, 255, 255, 0.2)')}
            onMouseLeave={(e) => (e.target.style.background = 'transparent')}
          >
            Dashboard
          </Link>
          <Link
            to="/chat"
            style={{
              fontSize: '18px',
              color: 'white',
              textDecoration: 'none',
              padding: '8px 12px',
              borderRadius: '8px',
              transition: 'background 0.3s',
            }}
            onMouseEnter={(e) => (e.target.style.background = 'rgba(255, 255, 255, 0.2)')}
            onMouseLeave={(e) => (e.target.style.background = 'transparent')}
          >
            Chat
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
