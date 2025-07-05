import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignupPage.css';  

function SignupPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match!');
      return;
    }

    const signupData = { username, email, password };

    try {
      const response = await fetch('https://newzback-1.onrender.com/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(signupData),
      });

      if (response.ok) {
        alert('Signup successful!');
        navigate('/login'); // Redirect to login page after successful signup
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || 'Signup failed!');
      }
    } catch (error) {
      setErrorMessage('An error occurred while signing up.');
      console.error('Signup error:', error);
    }
  };

  return (
    <section className="signup-page">
      <form onSubmit={handleSignup}>
        <h1>Sign Up</h1>

        {errorMessage && <div className="text-center redText">{errorMessage}</div>}

        <div className="inputbox">
          <input
            type="text"
            id="username"
            name="username"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Name"
          />
          <label htmlFor="username">Name</label>
        </div>

        <div className="inputbox">
          <input
            type="email"
            id="email"
            name="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <label htmlFor="email">Email</label>
        </div>

        <div className="inputbox">
          <input
            type="password"
            id="password"
            name="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <label htmlFor="password">Password</label>
        </div>

        <div className="inputbox">
          <input
            type="password"
            id="passwordcon"
            name="passwordcon"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
          />
          <label htmlFor="passwordcon">Confirm Password</label>
        </div>

        <button type="submit">Sign Up</button>

        <div className="register">
          <p>Already have an account? <a href="/login">Log In</a></p>
        </div>
      </form>
    </section>
  );
}

export default SignupPage;
