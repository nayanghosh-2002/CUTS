import React, { useState } from 'react';
import CreateUrlForm from '../components/CreateUrlForm.js'; 

const Home = () => {
  const [shortenedUrl, setShortenedUrl] = useState(null);

  const handleSuccess = (data) => {
    setShortenedUrl(`http://localhost:5000/${data.shortId}`);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Welcome to CUTS</h2>

      <CreateUrlForm onSuccess={handleSuccess} />

      
    </div>
  );
};

// --- Styles ---
const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#a1aff6ff', 
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    boxSizing: 'border-box', 
  },
  heading: {
    color: '#360164ff',
    fontSize: '2.5rem', 
    marginBottom: '2rem',
    textAlign: 'center',
    textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)', 
  },
  shortenedUrlBox: {
    marginTop: '2rem',
    padding: '20px',
    backgroundColor: '#fff', 
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', 
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    maxWidth: '500px', 
    width: '100%', 
    textAlign: 'center',
  },
  label: {
    color: '#555',
    fontSize: '1.1rem',
    marginBottom: '10px',
  },
  shortenedLink: {
    color: '#007bff', 
    fontSize: '1.2rem',
    wordBreak: 'break-all', 
    textDecoration: 'none', 
    transition: 'color 0.3s ease', 
  },
};



export default Home;