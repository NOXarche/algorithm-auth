import React, { createContext, useContext, useState, useCallback } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Simulated API calls with realistic delays
const authAPI = {
  login: async (credentials) => {
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Demo credentials for testing
    if (credentials.email === 'demo@algorhythm.com' && credentials.password === 'demo123') {
      return {
        id: 1,
        name: 'Demo User',
        email: credentials.email,
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
      };
    }
    
    // Allow any email/password for demo purposes
    if (credentials.email && credentials.password) {
      return {
        id: Date.now(),
        name: credentials.email.split('@')[0],
        email: credentials.email,
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(credentials.email)}&background=a855f7&color=fff&size=150`
      };
    }
    
    throw new Error('Please enter valid credentials');
  },
  
  signup: async (userData) => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    if (!userData.name || !userData.email || !userData.password) {
      throw new Error('All fields are required');
    }
    
    if (userData.password !== userData.confirmPassword) {
      throw new Error('Passwords do not match');
    }
    
    return {
      id: Date.now(),
      name: userData.name,
      email: userData.email,
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(userData.name)}&background=a855f7&color=fff&size=150`
    };
  },
  
  socialAuth: async (provider) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
      id: Date.now(),
      name: `${provider} User`,
      email: `user@${provider.toLowerCase()}.com`,
      avatar: `https://ui-avatars.com/api/?name=${provider}+User&background=a855f7&color=fff&size=150`,
      provider
    };
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = useCallback(async (credentials) => {
    try {
      setIsLoading(true);
      setError(null);
      const userData = await authAPI.login(credentials);
      setUser(userData);
      return userData;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const signup = useCallback(async (userData) => {
    try {
      setIsLoading(true);
      setError(null);
      const newUser = await authAPI.signup(userData);
      setUser(newUser);
      return newUser;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const socialLogin = useCallback(async (provider) => {
    try {
      setIsLoading(true);
      setError(null);
      const userData = await authAPI.socialAuth(provider);
      setUser(userData);
      return userData;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setError(null);
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const value = {
    user,
    isLoading,
    error,
    login,
    signup,
    socialLogin,
    logout,
    clearError
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
