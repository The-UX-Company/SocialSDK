// SocialSDK/context/AuthContext.js
import React, { createContext, useContext, useState } from 'react';
import { login as apiLogin, logout as apiLogout } from '../api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (email, password, platformId) => {
    try {
      const userData = await apiLogin(email, password, platformId);
      setUser(userData); // Assuming the login API returns user data
      console.log('Login successful');
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await apiLogout(); // Implement corresponding API call if necessary
      setUser(null);
      console.log('Logout successful');
    } catch (error) {
      console.error('Logout failed:', error);
      throw error;
    }
  };

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
};

export default AuthContext;