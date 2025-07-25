import React, { useState } from 'react';
import { createShortUrl } from '../services/urlService.js';


const CreateUrlForm = ({ onSuccess }) => { 
  const [originalUrl, setOriginalUrl] = useState('');
  const [customAlias, setCustomAlias] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [shortUrl, setShortUrl] = useState(''); 
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setCopied(false);
    setShortUrl(''); 
    setIsLoading(true); 

    try {
      const data = await createShortUrl(originalUrl, customAlias, expiryDate);
      
      setShortUrl(data.shortUrl); 

      
      if (onSuccess) { 
        onSuccess(data); 
      }
    } catch (err) {
      setError(err?.response?.data?.error || 'Failed to create short URL. Please try again.');
    } finally {
      setIsLoading(false); 
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h4 style={styles.formTitle}>Custom links instantly</h4>
        <input
          type="url"
          placeholder="Enter original URL (e.g., https://www.example.com/very/long/path)"
          value={originalUrl}
          onChange={(e) => setOriginalUrl(e.target.value)}
          required
          style={styles.input}
        />
        <input
          type="text"
          placeholder="Custom alias (optional, e.g., my-cool-link)"
          value={customAlias}
          onChange={(e) => setCustomAlias(e.target.value)}
          style={styles.input}
        />
        <input
          type="date"
          title="Expiry date (optional)" 
          value={expiryDate}
          onChange={(e) => setExpiryDate(e.target.value)}
          style={styles.input}
        />
        <button type="submit" style={styles.button} disabled={isLoading}>
          {isLoading ? 'Shortening...' : 'Generate Short URL ✨'}
        </button>
      </form>

      {shortUrl && (
        <div style={styles.resultBox}>
          <p style={styles.resultText}>
            Your Short URL: <a href={shortUrl} target="_blank" rel="noopener noreferrer" style={styles.shortLink}>{shortUrl}</a>
          </p>
          <button onClick={handleCopy} style={copied ? styles.copyButtonCopied : styles.copyButton}>
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
      )}

      {error && <p style={styles.errorMessage}>{error}</p>}
    </div>
  );
};

// --- Styles ---
const styles = {
  container: {
    fontFamily: 'Roboto, Arial, sans-serif', 
    backgroundColor: '#ffffff', 
    padding: '30px',
    borderRadius: '12px', 
    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.7)', 
    maxWidth: '550px', 
    margin: '30px auto', 
    border: 'none', 
    boxSizing: 'border-box', 
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '18px', 
    marginBottom: '25px', 
  },
  formTitle: {
    fontSize: '1.8rem',
    color: '#3504a8ff', 
    marginBottom: '15px',
    textAlign: 'center',
    fontWeight: '600',
  },
  input: {
    padding: '14px 18px', 
    border: '1px solid #dcdcdc', 
    borderRadius: '8px', 
    fontSize: '1rem',
    width: '100%', 
    boxSizing: 'border-box', 
    transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
  },
  button: {
    padding: '14px 25px',
    backgroundColor: '#3504a8ff', 
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1.05rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease, transform 0.2s ease, box-shadow 0.3s ease',
    boxShadow: '0 4px 10px rgba(52, 152, 219, 0.3)', 
  },
  resultBox: {
    marginTop: '20px',
    padding: '18px 25px',
    backgroundColor: '#e8f6ff', 
    borderRadius: '10px',
    border: '1px solid #e2a305ff', 
    display: 'flex',
    flexDirection: 'column', 
    justifyContent: 'space-between',
    alignItems: 'flex-start', 
    gap: '15px', 
  },
  resultText: {
    margin: '0', 
    color: '#000000ff',
    fontSize: '1.2rem',
    wordBreak: 'break-all', 
  },
  shortLink: {
    color: '#3300ffff', 
    textDecoration: 'none',
    fontWeight: '500',
    transition: 'color 0.3s ease',
  },
  copyButton: {
    padding: '10px 18px',
    backgroundColor: '#2ecc71', 
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '0.95rem',
    fontWeight: 'bold',
    transition: 'background-color 0.3s ease, transform 0.2s ease',
  },
  copyButtonCopied: {
    padding: '10px 18px',
    backgroundColor: '#0f9949ff', 
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'not-allowed', 
    fontSize: '0.95rem',
    fontWeight: 'bold',
  },
  errorMessage: {
    color: '#e74c3c', 
    backgroundColor: '#ffe8e8', 
    padding: '12px',
    borderRadius: '8px',
    marginTop: '15px',
    textAlign: 'center',
    border: '1px solid #f0b5b5',
    fontSize: '0.95rem',
  },
};



export default CreateUrlForm;