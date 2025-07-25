import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/routes';
import Navbar from './components/Navbar';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <main className="app-container">
          <AppRoutes />
        </main>
      </Router>
    </AuthProvider>
  );
}

export default App;
