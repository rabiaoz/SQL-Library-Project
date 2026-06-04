import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function LoginPage() {
  // Defining states to track form inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Using useNavigate hook to route between pages
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault(); // Preventing page reload

    // Simulating a fake check with the sample login credentials from the contract
    if (email === 'ali@gmail.com' && password === '123456') {
      
      // Login successful! Simulating the exact "Login Response" payload from the backend contract
      const mockLoginResponse = {
        token: "jwt_token_ali_123",
        user: {
          id: 1,
          fullName: "Ali Yilmaz",
          email: "ali@gmail.com",
          points: 25,
          role: "USER"
        }
      };

      // Saving logged in user data to the browser's local storage permanently
      localStorage.setItem('token', mockLoginResponse.token);
      localStorage.setItem('user', JSON.stringify(mockLoginResponse.user));

      setError('');
      // Automatically redirecting user to the Home Page after a successful login
      navigate('/');
    } else {
      // If credentials are wrong, show a red warning on the screen
      setError('Invalid email or password! (Hint: ali@gmail.com / 123456)');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh', fontFamily: 'sans-serif' }}>
      <div style={{ backgroundColor: '#fff', color: '#333', padding: '40px', borderRadius: '10px', width: '350px', boxShadow: '0 8px 16px rgba(0,0,0,0.2)' }}>
        <h2 style={{ textAlign: 'center', color: '#2c3e50', marginBottom: '20px' }}>🔐 Login</h2>

        {/* If there is an error message, display a red box */}
        {error && (
          <div style={{ backgroundColor: '#fde8e8', color: '#e74c3c', padding: '10px', borderRadius: '5px', marginBottom: '15px', fontSize: '0.9rem', textAlign: 'center', fontWeight: 'bold' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Email Address</label>
            <input 
              type="email" 
              required
              placeholder="ali@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', boxSizing: 'border-box' }}
            />
          </div>

          <div style={{ marginBottom: '25px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Password</label>
            <input 
              type="password" 
              required
              placeholder="******"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', boxSizing: 'border-box' }}
            />
          </div>

          <button 
            type="submit"
            style={{ width: '100%', padding: '12px', backgroundColor: '#2ecc71', color: 'white', border: 'none', borderRadius: '5px', fontSize: '1rem', fontWeight: 'bold', cursor: 'pointer' }}
          >
            Login
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '0.9rem', color: '#7f8c8d' }}>
          Don't have an account? <Link to="/register" style={{ color: '#3498db', fontWeight: 'bold', textDecoration: 'none' }}>Register</Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;