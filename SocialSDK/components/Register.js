import React, { useState } from 'react';
import { registerMember } from '../api';

const RegistrationComponent = ({ platformId }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const API_KEY = process.env.REACT_APP_API_KEY;

  const handleRegister = async () => {
    try {
      // Adjusted to exclude `user_id` as it's now handled by the backend
      const response = await registerMember(name, email, password, platformId, API_KEY);
      console.log('Registration successful:', response);
      // Redirect user or show success message
    } catch (error) {
      console.error('Registration failed:', error);
      // Show error message or handle error
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <input
        type="text"
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="Name"
      />
      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button onClick={handleRegister}>Register</button>
    </div>
  );
};

export default RegistrationComponent;