'use client';

import React, { useState, useEffect } from 'react';
import Header from "@/components/Header";
import DotBackground from "@/components/DotBackground";
import Chat from "@/components/Chat";
import { EchoProvider, useEcho } from "@/context/EchoProvider";
import { LanguageProvider } from "@/context/LanguageContext";

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
      <div className="fixed inset-0 pt-0 md:pt-[8px] pb-0 px-0 md:px-10 relative z-10">
        <div className="w-full h-full relative">
          <Chat />
          
          {/* Sign In Modal Overlay */}
          {!isAuthenticated && !isLoading && (
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
              <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-2xl max-w-md w-full mx-4 transform transition-all duration-300 scale-100">
                <div className="text-center">
                  {/* Icon */}
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Sign In Required
                  </h3>
                  
                  {/* Description */}
                  <p className="text-gray-700 mb-6 leading-relaxed text-base">
                    To access your personalized AI history tutor and start learning, please sign in with your Echo account.
                  </p>
                  
                  {/* Instructions */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                    <p className="text-blue-800 text-sm font-medium">
                      Click the "Connect" button in the header above to sign in
                    </p>
                  </div>
                  
                  {/* Additional Info */}
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <p className="text-sm text-gray-600">
                      Don&apos;t have an Echo account? 
                      <a 
                        href="https://echo.merit.systems" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-700 font-medium ml-1 transition-colors underline"
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
      <LanguageProvider>
        <HomeContent />
      </LanguageProvider>
    </EchoProvider>
  );
}
