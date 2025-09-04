'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string) => string;
  fontSize: 'small' | 'medium' | 'large';
  setFontSize: (size: 'small' | 'medium' | 'large') => void;
  getFontSizeClasses: () => { message: string; ui: string };
}

interface LanguageProviderProps {
  children: ReactNode;
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: (key: string) => key,
  fontSize: 'small',
  setFontSize: () => {},
  getFontSizeClasses: () => ({ message: 'text-sm', ui: 'text-xs' }),
});

const translations = {
  en: {
    // Header
    'header.title': 'History Tutor',
    'header.subtitle': 'AI-Powered Historical Context & Perspective Explorer',
    'header.byLitParlor': 'By LitParlor',
    'header.signIn': 'Sign In to Echo',
    'header.signOut': 'Sign Out',
    'header.echoBase': 'Echo Base',
    'header.credits': 'credits',
    'header.newChat': 'New Chat',
    'header.user': 'User',
    
    // Chat
    'chat.placeholder': 'Ask about history...',
    'chat.send': 'Send',
    'chat.sending': 'Sending...',
    'chat.thinking': 'Thinking...',
    'chat.you': 'You',
    'chat.tutor': 'History Tutor',
    'chat.startConversation': 'Start a conversation about history!',
    
    // Smart Suggestions
    'suggestions.title': 'Further Inquiry',
    'suggestions.subtitle': 'Click any suggestion to explore',
    
    // Sign In Modal
    'signIn.title': 'Sign In to Chat',
    'signIn.description': 'To access your personalized AI tutor and start learning, please sign in with your Echo account.',
    'signIn.button': 'Sign In with Echo',
    'signIn.noAccount': "Don't have an account?",
    'signIn.createAccount': 'Create one here',
    
    // Welcome message
    'welcome.greeting': 'Hello! I\'m your History Tutor. I can help you with:',
    'welcome.bullet1': 'Exploring historical events, people, and time periods',
    'welcome.bullet2': 'Understanding cause and effect in history',
    'welcome.bullet3': 'Analyzing different historical perspectives',
    'welcome.bullet4': 'Connecting past events to modern times',
    'welcome.bullet5': 'Preparing for history exams and assignments',
    'welcome.callToAction': 'What would you like to learn about today?',
    
    // Default suggestions
    'suggestion.default1': 'What historical period should we explore first?',
    'suggestion.default2': 'Can we talk about a famous historical figure?',
    'suggestion.default3': 'How did ancient civilizations start?',
    'suggestion.default4': 'What were the biggest wars in history?',
    'suggestion.default5': 'How do empires usually collapse?',
    'suggestion.default6': 'What inventions changed the world the most?',
  },
  es: {
    // Header
    'header.title': 'History Tutor',
    'header.subtitle': 'Explorador de Contexto y Perspectiva Histórica con IA',
    'header.byLitParlor': 'Por LitParlor',
    'header.signIn': 'Iniciar Sesión en Echo',
    'header.signOut': 'Cerrar Sesión',
    'header.echoBase': 'Base Echo',
    'header.credits': 'créditos',
    'header.newChat': 'Nuevo Chat',
    'header.user': 'Usuario',
    
    // Chat
    'chat.placeholder': 'Pregunta sobre historia...',
    'chat.send': 'Enviar',
    'chat.sending': 'Enviando...',
    'chat.thinking': 'Pensando...',
    'chat.you': 'Tú',
    'chat.tutor': 'History Tutor',
    'chat.startConversation': '¡Inicia una conversación sobre historia!',
    
    // Smart Suggestions
    'suggestions.title': 'Investigación Adicional',
    'suggestions.subtitle': 'Haz clic en cualquier sugerencia para explorar',
    
    // Sign In Modal
    'signIn.title': 'Inicia Sesión para Chatear',
    'signIn.description': 'Para acceder a tu tutor de IA personalizado y comenzar a aprender, inicia sesión con tu cuenta de Echo.',
    'signIn.button': 'Iniciar Sesión con Echo',
    'signIn.noAccount': '¿No tienes una cuenta?',
    'signIn.createAccount': 'Crea una aquí',
    
    // Welcome message
    'welcome.greeting': '¡Hola! Soy tu tutor de historia. Puedo ayudarte con:',
    'welcome.bullet1': 'Explorar eventos históricos, personas y períodos de tiempo',
    'welcome.bullet2': 'Entender causa y efecto en la historia',
    'welcome.bullet3': 'Analizar diferentes perspectivas históricas',
    'welcome.bullet4': 'Conectar eventos pasados con los tiempos modernos',
    'welcome.bullet5': 'Prepararte para exámenes y tareas de historia',
    'welcome.callToAction': '¿Qué te gustaría aprender hoy?',
    
    // Default suggestions
    'suggestion.default1': '¿Qué período histórico deberíamos explorar primero?',
    'suggestion.default2': '¿Podemos hablar de una figura histórica famosa?',
    'suggestion.default3': '¿Cómo comenzaron las civilizaciones antiguas?',
    'suggestion.default4': '¿Cuáles fueron las guerras más grandes de la historia?',
    'suggestion.default5': '¿Cómo colapsan normalmente los imperios?',
    'suggestion.default6': '¿Qué inventos cambiaron más el mundo?',
  },
  ht: {
    // Header
    'header.title': 'History Tutor',
    'header.subtitle': 'Eksplorè Kontèks ak Pèspektiv Istorik ak AI',
    'header.byLitParlor': 'Pa LitParlor',
    'header.signIn': 'Konekte nan Echo',
    'header.signOut': 'Dekonekte',
    'header.echoBase': 'Baz Echo',
    'header.credits': 'kredi yo',
    'header.newChat': 'Nouvo Chat',
    'header.user': 'Itilizatè',
    
    // Chat
    'chat.placeholder': 'Mande sou istwa...',
    'chat.send': 'Voye',
    'chat.sending': 'K ap voye...',
    'chat.thinking': 'K ap reflechi...',
    'chat.you': 'Ou',
    'chat.tutor': 'History Tutor',
    'chat.startConversation': 'Kòmanse yon konvèsasyon sou istwa!',
    
    // Smart Suggestions
    'suggestions.title': 'Rechèch Adisyonèl',
    'suggestions.subtitle': 'Klike sou nenpòt sijesyon pou eksplore',
    
    // Sign In Modal
    'signIn.title': 'Konekte pou Chat',
    'signIn.description': 'Pou aksè nan pwofesè AI pèsonèl ou a epi kòmanse aprann, tanpri konekte ak kont Echo ou a.',
    'signIn.button': 'Konekte ak Echo',
    'signIn.noAccount': 'Ou pa gen yon kont?',
    'signIn.createAccount': 'Kreye youn isit la',
    
    // Welcome message
    'welcome.greeting': 'Bonjou! Mwen se pwofesè istwa ou an. Mwen ka ede ou ak:',
    'welcome.bullet1': 'Eksplore evenman istorik yo, moun yo, ak pèyòd tan yo',
    'welcome.bullet2': 'Konprann koz ak konsekans nan istwa',
    'welcome.bullet3': 'Analize diferan pèspektiv istorik yo',
    'welcome.bullet4': 'Konekte evenman nan tan lontan ak jodi a',
    'welcome.bullet5': 'Prepare pou egzamen ak travay istwa yo',
    'welcome.callToAction': 'Kisa ou ta renmen aprann jodi a?',
    
    // Default suggestions
    'suggestion.default1': 'Ki pèyòd istorik nou ta dwe eksplore premye a?',
    'suggestion.default2': 'Èske nou ka pale de yon figi istorik ki gen anpil reputasyon?',
    'suggestion.default3': 'Ki jan sivilizasyon yo nan tan lontan yo te kòmanse?',
    'suggestion.default4': 'Ki gè yo ki te pi gwo nan istwa a?',
    'suggestion.default5': 'Ki jan anpi yo konn tonbe nòmalman?',
    'suggestion.default6': 'Ki enventè yo ki te chanje mond lan pi plis?',
  },
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState('en');
  const [fontSize, setFontSize] = useState<'small' | 'medium' | 'large'>('small');

  useEffect(() => {
    const saved = localStorage.getItem('preferred-language');
    if (saved && ['en', 'es', 'ht'].includes(saved)) {
      setLanguage(saved);
    }
    
    const savedFontSize = localStorage.getItem('preferred-font-size');
    if (savedFontSize && ['small', 'medium', 'large'].includes(savedFontSize)) {
      setFontSize(savedFontSize as 'small' | 'medium' | 'large');
    }
  }, []);

  const handleSetLanguage = (lang: string) => {
    setLanguage(lang);
    localStorage.setItem('preferred-language', lang);
  };
  
  const handleSetFontSize = (size: 'small' | 'medium' | 'large') => {
    setFontSize(size);
    localStorage.setItem('preferred-font-size', size);
  };
  
  const getFontSizeClasses = () => {
    switch (fontSize) {
      case 'small':
        return { message: 'text-sm', ui: 'text-xs' };
      case 'medium':
        return { message: 'text-base', ui: 'text-sm' };
      case 'large':
        return { message: 'text-lg', ui: 'text-base' };
      default:
        return { message: 'text-sm', ui: 'text-xs' };
    }
  };

  const t = (key: string): string => {
    const translation = translations[language as keyof typeof translations];
    return translation?.[key as keyof typeof translation] || key;
  };

  return (
    <LanguageContext.Provider value={{ 
      language, 
      setLanguage: handleSetLanguage, 
      t, 
      fontSize, 
      setFontSize: handleSetFontSize,
      getFontSizeClasses 
    }}>
      {children}
    </LanguageContext.Provider>
  );
};