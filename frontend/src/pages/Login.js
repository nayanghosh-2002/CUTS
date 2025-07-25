import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); 
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage(''); 

    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('token', data.token);
        navigate('/dashboard');
      } else {
        
        setErrorMessage(data.message || 'Login failed. Please check your credentials.');
      }
    } catch (error) {
      
      setErrorMessage('An error occurred. Please try again later.');
      console.error("Login fetch error:", error);
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleLogin} style={styles.form}>
        <h2 style={styles.heading}>Login</h2>

        {errorMessage && (
          <div style={styles.errorMessage}>
            {errorMessage}
          </div>
        )}

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
          Login
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
    backgroundColor: '#ffffff', 
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
    color: '#000f5aff', 
    fontSize: '2.2rem',
    marginBottom: '15px',
    fontWeight: '700',
  },
  input: {
    padding: '15px',
    border: '1px solid #0c2bd8ff', 
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
    boxShadow: '0 4px 10px rgba(0, 121, 107, 0.3)', 
  },
  errorMessage: {
    backgroundColor: '#ffebee', 
    color: '#d32f2f', 
    padding: '12px',
    borderRadius: '8px',
    marginBottom: '15px',
    fontSize: '0.95rem',
    textAlign: 'center',
    border: '1px solid #ef9a9a', 
  },
};



export default Login;