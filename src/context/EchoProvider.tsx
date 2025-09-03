'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface User {
  name?: string;
  email?: string;
  id?: string;
}

interface Balance {
  balance?: number;
}

interface EchoContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
  balance: Balance | number | null;
  signOut: () => void;
}

interface EchoConfig {
  appId: string;
  clientId: string;
  apiUrl: string;
  redirectUri: string;
}

interface EchoProviderProps {
  config: EchoConfig;
  children: ReactNode;
}

const EchoContext = createContext<EchoContextType>({
  isAuthenticated: false,
  isLoading: true,
  user: null,
  balance: null,
  signOut: () => {},
});

export const useEcho = () => {
  const context = useContext(EchoContext);
  if (!context) {
    throw new Error('useEcho must be used within an EchoProvider');
  }
  return context;
};

export const EchoProvider: React.FC<EchoProviderProps> = ({ config, children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [balance, setBalance] = useState<Balance | number | null>(null);

  const checkAuth = async () => {
    try {
      // Check if user is signed in via our API route
      const response = await fetch('/api/echo/check-auth');
      if (response.ok) {
        const { isSignedIn, user: userData } = await response.json();
        setIsAuthenticated(isSignedIn);
        
        if (isSignedIn && userData) {
          setUser(userData);
          // Use the real balance from the API response
          setBalance(userData.balance);
        } else {
          setUser(null);
          setBalance(null);
        }
      } else {
        setIsAuthenticated(false);
        setUser(null);
        setBalance(null);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      setIsAuthenticated(false);
      setUser(null);
      setBalance(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, [config]);

  const signOut = async () => {
    try {
      // Call sign out endpoint to clear cookies
      await fetch('/api/echo/signout', { method: 'POST' });
      setIsAuthenticated(false);
      setUser(null);
      setBalance(null);
    } catch (error) {
      console.error('Sign out failed:', error);
      // Still clear local state even if API call fails
      setIsAuthenticated(false);
      setUser(null);
      setBalance(null);
    }
  };

  const value: EchoContextType = {
    isAuthenticated,
    isLoading,
    user,
    balance,
    signOut,
  };

  return (
    <EchoContext.Provider value={value}>
      {children}
    </EchoContext.Provider>
  );
};