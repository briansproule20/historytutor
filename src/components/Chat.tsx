"use client";

import { useState, useEffect, useCallback } from "react";
import { useChat } from "@ai-sdk/react";
import ReactMarkdown from 'react-markdown';

export default function Chat() {
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isGeneratingSuggestions, setIsGeneratingSuggestions] = useState(false);
  const { messages, sendMessage, status } = useChat();

  const isLoading = status === 'streaming' || status === 'submitted';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      sendMessage({ text: input });
      setInput("");
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    if (!isLoading) {
      setInput(suggestion);
    }
  };

  const generateSmartSuggestions = useCallback(async (conversationHistory: unknown[]) => {
    if (isGeneratingSuggestions) return;
    
    setIsGeneratingSuggestions(true);
    
    try {
      const response = await fetch('/api/suggestions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages: conversationHistory }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate suggestions');
      }

      const data = await response.json();
      setSuggestions(data.suggestions || []);
    } catch (error) {
      console.error('Error generating suggestions:', error);
      // Fallback to default suggestions only on error
      setSuggestions([
        "What historical period should we explore first?",
        "Can we talk about a famous historical figure?", 
        "How did ancient civilizations start?",
        "What were the biggest wars in history?",
        "How do empires usually collapse?",
        "What inventions changed the world the most?"
      ]);
    } finally {
      setIsGeneratingSuggestions(false);
    }
  }, [isGeneratingSuggestions]);

  useEffect(() => {
    // Set initial suggestions when no conversation exists
    if (messages.length === 0 && suggestions.length === 0) {
      setSuggestions([
        "What historical period should we explore first?",
        "Can we talk about a famous historical figure?", 
        "How did ancient civilizations start?",
        "What were the biggest wars in history?",
        "How do empires usually collapse?",
        "What inventions changed the world the most?"
      ]);
    }
  }, [messages, suggestions.length]);

  useEffect(() => {
    // Only generate suggestions after LLM finishes streaming 
    if (status !== 'streaming' && status !== 'submitted' && messages.length >= 2) {
      const lastMessage = messages[messages.length - 1];
      const secondLastMessage = messages[messages.length - 2];
      
      // Only generate if the last message is from assistant and the one before is from user
      if (lastMessage.role === 'assistant' && secondLastMessage.role === 'user' && !isGeneratingSuggestions) {
        generateSmartSuggestions(messages);
      }
    }
  }, [status, messages, generateSmartSuggestions, isGeneratingSuggestions]);

  return (
    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-2xl h-[80vh] min-h-[720px] w-full overflow-hidden relative">
      <div className="bg-white dark:bg-gray-800 w-full h-full flex">
        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              HistoryTutor Chat
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Ask me anything about history!
            </p>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 ? (
              <div className="text-center text-gray-500 dark:text-gray-400 py-8">
                Start a conversation about history!
              </div>
            ) : (
              messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-xs lg:max-w-2xl px-4 py-3 rounded-lg ${
                      message.role === "user"
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white"
                    }`}
                  >
                    {message.role === "user" ? (
                      <div className="text-sm whitespace-pre-wrap">
                        {message.parts
                          .filter((part) => part.type === 'text')
                          .map((part) => part.text)
                          .join('')}
                      </div>
                    ) : (
                      <div className="text-sm markdown-content">
                        <ReactMarkdown
                          components={{
                          h1: ({children}) => <h1 className="text-lg font-bold text-gray-900 dark:text-white mb-2 mt-4">{children}</h1>,
                          h2: ({children}) => <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-2 mt-3">{children}</h2>,
                          h3: ({children}) => <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-1 mt-2">{children}</h3>,
                          p: ({children}) => <p className="text-gray-900 dark:text-white mb-2">{children}</p>,
                          strong: ({children}) => <strong className="font-semibold text-gray-900 dark:text-white">{children}</strong>,
                          em: ({children}) => <em className="italic text-gray-700 dark:text-gray-300">{children}</em>,
                          code: ({children}) => <code className="px-1 py-0.5 text-xs bg-gray-100 dark:bg-gray-800 text-blue-600 dark:text-blue-400 rounded">{children}</code>,
                          pre: ({children}) => <pre className="p-2 bg-gray-100 dark:bg-gray-800 rounded text-xs overflow-x-auto mb-2">{children}</pre>,
                          blockquote: ({children}) => <blockquote className="border-l-4 border-gray-300 dark:border-gray-600 pl-3 text-gray-700 dark:text-gray-300 italic mb-2">{children}</blockquote>,
                          ul: ({children}) => <ul className="list-disc pl-4 mb-2 text-gray-900 dark:text-white">{children}</ul>,
                          ol: ({children}) => <ol className="list-decimal pl-4 mb-2 text-gray-900 dark:text-white">{children}</ol>,
                          li: ({children}) => <li className="mb-1 ml-1">{children}</li>,
                          a: ({children, href}) => <a href={href} className="text-blue-600 dark:text-blue-400 underline hover:text-blue-800 dark:hover:text-blue-300">{children}</a>
                          }}
                        >
                          {message.parts
                            .filter((part) => part.type === 'text')
                            .map((part) => part.text)
                            .join('')}
                        </ReactMarkdown>
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white px-4 py-2 rounded-lg">
                  <div className="text-sm">Thinking...</div>
                </div>
              </div>
            )}
          </div>
          
          <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200 dark:border-gray-700 flex-shrink-0">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about history..."
                className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Sending..." : "Send"}
              </button>
            </div>
          </form>
        </div>

        {/* Smart Suggestions Sidebar */}
        <div className="w-80 border-l border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 flex flex-col">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Smart Suggestions
              </h3>
              <button
                onClick={() => window.location.reload()}
                className="px-3 py-1.5 text-xs bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-md hover:bg-blue-50 dark:hover:bg-gray-700 hover:border-blue-300 dark:hover:border-blue-500 text-gray-700 dark:text-gray-300 hover:text-blue-700 dark:hover:text-blue-300 transition-all duration-200"
              >
                New Chat
              </button>
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              Click any suggestion to explore
            </p>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-2">
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  disabled={isLoading}
                  className="w-full text-left p-3 text-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-700 hover:border-blue-300 dark:hover:border-blue-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed group"
                >
                  <div className="text-gray-900 dark:text-white group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors">
                    {suggestion}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
