import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import TouristPlacesPage from './pages/TouristPlacesPage';
import ContactPage from './pages/Contactpage';   // <-- import ContactPage

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/places" element={<TouristPlacesPage />} />
        <Route path="/contact" element={<ContactPage />} />   {/* new route */}
      </Routes>
    </Router>
  );
}

export default App;
