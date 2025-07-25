import React, { useEffect, useState } from 'react';
import UrlCard from '../components/UrlCard';

const Dashboard = () => {
  const [urls, setUrls] = useState([]);

  useEffect(() => {
    const fetchUrls = async () => {
      try {
        const res = await fetch('https://cuts-j78n.onrender.com/api/url/all', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        const data = await res.json();
        console.log("Fetched URLs:", data); 

        if (!res.ok) {
          throw new Error(data.message || 'Failed to fetch URLs');
        }

        
        setUrls(data);
      } catch (error) {
        console.error("Dashboard fetch error:", error.message);
      }
    };

    fetchUrls();
  }, []); 

  return (
    <div style={styles.dashboardContainer}>
      <h2 style={styles.heading}>Your URLs</h2>

      {urls.length === 0 ? (
        <p style={styles.noUrlsMessage}>No URLs found. Start by creating one!</p>
      ) : (
        <div style={styles.urlCardsGrid}>
          {urls.map((url) => (
            <UrlCard key={url._id} url={url} />
          ))}
        </div>
      )}
    </div>
  );
};

// --- Styles ---
const styles = {
  dashboardContainer: {
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#a1aff6ff', 
    minHeight: 'calc(100vh - 60px)', 
    padding: '30px 20px', 
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center', 
  },
  heading: {
    color: '#333',
    fontSize: '2.2rem',
    marginBottom: '2rem',
    textAlign: 'center',
    fontWeight: '600',
  },
  noUrlsMessage: {
    color: '#666',
    fontSize: '1.1rem',
    textAlign: 'center',
    marginTop: '30px',
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
  },
  urlCardsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
    gap: '20px', 
    width: '100%',
    maxWidth: '1200px', 
    justifyContent: 'center', 
    padding: '0 10px', 
  },
  
};

export default Dashboard;
