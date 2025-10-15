import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const loginData = { email, password };

    try {
      const response = await fetch('https://newzback-2.onrender.com/auth/signing', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('jwt', data.jwt);
        navigate('/home'); // ✅ Redirect to Home.jsx after login
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || 'Login failed');
      }
    } catch (error) {
      setErrorMessage('An error occurred while logging in.');
      console.error('Login error:', error);
    }
  };

  return (
    <div className="love"> 
      {/* Fullscreen Background Video */}
      <video autoPlay loop muted className="background-video">
        <source src="/video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <section className="login-page">
        <form onSubmit={handleLogin}>
          <h1>Login</h1>
          {errorMessage && <p className="error-message">{errorMessage}</p>}

          <div className="inputbox">
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder=" "
            />
            <label htmlFor="email">Email</label>
          </div>

          <div className="inputbox">
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder=" "
            />
            <label htmlFor="password">Password</label>
          </div>

          <button type="submit">Log in</button>

          <div className="register">
            <p>
              Don't have an account? <a href="/signup">Register</a>
            </p>
          </div>
        </form>
      </section>
    </div>
  );
}

export default LoginPage;
