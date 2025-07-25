import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(''); 
  const [isError, setIsError] = useState(false); 
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage(''); 
    setIsError(false); 

    try {
      const res = await fetch('https://cuts-mwph.onrender.com/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage('Registered successfully! Please log in now.');
        setIsError(false); 
        
        setTimeout(() => {
          navigate('/login');
        }, 2000); 
      } else {
        setMessage(data.message || 'Registration failed. Please try again.');
        setIsError(true); 
      }
    } catch (error) {
      setMessage('An unexpected error occurred. Please try again later.');
      setIsError(true);
      console.error("Registration fetch error:", error);
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleRegister} style={styles.form}>
        <h2 style={styles.heading}>Register</h2>

        {message && (
          <div style={isError ? styles.errorMessage : styles.successMessage}>
            {message}
          </div>
        )}

        <input
          type="text" 
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          style={styles.input}
        />
        <input
          type="email" 
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={styles.input}
        />
        <button type="submit" style={styles.button}>
          Register
        </button>
      </form>
    </div>
  );
};

// --- Styles ---
const styles = {
  container: {
    fontFamily: 'Inter, sans-serif',
    backgroundColor: '#a1aff6ff', 
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    boxSizing: 'border-box',
  },
  form: {
    backgroundColor: '#ffffffff',
    padding: '40px',
    borderRadius: '15px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    maxWidth: '400px',
    width: '100%',
    textAlign: 'center',
  },
  heading: {
    color: '#043d77ff', 
    fontSize: '2.2rem',
    marginBottom: '15px',
    fontWeight: '700',
  },
  input: {
    padding: '15px',
    border: '1px solid #90caf9', 
    borderRadius: '10px',
    fontSize: '1rem',
    width: 'calc(100% - 30px)',
    boxSizing: 'border-box',
    transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
  },
  button: {
    backgroundColor: '#3504a8ff', 
    color: '#ffffff',
    padding: '15px 25px',
    borderRadius: '10px',
    border: 'none',
    fontSize: '1.1rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease, transform 0.2s ease',
    boxShadow: '0 4px 10px rgba(33, 150, 243, 0.3)', 
  },
  errorMessage: {
    backgroundColor: '#ffcdd2', 
    color: '#c62828', 
    padding: '12px',
    borderRadius: '8px',
    marginBottom: '15px',
    fontSize: '0.95rem',
    textAlign: 'center',
    border: '1px solid #ef5350', 
  },
  successMessage: {
    backgroundColor: '#c8e6c9', 
    color: '#2e7d32', 
    padding: '12px',
    borderRadius: '8px',
    marginBottom: '15px',
    fontSize: '0.95rem',
    textAlign: 'center',
    border: '1px solid #66bb6a', 
  }
};



export default Register;