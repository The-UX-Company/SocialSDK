import React, { useState } from 'react';
import { login } from '../api';

const LogInBox = ({ platformId }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const handleLogin = async () => {
    try {
      const response = await login(email, password, platformId);
      console.log('Login successful:', response);
      // Handle success (e.g., storing auth tokens, redirecting)
    } catch (error) {
      console.error('Login failed');
    }
  };

  return (
    <div>
      <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
      <button onClick={handleLogin}>Log In</button>
    </div>
  );
};

export default LogInBox;