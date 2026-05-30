import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, Mic, Sparkles, PhoneCall, Loader2 } from 'lucide-react';
import { LogoMark } from './SharedPrimitives';

interface ChatMessage {
  speaker: 'agent' | 'user';
  text: string;
}

export const FloatingAgent: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      speaker: 'agent',
      text: "Hi there! I am Alex, the ClieX AI Assistant. How can I help power your communications today? Ask me about booking, orders, or pricing!"
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    setMessages(prev => [...prev, { speaker: 'user', text }]);
    setInputText('');
    setIsTyping(true);

    // Simulate AI response logic
    setTimeout(() => {
      let reply = "That's a great question! ClieX AI voice agents run on state-of-the-art low-latency engines to answer calls, capture leads, and sync with your CRMs instantly. Try submitting our Lead Form to get a live demo!";
      const lower = text.toLowerCase();

      if (lower.includes('price') || lower.includes('pricing') || lower.includes('cost')) {
        reply = "Our pricing tiers are: Starter ($100/mo), Growth ($150/mo), and Premium ($300/mo). Check out the Pricing section above for the full list of storage capacities, setup fees, and premium integrations!";
      } else if (lower.includes('book') || lower.includes('demo') || lower.includes('schedule')) {
        reply = "I'd love to help you book a live voice trial! Scroll down to our 'Secure Your AI Agent' form, enter your WhatsApp details, and our deployment engine will instantly ping you!";
      } else if (lower.includes('food') || lower.includes('pizza') || lower.includes('restaurant') || lower.includes('order')) {
        reply = "Absolutely! ClieX AI takes food orders, calculates taxes, processes credit cards, and injects tickets directly into POS software. Select the 'Pizza Restaurant Order' scenario in our mockup above to check it out!";
      } else if (lower.includes('hello') || lower.includes('hi') || lower.includes('hey')) {
        reply = "Hello! I am ready to handle your business calls. Would you like to review our agency Services or see our live pricing?";
      }

      setMessages(prev => [...prev, { speaker: 'agent', text: reply }]);
      setIsTyping(false);
    }, 1200);
  };

  const handleQuickAction = (text: string) => {
    handleSend(text);
  };

  const handleVoiceSimulate = () => {
    if (isListening) {
      setIsListening(false);
    } else {
      setIsListening(true);
      setTimeout(() => {
        if (!isListening) {
          const spokenPrompts = [
            "What are your voice agent prices?",
            "Can you schedule a dental appointment?",
            "How do I set up a restaurant order taker?"
          ];
          const randomPrompt = spokenPrompts[Math.floor(Math.random() * spokenPrompts.length)];
          handleSend(randomPrompt);
          setIsListening(false);
        }
      }, 2500);
    }
  };

  return (
    <div className="fixed bottom-14 right-6 z-50 flex flex-col items-end">
      {/* Expanded Chat Box */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="w-[calc(100vw-48px)] sm:w-[360px] h-[480px] max-h-[80vh] rounded-3xl border border-black/10 dark:border-white/10 bg-white/95 dark:bg-[#0e1014]/95 backdrop-blur-2xl shadow-2xl flex flex-col overflow-hidden mb-4 mr-0"
          >
            {/* Header */}
            <div className="bg-brand text-white p-4 flex items-center justify-between shadow-lg shadow-brand/10 shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center relative">
                  <PhoneCall className="w-4 h-4 text-white animate-pulse" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 border border-brand absolute -bottom-0.5 -right-0.5 animate-ping" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 border border-brand absolute -bottom-0.5 -right-0.5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold leading-tight flex items-center gap-1">
                    <span>Ask Alex</span>
                    <Sparkles className="w-3 h-3 text-amber-300" />
                  </h4>
                  <p className="text-[9px] text-white/70 font-semibold tracking-wide">
                    24/7 Voice & Chat Autopilot
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center active:scale-90 transition-all text-white"
                aria-label="Close chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Chat Body */}
            <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-3.5 bg-black/[0.01] dark:bg-black/5">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex flex-col ${
                    msg.speaker === 'agent' ? 'items-start' : 'items-end'
                  }`}
                >
                  <span className="text-[7.5px] font-bold text-black/35 dark:text-white/35 uppercase mb-0.5 tracking-wider">
                    {msg.speaker === 'agent' ? 'Alex (AI)' : 'You (Sandbox Caller)'}
                  </span>
                  <p
                    className={`text-[11px] leading-relaxed max-w-[85%] rounded-xl p-2.5 font-medium ${
                      msg.speaker === 'agent'
                        ? 'bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 text-black dark:text-white rounded-tl-none'
                        : 'bg-brand text-white rounded-tr-none'
                    }`}
                  >
                    {msg.text}
                  </p>
                </div>
              ))}
              {isTyping && (
                <div className="flex flex-col items-start">
                  <span className="text-[7.5px] font-bold text-black/35 dark:text-white/35 uppercase mb-0.5 tracking-wider">
                    Alex (AI)
                  </span>
                  <div className="bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 rounded-xl px-4 py-2.5 rounded-tl-none flex gap-1 items-center">
                    <span className="w-1.5 h-1.5 bg-black/40 dark:bg-white/40 rounded-full animate-bounce" />
                    <span className="w-1.5 h-1.5 bg-black/40 dark:bg-white/40 rounded-full animate-bounce [animation-delay:0.2s]" />
                    <span className="w-1.5 h-1.5 bg-black/40 dark:bg-white/40 rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Actions Suggestions */}
            {messages.length === 1 && !isTyping && (
              <div className="px-4 pb-2 pt-1 flex flex-col gap-1.5 shrink-0 bg-black/[0.01] dark:bg-black/5">
                <span className="text-[8px] font-bold text-black/40 dark:text-white/40 uppercase tracking-widest">
                  Quick Scenarios
                </span>
                <div className="flex flex-wrap gap-1.5">
                  <button
                    onClick={() => handleQuickAction('Book a demo call')}
                    className="text-[10px] bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 text-black dark:text-white/80 hover:border-brand/40 px-2.5 py-1 rounded-full font-semibold active:scale-95 transition-all text-left"
                  >
                    📅 Book a Demo Call
                  </button>
                  <button
                    onClick={() => handleQuickAction('What are your prices?')}
                    className="text-[10px] bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 text-black dark:text-white/80 hover:border-brand/40 px-2.5 py-1 rounded-full font-semibold active:scale-95 transition-all text-left"
                  >
                    💰 What are your prices?
                  </button>
                  <button
                    onClick={() => handleQuickAction('Can you take food orders?')}
                    className="text-[10px] bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 text-black dark:text-white/80 hover:border-brand/40 px-2.5 py-1 rounded-full font-semibold active:scale-95 transition-all text-left"
                  >
                    🍕 Can you take food orders?
                  </button>
                </div>
              </div>
            )}

            {/* Input Bar */}
            <div className="p-3 border-t border-black/5 dark:border-white/5 flex gap-2 items-center bg-white dark:bg-[#0e1014] shrink-0">
              <button
                onClick={handleVoiceSimulate}
                className={`w-9 h-9 rounded-full flex items-center justify-center active:scale-90 transition-all ${
                  isListening
                    ? 'bg-red-500 text-white animate-pulse'
                    : 'bg-brand/10 text-brand hover:bg-brand/20'
                }`}
                title={isListening ? 'Listening... click to stop' : 'Click to talk / simulate voice input'}
              >
                {isListening ? <Loader2 className="w-4 h-4 animate-spin" /> : <Mic className="w-4 h-4" />}
              </button>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend(inputText);
                }}
                className="flex-1 flex gap-2"
              >
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder={isListening ? 'Listening to voice...' : 'Type message to agent...'}
                  disabled={isListening}
                  className="flex-1 bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 rounded-full px-4 py-2 text-base sm:text-xs text-black dark:text-white outline-none focus:border-brand/45 dark:focus:border-brand/40 placeholder-black/45 dark:placeholder-white/45"
                />
                <button
                  type="submit"
                  className="bg-brand hover:bg-brand/90 text-white rounded-full p-2 flex items-center justify-center active:scale-90 transition-all shrink-0"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`rounded-full shadow-2xl flex items-center justify-center relative transition-all duration-300 ${
          isOpen 
            ? 'w-14 h-14 bg-brand text-white shadow-brand/30' 
            : 'h-12 px-5 bg-[#0f172a] text-white shadow-black/40 border border-white/10 gap-2.5'
        }`}
        aria-label="Toggle chat widget"
      >
        <span className="absolute inset-0 rounded-full bg-brand opacity-20 animate-ping pointer-events-none" />
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <>
            <LogoMark className="w-5 h-5 text-brand drop-shadow-[0_0_8px_rgba(139,92,246,0.6)]" />
            <span className="text-[14px] font-bold tracking-wide">Ask Alex</span>
          </>
        )}
      </motion.button>
    </div>
  );
};
