// src/pages/AuthPage.jsx
import React, { useState } from 'react';
import Login from './Login';
import Register from './Register';
import './AuthStyles.css'; // Tempatkan semua CSS animasi di sini

const AuthPage = () => {
  const [activeForm, setActiveForm] = useState('login');

  const toggleForm = () => {
    setActiveForm(prev => (prev === 'login' ? 'register' : 'login'));
  };

  return (
    <section className="forms-section">
      <h1 className="section-title">Login & Signup Forms</h1>
      <div className="forms">
        <div className={`form-wrapper ${activeForm === 'login' ? 'is-active' : ''}`}>
          <Login onSwitch={toggleForm} />
        </div>
        <div className={`form-wrapper ${activeForm === 'register' ? 'is-active' : ''}`}>
          <Register onSwitch={toggleForm} />
        </div>
      </div>
    </section>
  );
};

export default AuthPage;
