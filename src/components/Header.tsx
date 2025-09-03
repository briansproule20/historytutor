import { useEcho } from "@/context/EchoProvider";
import { useLanguage } from "@/context/LanguageContext";
import { EchoSignIn } from "@/components/EchoSignIn";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface HeaderProps {
  isDarkMode?: boolean;
  toggleDarkMode?: () => void;
}

// Icons as inline SVGs to avoid external dependencies
const MoonIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
  </svg>
);

const SunIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
  </svg>
);

const UserIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
  </svg>
);

const CreditCardIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4zM2 9v5a2 2 0 002 2h12a2 2 0 002-2V9H2zm8 2a1 1 0 000 2h.01a1 1 0 100-2H10z" clipRule="evenodd" />
  </svg>
);

const LogOutIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
  </svg>
);



export default function Header({ isDarkMode = false, toggleDarkMode }: HeaderProps) {
  const { isAuthenticated, isLoading, user, balance, signOut } = useEcho();
  const { language, setLanguage, t } = useLanguage();
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  
  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'ht', name: 'Kreyòl', flag: '🇭🇹' }
  ];
  
  return (
    <div className={`backdrop-blur-md border-b relative z-[70] ${
      isDarkMode
        ? 'bg-slate-800/30 border-slate-600/30'
        : 'bg-amber-800/20 border-amber-700/30'
    }`}>
      <div className="max-w-7xl mx-auto pr-4 pl-2 pt-4 sm:pt-6 pb-0">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 lg:gap-0">
          <div className="flex flex-col space-y-4">
            <div className="flex items-center space-x-3">
              <Link 
                href="https://litparlor.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-16 h-16 bg-gradient-to-r from-amber-600 to-orange-600 rounded-lg flex items-center justify-center overflow-hidden hover:from-amber-700 hover:to-orange-700 transition-all duration-200 transform hover:scale-105"
              >
                <Image
                  src="/favicon.ico"
                  alt="LitParlor"
                  width={36}
                  height={36}
                  className="rounded"
                />
              </Link>
              <div className="flex flex-col">
                <div className="flex items-baseline space-x-2">
                  <h1 className={`text-3xl font-bold leading-tight ${
                    isDarkMode ? 'text-slate-100' : 'text-amber-900'
                  }`}>{t('header.title')}</h1>
                  <span className={`text-sm font-medium ${
                    isDarkMode ? 'text-amber-400' : 'text-amber-600'
                  }`}>{t('header.byLitParlor')}</span>
                </div>
                <p className={`text-base font-medium ${
                  isDarkMode ? 'text-slate-300' : 'text-amber-700'
                }`}>{t('header.subtitle')}</p>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col items-end lg:items-end space-y-3 pb-2">
            {/* Top Row: Language Selection & Dark Mode Toggle */}
            <div className="flex items-center space-x-2">
              {/* Language Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                  className={`backdrop-blur-md px-3 py-2 text-xs font-medium rounded-lg transition-colors flex items-center space-x-1 ${
                    isDarkMode 
                      ? 'bg-slate-700/50 border border-slate-600/30 text-slate-200 hover:bg-slate-600/50 hover:text-slate-100'
                      : 'bg-amber-800/20 border border-amber-700/30 text-amber-900 hover:bg-amber-800/30 hover:text-amber-800'
                  }`}
                >
                  <span>{languages.find(l => l.code === language)?.flag}</span>
                  <span>{languages.find(l => l.code === language)?.code.toUpperCase()}</span>
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
                
                {isLanguageOpen && (
                  <div className={`absolute right-0 mt-1 w-32 rounded-lg shadow-lg z-[100] ${
                    isDarkMode
                      ? 'bg-slate-700 border border-slate-600'
                      : 'bg-white border border-amber-200'
                  }`}>
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setLanguage(lang.code);
                          setIsLanguageOpen(false);
                        }}
                        className={`w-full px-3 py-2 text-left text-xs font-medium flex items-center space-x-2 transition-colors ${
                          language === lang.code
                            ? isDarkMode
                              ? 'bg-slate-600 text-slate-100'
                              : 'bg-amber-100 text-amber-900'
                            : isDarkMode
                              ? 'text-slate-200 hover:bg-slate-600 hover:text-slate-100'
                              : 'text-amber-800 hover:bg-amber-50 hover:text-amber-900'
                        } ${lang === languages[0] ? 'rounded-t-lg' : ''} ${lang === languages[languages.length - 1] ? 'rounded-b-lg' : ''}`}
                      >
                        <span>{lang.flag}</span>
                        <span>{lang.name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Dark Mode Toggle */}
              {toggleDarkMode && (
                <button
                  onClick={toggleDarkMode}
                  className={`backdrop-blur-md p-2 rounded-lg transition-colors ${
                    isDarkMode 
                      ? 'bg-slate-700/50 border border-slate-600/30 text-slate-200 hover:bg-slate-600/50 hover:text-slate-100'
                      : 'bg-amber-800/20 border border-amber-700/30 text-amber-900 hover:bg-amber-800/30 hover:text-amber-800'
                  }`}
                  aria-label="Toggle dark mode"
                >
                  {isDarkMode ? <SunIcon /> : <MoonIcon />}
                </button>
              )}
            </div>
            
            {/* Echo Authentication */}
            {isLoading ? (
              <div className={`backdrop-blur-md px-4 py-2 rounded-lg ${
                isDarkMode
                  ? 'bg-slate-700/50 border border-slate-600/30 text-slate-200'
                  : 'bg-amber-50/80 border border-amber-200/50 text-amber-800'
              }`}>
                <div className={`animate-spin rounded-full h-4 w-4 border-b-2 ${
                  isDarkMode ? 'border-slate-200' : 'border-amber-800'
                }`}></div>
              </div>
            ) : isAuthenticated ? (
              <div className="flex flex-col sm:flex-row items-end sm:items-center gap-2 sm:space-x-3">
                {/* First Row: User Info + Balance */}
                <div className="flex items-center space-x-2 sm:space-x-3">
                  {/* User Info */}
                  <div className={`backdrop-blur-md px-2 sm:px-3 py-2 rounded-lg ${
                    isDarkMode
                      ? 'bg-slate-700/50 border border-slate-600/30 text-slate-200'
                      : 'bg-amber-50/80 border border-amber-200/50 text-amber-800'
                  }`}>
                    <div className="flex items-center space-x-2">
                      <UserIcon />
                      <span className="text-xs sm:text-sm font-medium truncate max-w-[100px] sm:max-w-none">{user?.name || user?.email || t('header.user')}</span>
                    </div>
                  </div>
                  
                  {/* Balance */}
                  <div className={`backdrop-blur-md px-2 sm:px-3 py-2 rounded-lg ${
                    isDarkMode
                      ? 'bg-slate-700/50 border border-slate-600/30 text-slate-200'
                      : 'bg-amber-50/80 border border-amber-200/50 text-amber-800'
                  }`}>
                    <div className="flex items-center space-x-2">
                      <CreditCardIcon />
                      <span className="text-xs sm:text-sm font-medium">
                        {balance ? (
                          typeof balance === 'number' ? 
                            `${balance.toFixed(3)} ${t('header.credits')}` : 
                            `${(balance.balance || 0).toFixed(3)} ${t('header.credits')}`
                        ) : (
                          `0.000 ${t('header.credits')}`
                        )}
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* Second Row: Echo Base + Sign Out */}
                <div className="flex items-center space-x-2 sm:space-x-3">
                  {/* Echo Base */}
                  <button 
                    onClick={() => window.open('https://echo.merit.systems', '_blank')}
                    className={`backdrop-blur-md px-2 sm:px-3 py-2 rounded-lg transition-colors text-xs sm:text-sm font-medium ${
                      isDarkMode
                        ? 'bg-slate-700/50 border border-slate-600/30 text-slate-200 hover:bg-slate-600/50 hover:text-slate-100'
                        : 'bg-amber-50/80 border border-amber-200/50 text-amber-800 hover:bg-amber-100/80 hover:text-amber-900'
                    }`}
                  >
                    {t('header.echoBase')}
                  </button>
                  
                  {/* Sign Out */}
                  <button
                    onClick={signOut}
                    className={`backdrop-blur-md px-2 sm:px-3 py-2 rounded-lg transition-colors flex items-center space-x-2 text-xs sm:text-sm font-medium ${
                      isDarkMode
                        ? 'bg-slate-700/50 border border-slate-600/30 text-slate-200 hover:bg-slate-600/50 hover:text-slate-100'
                        : 'bg-amber-50/80 border border-amber-200/50 text-amber-800 hover:bg-amber-100/80 hover:text-amber-900'
                    }`}
                  >
                    <LogOutIcon />
                    <span className="hidden sm:inline">{t('header.signOut')}</span>
                  </button>
                </div>
              </div>
            ) : (
              <EchoSignIn 
                onSuccess={(user) => console.log('Signed in:', user)}
                onError={(error) => console.error('Sign in failed:', error)}
                className={`backdrop-blur-md px-3 py-2 rounded-lg font-medium transition-colors text-sm ${
                  isDarkMode
                    ? 'bg-slate-700/50 border border-slate-600/30 text-slate-200 hover:bg-slate-600/50 hover:text-slate-100'
                    : 'bg-amber-50/80 border border-amber-200/50 text-amber-800 hover:bg-amber-100/80 hover:text-amber-900'
                }`}
              >
                {t('header.signIn')}
              </EchoSignIn>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}