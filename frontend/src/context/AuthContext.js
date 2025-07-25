import React, { createContext, useContext, useState, useEffect } from 'react';
import { getToken, isAuthenticated, logout as logoutService } from '../services/authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(isAuthenticated());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    
    const token = getToken();
    if (token) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
    setLoading(false);
  }, []);

  const login = (token) => {
    localStorage.setItem('token', token);
    setLoggedIn(true);
  };

  const logout = () => {
    logoutService();
    setLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ loggedIn, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
