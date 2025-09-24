'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { signIn as echoSignIn } from '@merit-systems/echo-next-sdk/client';

interface User {
  name?: string;
  email?: string;
  id?: string;
  image?: string;
}

interface Balance {
  balance?: number;
}

export interface EchoContextValue {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
  balance: Balance | number | null;
  signIn: () => void;
  signOut: () => void;
  freeTierBalance?: {
    userSpendInfo: {
      amountLeft: number;
    };
  };
  createPaymentLink?: (amount: number) => Promise<string>;
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

const EchoContext = createContext<EchoContextValue>({
  isAuthenticated: false,
  isLoading: true,
  user: null,
  balance: null,
  signIn: () => {},
  signOut: () => {},
  freeTierBalance: null,
  createPaymentLink: async () => '',
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
        
        if (isSignedIn && userData && userData.id && userData.email) {
          // Only consider authenticated if we have valid user data with ID and email
          setUser(userData);
          // Format balance to match what Echo components expect
          setBalance({
            balance: typeof userData.balance === 'number' ? userData.balance : (userData.balance?.balance || 0)
          });
          setIsAuthenticated(true);
        } else {
          // If we don't have proper user data, treat as not authenticated
          setUser(null);
          setBalance(null);
          setIsAuthenticated(false);
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

  const signIn = () => {
    echoSignIn();
  };

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

  const createPaymentLink = async (amount: number): Promise<string> => {
    // This would typically call an API to create a payment link
    // For now, return a placeholder
    return `https://echo.merit.systems/payment?amount=${amount}`;
  };

  const value: EchoContextValue = {
    isAuthenticated,
    isLoading,
    user,
    balance,
    signIn,
    signOut,
    freeTierBalance: null,
    createPaymentLink,
  };

  return (
    <EchoContext.Provider value={value}>
      {children}
    </EchoContext.Provider>
  );
};