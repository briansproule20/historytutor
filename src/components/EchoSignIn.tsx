'use client';

import React from 'react';
import { signIn } from "@merit-systems/echo-next-sdk/client";

interface EchoSignInProps {
  onSuccess?: (user: unknown) => void;
  onError?: (error: unknown) => void;
  className?: string;
  children: React.ReactNode;
}

export const EchoSignIn: React.FC<EchoSignInProps> = ({
  onSuccess,
  onError,
  className = '',
  children
}) => {
  const handleSignIn = async () => {
    try {
      // Use actual Echo SDK sign in
      signIn();
      // Note: onSuccess callback will be handled by Echo's OAuth flow
      if (onSuccess) {
        console.log('Sign in initiated');
      }
    } catch (error) {
      console.error('Sign in failed:', error);
      if (onError) {
        onError(error);
      }
    }
  };

  return (
    <button
      onClick={handleSignIn}
      className={className}
    >
      {children}
    </button>
  );
};