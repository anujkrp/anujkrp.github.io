import React, { useState, useEffect, useRef } from "react";
import { MessageSquare, X, Send, Bot, User, CornerDownLeft, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

const QUICK_SUGGESTIONS = [
  "What are your pricing tiers?",
  "How long does a web project take?",
  "Tell me about Anuj Kumar (AK)",
  "How can I book a discovery call?",
  "Can you integrate AI into my CRM?"
];

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content: "Hello! I am **AK Smart Assistant**, your interactive guide to AK Design Studio. How can I help you transform your digital ideas into high-performance solutions today?"
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  // Alert user after 5 seconds to prompt interaction
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isOpen && messages.length === 1) {
        setUnreadCount(1);
      }
    }, 5000);
    return () => clearTimeout(timer);
  }, [isOpen, messages]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const newMessages: ChatMessage[] = [...messages, { role: "user", content: text }];
    setMessages(newMessages);
    setInputValue("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });

      if (!response.ok) {
        throw new Error("Failed to communicate with assistant");
      }

      const data = await response.json();
      setMessages([...newMessages, { role: "assistant", content: data.reply }]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages([
        ...newMessages,
        {
          role: "assistant",
          content: "I apologize, but I encountered a network interruption. Please check your connection or book a direct consultation using the live calendar below! Anuj Kumar is always ready to guide you."
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setUnreadCount(0);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {/* Floating Launcher Button */}
      <motion.button
        id="chatbot-launcher-btn"
        onClick={handleToggle}
        className="relative group bg-gradient-to-tr from-teal-500 to-blue-600 text-white p-4 rounded-full shadow-2xl flex items-center justify-center cursor-pointer transition-all hover:scale-105 active:scale-95 focus:outline-none glow-teal border border-teal-400/20"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageSquare className="h-6 w-6" />}
        
        {/* Unread dot */}
        {!isOpen && unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 flex h-5 w-5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-5 w-5 bg-orange-500 text-[10px] text-white font-bold items-center justify-center">
              1
            </span>
          </span>
        )}

        {/* Floating suggestion tooltip */}
        {!isOpen && unreadCount > 0 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="absolute right-16 top-1 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 text-xs px-3 py-1.5 rounded-lg shadow-xl whitespace-nowrap border border-teal-500/20 pointer-events-none"
          >
            <span className="flex items-center gap-1">
              <Sparkles className="h-3 w-3 text-teal-400 animate-pulse" /> Ask AK Smart Assistant!
            </span>
          </motion.div>
        )}
      </motion.button>

      {/* Chat Window Container */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="chatbot-window"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: "spring", damping: 25, stiffness: 350 }}
            className="absolute bottom-20 right-0 w-[92vw] sm:w-[400px] h-[520px] rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-slate-200 dark:border-slate-800 glass-light dark:glass-dark"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-slate-900 to-slate-800 p-4 text-white flex items-center justify-between border-b border-slate-700">
              <div className="flex items-center gap-2.5">
                <div className="relative">
                  <div className="bg-gradient-to-tr from-teal-400 to-blue-500 p-2 rounded-lg">
                    <Bot className="h-5 w-5 text-white" />
                  </div>
                  <span className="absolute bottom-0 right-0 h-2.5 w-2.5 bg-green-400 border-2 border-slate-900 rounded-full animate-pulse"></span>
                </div>
                <div>
                  <h3 className="font-semibold text-sm tracking-wide">AK Smart Assistant</h3>
                  <p className="text-[10px] text-teal-400 font-medium">Online • Consultation Representative</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-white transition-colors cursor-pointer p-1 rounded-md hover:bg-slate-800"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Messages body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {msg.role === "assistant" && (
                    <div className="bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-100 p-1.5 rounded-lg h-7 w-7 flex items-center justify-center shrink-0">
                      <Bot className="h-4 w-4 text-teal-500" />
                    </div>
                  )}
                  <div
                    className={`max-w-[78%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed shadow-sm ${
                      msg.role === "user"
                        ? "bg-gradient-to-tr from-blue-600 to-teal-500 text-white rounded-tr-none"
                        : "bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 text-slate-800 dark:text-slate-200 rounded-tl-none"
                    }`}
                  >
                    {/* Basic Markdown Rendering */}
                    <div className="whitespace-pre-line space-y-1">
                      {msg.content.split("\n").map((line, lIdx) => {
                        // Very simple strong text parsing
                        const boldRegex = /\*\*(.*?)\*\*/g;
                        if (boldRegex.test(line)) {
                          const parts = line.split(boldRegex);
                          return (
                            <p key={lIdx}>
                              {parts.map((p, pIdx) =>
                                pIdx % 2 === 1 ? <strong key={pIdx} className="font-semibold text-teal-500 dark:text-teal-400">{p}</strong> : p
                              )}
                            </p>
                          );
                        }
                        return <p key={lIdx}>{line}</p>;
                      })}
                    </div>
                  </div>
                  {msg.role === "user" && (
                    <div className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 p-1.5 rounded-lg h-7 w-7 flex items-center justify-center shrink-0">
                      <User className="h-4 w-4" />
                    </div>
                  )}
                </div>
              ))}
              
              {isLoading && (
                <div className="flex gap-2 justify-start">
                  <div className="bg-slate-200 dark:bg-slate-800 p-1.5 rounded-lg h-7 w-7 flex items-center justify-center shrink-0">
                    <Bot className="h-4 w-4 text-teal-500" />
                  </div>
                  <div className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-2xl rounded-tl-none px-4 py-3 shadow-sm">
                    <div className="flex items-center gap-1">
                      <div className="h-2 w-2 bg-teal-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                      <div className="h-2 w-2 bg-teal-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
                      <div className="h-2 w-2 bg-teal-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Suggestions scroll */}
            {messages.length < 5 && (
              <div className="px-4 py-2 border-t border-slate-150 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/20">
                <p className="text-[10px] text-slate-400 font-medium mb-1.5">Common questions:</p>
                <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none no-scrollbar">
                  {QUICK_SUGGESTIONS.map((suggestion, sIdx) => (
                    <button
                      key={sIdx}
                      onClick={() => handleSendMessage(suggestion)}
                      className="shrink-0 bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 text-[10px] px-2.5 py-1 rounded-full cursor-pointer transition-colors"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(inputValue);
              }}
              className="p-3 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center gap-2"
            >
              <input
                id="chatbot-text-input"
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type your question..."
                className="flex-1 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-800 dark:text-slate-200 px-3 py-2.5 rounded-xl focus:outline-none focus:ring-1 focus:ring-teal-500 transition-all"
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || isLoading}
                className="bg-slate-900 hover:bg-slate-800 dark:bg-teal-500 dark:hover:bg-teal-600 text-white p-2.5 rounded-xl transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed shrink-0 flex items-center justify-center shadow-md hover:shadow-lg"
              >
                <Send className="h-3.5 w-3.5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
