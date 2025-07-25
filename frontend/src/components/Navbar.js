import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

 
  const isLoggedIn = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
    setIsMenuOpen(false); 
  };

  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768); 
    };

    checkMobile(); 
    window.addEventListener('resize', checkMobile); 

    return () => window.removeEventListener('resize', checkMobile); 
  }, []);

  const handleLinkClick = () => {
    
    if (isMobile) {
      setIsMenuOpen(false);
    }
  };

  return (
    <nav style={styles.nav}>
      <div style={styles.logo}>
        <Link to="/" style={styles.link} onClick={handleLinkClick}>
          ✂️ CUTS
        </Link>
      </div>

      
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        style={{
          ...styles.menuButton,
          
          display: isMobile ? 'block' : 'none',
        }}
        aria-expanded={isMenuOpen} 
        aria-controls="main-navigation"
      >
        {isMenuOpen ? '✕' : '☰'} 
      </button>

      <ul
        id="main-navigation"
        style={{
          ...styles.navbarNav,
          
          ...(isMobile && !isMenuOpen ? { display: 'none' } : {}),
          
          display: isMobile && isMenuOpen ? 'flex' : (isMobile ? 'none' : 'flex'),
          ...(isMobile && styles.navbarNavMobile), 
        }}
      >
        <li style={styles.navItem}>
          <Link to="/" style={styles.navLink} onClick={handleLinkClick}>
            Home
          </Link>
        </li>

        {isLoggedIn ? (
          <>
            <li style={styles.navItem}>
              <Link to="/dashboard" style={styles.navLink} onClick={handleLinkClick}>
                Dashboard
              </Link>
            </li>
            <li style={styles.navItem}>
              <button onClick={handleLogout} style={styles.logoutButton}>
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li style={styles.navItem}>
              <Link to="/login" style={styles.navLink} onClick={handleLinkClick}>
                Login
              </Link>
            </li>
            <li style={styles.navItem}>
              <Link to="/register" style={styles.navLink} onClick={handleLinkClick}>
                Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

// --- Styles ---
const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 30px', 
    backgroundColor: '#08086fff', 
    color: '#ecf0f1', 
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)', 
    flexWrap: 'wrap', 
  },
  logo: {
    fontSize: '1.8rem', 
    fontWeight: '700', 
    color: '#ceae0fff', 
    letterSpacing: '0.5px',
    transition: 'color 0.3s ease', 
  },
  link: {
    color: '#9c9b9cff', 
    textDecoration: 'none',
    
  },
  navbarNav: {
    display: 'flex', 
    listStyle: 'none',
    margin: 0,
    padding: 0,
    gap: '25px', 
    alignItems: 'center',
    transition: 'all 0.3s ease-in-out', 
  },
  navItem: {
    
  },
  navLink: {
    color: '#ecf0f1', 
    textDecoration: 'none',
    fontSize: '1.05rem',
    fontWeight: '500',
    padding: '8px 12px', 
    borderRadius: '6px',
    transition: 'background-color 0.3s ease, color 0.3s ease',
    
  },
  logoutButton: {
    background: '#e74c3c', 
    color: 'white',
    border: 'none',
    padding: '10px 18px',
    borderRadius: '6px',
    fontSize: '1.05rem',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease, transform 0.2s ease',
    
  },
  menuButton: {
    
    background: 'none',
    color: '#ecf0f1',
    fontSize: '2rem', 
    border: 'none',
    cursor: 'pointer',
    padding: '5px 10px',
  },

  
  navbarNavMobile: {
    flexDirection: 'column',
    width: '100%',
    backgroundColor: '#030d67ff', 
    position: 'absolute', 
    top: '60px', 
    left: 0,
    padding: '20px 0',
    borderTop: '1px solid rgba(255,255,255,0.1)',
    zIndex: 1000,
    boxShadow: '0 8px 15px rgba(0, 0, 0, 0.3)',
    
  },
};



export default Navbar;