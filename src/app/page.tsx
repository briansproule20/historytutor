'use client';

import React, { useState, useEffect } from 'react';
import Header from "@/components/Header";
import DotBackground from "@/components/DotBackground";
import Chat from "@/components/Chat";
import { EchoProvider, useEcho } from "@/context/EchoProvider";
import { EchoSignIn } from "@/components/EchoSignIn";

function HomeContent() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { isAuthenticated, isLoading } = useEcho();

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  if (!mounted) {
    return (
      <div className={`min-h-screen flex items-start justify-center py-8 ${
        isDarkMode 
          ? 'bg-gradient-to-br from-slate-900 via-gray-900 to-zinc-900'
          : 'bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-100'
      }`}>
        <div className="text-center w-full">
          <div className={`animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4 ${
            isDarkMode ? 'border-slate-200' : 'border-amber-800'
          }`}></div>
          <p className={`text-lg ${
            isDarkMode ? 'text-slate-200' : 'text-amber-800'
          }`}>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen overflow-visible relative ${
      isDarkMode 
        ? 'bg-gradient-to-br from-slate-900 via-gray-900 to-zinc-900'
        : 'bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-100'
    }`}>
      <DotBackground isDarkMode={isDarkMode} />
      
      <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />

      {/* Interactive Chat Section - Full Viewport */}
      <div className="fixed inset-0 pt-[8px] pb-0 px-10 relative z-10">
        <div className="w-full h-full relative">
          <Chat />
          
          {/* Sign In Modal Overlay */}
          {!isAuthenticated && !isLoading && (
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
              <div className="bg-white/95 backdrop-blur-md border border-white/30 rounded-2xl p-8 shadow-2xl max-w-md w-full mx-4 transform transition-all duration-300 scale-100">
                <div className="text-center">
                  {/* Icon */}
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    Sign In to Chat
                  </h3>
                  
                  {/* Description */}
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    To access your personalized AI tutor and start learning, please sign in with your Echo account.
                  </p>
                  
                  {/* Sign In Button */}
                  <EchoSignIn 
                    onSuccess={(user) => console.log('Signed in:', user)}
                    onError={(error) => console.error('Sign in failed:', error)}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    <div className="flex items-center justify-center space-x-2">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>Sign In with Echo</span>
                    </div>
                  </EchoSignIn>
                  
                  {/* Additional Info */}
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <p className="text-sm text-gray-500">
                      Don&apos;t have an account? 
                      <a 
                        href="https://echo.merit.systems" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-700 font-medium ml-1 transition-colors"
                      >
                        Create one here
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>


    </div>
  );
}

export default function Home() {
  const echoConfig = {
    appId: process.env.NEXT_PUBLIC_ECHO_APP_ID || '',
    clientId: process.env.NEXT_PUBLIC_ECHO_APP_ID || '',
    apiUrl: 'https://echo.merit.systems',
    redirectUri: '', // Echo SDK handles this automatically
  };

  // Debug Echo configuration
  console.log('Echo Config:', {
    appId: echoConfig.appId,
    hasAppId: !!echoConfig.appId,
  });

  return (
    <EchoProvider config={echoConfig}>
      <HomeContent />
    </EchoProvider>
  );
}
