import React from 'react';

const Footer = () => {
  return (
    <footer
      style={{
        background: 'linear-gradient(to right, #4facfe, #00f2fe)',
        color: 'white',
        textAlign: 'center',
        padding: '20px 0',
        boxShadow: '0 -4px 10px rgba(0, 0, 0, 0.1)',
        position: 'relative',
        bottom: 0,
        width: '100%',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
        <p style={{ margin: '0', fontSize: '16px', fontWeight: '500' }}>
          &copy; {new Date().getFullYear()} Internship Platform. All rights reserved.
        </p>
        <small style={{ display: 'block', marginTop: '10px', fontSize: '14px' }}>
          Built with <span style={{ color: 'red', fontSize: '18px' }}>❤️</span> by{' '}
          <a
            href="https://www.linkedin.com/in/dawit-zeyede10/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: 'white',
              textDecoration: 'none',
              fontWeight: 'bold',
              borderBottom: '2px solid rgba(255, 255, 255, 0.6)',
              transition: 'border-color 0.3s',
            }}
            onMouseEnter={(e) => (e.target.style.borderColor = 'white')}
            onMouseLeave={(e) => (e.target.style.borderColor = 'rgba(255, 255, 255, 0.6)')}
          >
            Dawit Zeyede
          </a>
        </small>
      </div>
    </footer>
  );
};

export default Footer;

