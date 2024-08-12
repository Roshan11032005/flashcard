import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from './AuthContext'; // Import useAuth from your AuthContext
import "./Login.css"
export function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth(); // Destructure the login function from useAuth

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!username || !password) {
      setError('Both fields are required.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8800/login', { username, password });
      console.log('Login successful:', response.data);
      setError('');

      // Assuming the response contains the necessary auth details like token
      login(response.data); // Set authentication state in your context
      navigate('/admin'); // Redirect to the admin page after successful login
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setError('Invalid username or password.');
      } else {
        setError('An error occurred. Please try again.');
      }
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <div className="signup-link">
        <p>Don't have an account?</p>
        <Link to="/signup">
          <button type="button">Signup</button>
        </Link>
      </div>
    </div>
  );
}
