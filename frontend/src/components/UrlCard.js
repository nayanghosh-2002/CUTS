import React, { useState } from 'react';

const UrlCard = ({ url, onCopy }) => {
  const { originalUrl, shortId, clicks, expiryDate } = url; 

  
  const fullShortUrl = `https://cuts-mwph.onrender.com/${shortId}`; 

  const [copied, setCopied] = useState(false); 

  const handleCopy = () => {
    navigator.clipboard.writeText(fullShortUrl); 
    setCopied(true);
    setTimeout(() => setCopied(false), 1500); 
    if (onCopy) onCopy(fullShortUrl); 
  };

  return (
    <div style={styles.card}>
      <h3 style={styles.cardTitle}>URL Details</h3>
      <div style={styles.detailGroup}>
        <strong style={styles.label}>Original:</strong>
        <a href={originalUrl} target="_blank" rel="noopener noreferrer" style={styles.urlLink}>
          {originalUrl}
        </a>
      </div>

      <div style={styles.detailGroup}>
        <strong style={styles.label}>Short:</strong>
        <a href={fullShortUrl} target="_blank" rel="noopener noreferrer" style={styles.shortUrlLink}>
          {fullShortUrl}
        </a>
      </div>

      <div style={styles.detailGroup}>
        <strong style={styles.label}>Clicks:</strong>
        <span style={styles.value}>{clicks}</span>
      </div>

      {expiryDate && (
        <div style={styles.detailGroup}>
          <strong style={styles.label}>Expires:</strong>
          <span style={styles.value}>{new Date(expiryDate).toLocaleDateString()}</span>
        </div>
      )}

      <button onClick={handleCopy} style={copied ? styles.copyButtonCopied : styles.copyButton}>
        {copied ? 'Copied!' : 'Copy Short URL'}
      </button>
    </div>
  );
};

// --- Styles ---
const styles = {
  card: {
    fontFamily: 'Roboto, sans-serif',
    backgroundColor: '#ffffff', 
    padding: '25px',
    borderRadius: '12px', 
    boxShadow: '0 6px 15px rgba(0, 0, 0, 0.1)', 
    border: '1px solid #e0e0e0', 
    display: 'flex',
    flexDirection: 'column',
    gap: '15px', 
    transition: 'transform 0.2s ease-in-out', 
    
  },
  cardTitle: {
    fontSize: '1.4rem',
    color: '#34495e', 
    marginBottom: '10px',
    borderBottom: '1px solid #eceff1', 
    paddingBottom: '10px',
    textAlign: 'center',
    fontWeight: '600',
  },
  detailGroup: {
    display: 'flex',
    flexDirection: 'column', 
    alignItems: 'flex-start', 
    fontSize: '0.95rem',
  },
  label: {
    color: '#607d8b', 
    marginBottom: '5px', 
    fontWeight: 'bold',
    fontSize: '0.9rem', 
    textTransform: 'uppercase',
  },
  value: {
    color: '#263238', 
  },
  urlLink: {
    color: '#3498db', 
    textDecoration: 'none',
    wordBreak: 'break-all', 
    fontSize: '1rem',
    transition: 'color 0.3s ease',
    
  },
  shortUrlLink: {
    color: '#27ae60', 
    textDecoration: 'none',
    wordBreak: 'break-all',
    fontSize: '1.1rem', 
    fontWeight: '500',
    transition: 'color 0.3s ease',
    
  },
  copyButton: {
    padding: '10px 18px',
    backgroundColor: '#007bff', 
    color: '#fff',
    border: 'none',
    borderRadius: '8px', 
    cursor: 'pointer',
    fontSize: '0.95rem',
    fontWeight: '600',
    marginTop: '15px',
    transition: 'background-color 0.3s ease, transform 0.2s ease, box-shadow 0.3s ease',
    boxShadow: '0 2px 5px rgba(0, 123, 255, 0.2)',
    
  },
  copyButtonCopied: {
    padding: '10px 18px',
    backgroundColor: '#28a745', 
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'not-allowed', 
    fontSize: '0.95rem',
    fontWeight: '600',
    marginTop: '15px',
  },
};

export default UrlCard;