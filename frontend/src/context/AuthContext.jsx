import React, { createContext, useContext, useState, useEffect } from 'react';
import { loginUser, signupUser } from '../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('flavorshare_user');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('flavorshare_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('flavorshare_user');
    }
  }, [user]);

  const login = async (credentials) => {
    const result = await loginUser(credentials);
    if (result.user) {
      setUser(result.user);
    }
    return result;
  };

  const signup = async (userData) => {
    const result = await signupUser(userData);
    if (result.user) {
      setUser(result.user);
    }
    return result;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
