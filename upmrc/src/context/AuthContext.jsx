import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as authService from '../services/authService';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => authService.getCurrentUser());
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const loginUser = async (email, password) => {
    setLoading(true);
    try {
      const data = await authService.login(email, password);
      setUser(data.user);
      navigate('/home');
      return data;
    } finally {
      setLoading(false);
    }
  };

  const signupUser = async (name, email, password) => {
    setLoading(true);
    try {
      await authService.signup(name, email, password);
      navigate('/login', { state: { message: 'Signup successful! Please login.' } });
    } finally {
      setLoading(false);
    }
  };

  const logoutUser = () => {
    authService.logout();
    setUser(null);
    navigate('/login');
  };

  const value = {
    user,
    loading,
    loginUser,
    signupUser,
    logoutUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
