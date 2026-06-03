import React, { useState } from 'react';
import { Phone, Mic, Send, Loader2 } from 'lucide-react';

export const SandboxSection: React.FC = () => {
  const [messages, setMessages] = useState<{ speaker: 'agent' | 'customer'; text: string }[]>([
    { speaker: 'agent', text: "Hi! I'm your ClieX AI sandbox agent. Pick a scenario or type anything below to test my voice and text response!" }
  ]);
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;
    const userMsg = text;
    setMessages(prev => [...prev, { speaker: 'customer', text: userMsg }]);
    setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      let reply = "I understand you're asking about that. As a ClieX AI Voice Agent, I can connect to your databases in real-time, speak 29+ languages, and answer instantly. Would you like to book a full demo?";
      const lower = userMsg.toLowerCase();
      if (lower.includes('pizza') || lower.includes('order') || lower.includes('food')) {
        reply = "Sure! I can take your food order, suggest appetizers, calculate tax, apply discount codes, and inject the order directly into your POS system. Shall we set this up for your restaurant?";
      } else if (lower.includes('book') || lower.includes('appointment') || lower.includes('schedule')) {
        reply = "I can sync directly with Google Calendar, Outlook, or your custom booking CRM. I'll read available slots, book the customer in, and send text confirmations instantly. What calendar system do you use?";
      } else if (lower.includes('price') || lower.includes('pricing') || lower.includes('cost')) {
        reply = "Our plans start at $199/month for the Starter tier, up to custom Enterprise pricing. Check the Billing section for full details! I can also custom-quote enterprise usage. What are your monthly call volumes?";
      }
      setMessages(prev => [...prev, { speaker: 'agent', text: reply }]);
      setIsTyping(false);
    }, 1200);
  };

  const handleMicClick = () => {
    if (isListening) {
      setIsListening(false);
    } else {
      setIsListening(true);
      setTimeout(() => {
        const prompts = [
          "Can you book a dentist appointment for me?",
          "I want to order a large pepperoni pizza",
          "What are your agency services and pricing?"
        ];
        const randomPrompt = prompts[Math.floor(Math.random() * prompts.length)];
        handleSendMessage(randomPrompt);
        setIsListening(false);
      }, 3000);
    }
  };

  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto w-full">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-white/[0.06] shrink-0 mb-4">
        <div className="flex items-center gap-3">
          <Phone className="w-5 h-5 text-brand animate-bounce" />
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-1.5 mb-0.5">
              Interactive AI Audio Simulator
            </h3>
            <p className="text-xs text-white/40">
              Synthesizing real-time voice response from text. Click mic to speak!
            </p>
          </div>
        </div>
        {(isListening || isTyping) && (
          <div className="flex items-center gap-0.5 h-5 select-none">
            <span className="w-1 bg-brand animate-[bounce_0.8s_infinite_100ms] h-full rounded-full" />
            <span className="w-1 bg-brand animate-[bounce_0.8s_infinite_300ms] h-2/3 rounded-full" />
            <span className="w-1 bg-brand animate-[bounce_0.8s_infinite_200ms] h-4/5 rounded-full" />
            <span className="w-1 bg-brand animate-[bounce_0.8s_infinite_400ms] h-1/2 rounded-full" />
            <span className="w-1 bg-brand animate-[bounce_0.8s_infinite_150ms] h-full rounded-full" />
          </div>
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 py-4 flex flex-col gap-4 overflow-y-auto pr-2">
        {messages.map((msg, i) => (
          <div key={i} className={`flex flex-col ${msg.speaker === 'agent' ? 'items-start' : 'items-end'}`}>
            <span className="text-[9px] font-bold tracking-wider text-white/35 uppercase mb-1">
              {msg.speaker === 'agent' ? 'ClieX AI Assistant' : 'You (Sandbox Caller)'}
            </span>
            <p className={`text-xs md:text-sm leading-relaxed max-w-[80%] rounded-2xl p-4 font-medium ${
              msg.speaker === 'agent'
                ? 'bg-white/5 border border-white/5 text-white rounded-tl-sm shadow-lg shadow-black/20'
                : 'bg-brand text-white rounded-tr-sm shadow-lg shadow-brand/20'
            }`}>
              {msg.text}
            </p>
          </div>
        ))}
        {isTyping && (
          <div className="flex flex-col items-start">
            <span className="text-[9px] font-bold tracking-wider text-white/35 uppercase mb-1">ClieX AI Assistant</span>
            <div className="bg-white/5 border border-white/5 rounded-2xl px-5 py-4 rounded-tl-sm flex gap-1.5 items-center">
              <span className="w-2 h-2 bg-white/40 rounded-full animate-bounce" />
              <span className="w-2 h-2 bg-white/40 rounded-full animate-bounce [animation-delay:0.2s]" />
              <span className="w-2 h-2 bg-white/40 rounded-full animate-bounce [animation-delay:0.4s]" />
            </div>
          </div>
        )}
      </div>

      {/* Quick scenarios */}
      {messages.length <= 2 && !isTyping && (
        <div className="pb-3 flex flex-wrap gap-2 shrink-0">
          {['📅 Book a Demo Call', '💰 What are your prices?', '🍕 Take a food order'].map((q) => (
            <button
              key={q}
              onClick={() => handleSendMessage(q.replace(/^[^\s]+\s/, ''))}
              className="text-[10px] bg-white/5 border border-white/[0.06] text-white/60 hover:border-brand/30 hover:text-white/80 px-3 py-1.5 rounded-full font-semibold active:scale-95 transition-all"
            >
              {q}
            </button>
          ))}
        </div>
      )}

      {/* Input bar */}
      <div className="pt-4 border-t border-white/[0.06] flex gap-3 items-center shrink-0">
        <button
          onClick={handleMicClick}
          className={`w-12 h-12 rounded-full flex items-center justify-center active:scale-90 transition-all shadow-lg shrink-0 ${
            isListening
              ? 'bg-red-500 text-white animate-pulse shadow-red-500/20'
              : 'bg-brand/10 text-brand hover:bg-brand/20 border border-brand/20'
          }`}
          title={isListening ? 'Listening... click to stop' : 'Click to talk / simulate voice input'}
        >
          {isListening ? <Loader2 className="w-5 h-5 animate-spin" /> : <Mic className="w-5 h-5" />}
        </button>
        <form
          onSubmit={(e) => { e.preventDefault(); handleSendMessage(inputText); }}
          className="flex-1 flex gap-3 relative"
        >
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={isListening ? 'Listening to voice... click mic to stop' : 'Try saying: "Book appointment", "Pizza order", or custom...'}
            disabled={isListening}
            className="flex-1 bg-white/5 border border-white/[0.06] rounded-full pl-5 pr-20 py-3.5 text-sm text-white outline-none focus:border-brand/40 placeholder-white/30 shadow-inner"
          />
          <button
            type="submit"
            className="absolute right-1.5 top-1.5 bottom-1.5 bg-brand hover:bg-brand/90 text-white rounded-full px-5 text-xs font-semibold active:scale-95 transition-all shadow-md flex items-center gap-1.5"
          >
            <Send className="w-3.5 h-3.5" /> Send
          </button>
        </form>
      </div>
    </div>
  );
};
