import React, { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LogoMark } from './SharedPrimitives';
import { Sparkles, X, ArrowUp } from 'lucide-react';
import { RetellWebClient } from 'retell-client-js-sdk';

/* ─────────────────────────────────────────────────────────────
   RetellTrigger  —  Premium Glassmorphic Chat Modal + FAB
   ──────────────────────────────────────────────────────────── */

type Status = 'idle' | 'connecting' | 'active';

interface ChatMessage {
  id: string;
  role: 'user' | 'agent';
  content: string;
}

/* ── Tiny sub-components ──────────────────────────────────── */

const WaveBar = ({ delay, color = 'bg-rose-500' }: { delay: number; color?: string }) => (
  <motion.span
    className={`inline-block w-[3px] rounded-full ${color}`}
    animate={{ height: ['4px', '14px', '4px'] }}
    transition={{ duration: 0.6, repeat: Infinity, delay, ease: 'easeInOut' }}
  />
);

const MicIcon = ({ size = 20, className = "" }: { size?: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    className={className} stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2a3 3 0 0 1 3 3v7a3 3 0 0 1-6 0V5a3 3 0 0 1 3-3Z" />
    <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
    <line x1="12" y1="19" x2="12" y2="22" />
    <line x1="8" y1="22" x2="16" y2="22" />
  </svg>
);

/* ── Typing indicator dots ────────────────────────────────── */
const TypingIndicator = () => (
  <div className="flex gap-2.5 items-start">
    <div
      className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center"
      style={{
        background: 'rgba(255,255,255,0.10)',
        border: '1px solid rgba(255,255,255,0.18)',
        backdropFilter: 'blur(18px) saturate(180%)',
        WebkitBackdropFilter: 'blur(18px) saturate(180%)'
      }}
    >
      <LogoMark className="w-4 h-4 brightness-0 invert" />
    </div>
    <div
      className="px-4 py-3 rounded-2xl rounded-tl-md"
      style={{
        background: 'rgba(255,255,255,0.10)',
        border: '1px solid rgba(255,255,255,0.18)',
        backdropFilter: 'blur(18px) saturate(180%)',
        WebkitBackdropFilter: 'blur(18px) saturate(180%)'
      }}
    >
      <div className="flex items-center gap-1">
        {[0, 0.15, 0.3].map((d, i) => (
          <motion.span
            key={i}
            className="w-[6px] h-[6px] rounded-full"
            style={{ background: 'rgba(255,255,255,0.50)' }}
            animate={{ y: [0, -5, 0], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 0.8, repeat: Infinity, delay: d, ease: 'easeInOut' }}
          />
        ))}
      </div>
    </div>
  </div>
);

/* ═════════════════════════════════════════════════════════════ */

export const RetellTrigger: React.FC = () => {
  const [status, setStatus]             = useState<Status>('idle');
  const [isAgentSpeaking, setIsSpeaking] = useState(false);
  const [modalOpen, setModalOpen]       = useState(false);
  const [inputText, setInputText]       = useState('');
  const [messages, setMessages]         = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping]         = useState(false);
  const [callSeconds, setCallSeconds]   = useState(0);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const clientRef      = useRef<RetellWebClient | null>(null);
  const timerRef       = useRef<ReturnType<typeof setInterval> | undefined>(undefined);

  /* ── Cycling Placeholder ─────────────────────────────────── */
  const [placeholderIdx, setPlaceholderIdx] = useState(0);
  const placeholders = ["Type a message...", "Or tap mic to talk..."];
  
  useEffect(() => {
    if (status !== 'idle') return;
    const interval = setInterval(() => {
      setPlaceholderIdx(prev => (prev + 1) % placeholders.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [status]);

  /* ── Auto-scroll ─────────────────────────────────────────── */
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, status, isTyping]);

  /* ── Call timer ──────────────────────────────────────────── */
  useEffect(() => {
    if (status === 'active') {
      setCallSeconds(0);
      timerRef.current = setInterval(() => setCallSeconds(s => s + 1), 1000);
    } else {
      clearInterval(timerRef.current);
      setCallSeconds(0);
    }
    return () => clearInterval(timerRef.current);
  }, [status]);

  const fmtTime = (s: number) =>
    `${Math.floor(s / 60).toString().padStart(2, '0')}:${(s % 60).toString().padStart(2, '0')}`;

  /* ── Retell SDK call logic ───────────────────────────────── */
  const handleClick = useCallback(async () => {
    if (status === 'active' || status === 'connecting') {
      clientRef.current?.stopCall();
      setStatus('idle');
      setIsSpeaking(false);
      return;
    }

    setStatus('connecting');

    try {
      const res = await fetch('/api/retell-token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!res.ok) {
        const err = await res.text();
        console.error('Retell token error:', err);
        setStatus('idle');
        return;
      }

      const { access_token } = await res.json() as { access_token: string };
      const client = new RetellWebClient();
      clientRef.current = client;

      client.on('call_started', () => setStatus('active'));
      client.on('call_ended',   () => {
        setStatus('idle');
        setIsSpeaking(false);
      });
      client.on('agent_start_talking', () => setIsSpeaking(true));
      client.on('agent_stop_talking',  () => setIsSpeaking(false));
      client.on('error', (e) => { 
        console.error('Retell error:', e); 
        setStatus('idle'); 
        setIsSpeaking(false);
      });

      await client.startCall({ accessToken: access_token });
    } catch (err) {
      console.error('Failed to start Retell call:', err);
      setStatus('idle');
      setIsSpeaking(false);
    }
  }, [status]);

  /* ── Text chat (stub) ───────────────────────────────────── */
  const handleSendText = useCallback(() => {
    const text = inputText.trim();
    if (!text) return;

    setMessages(prev => [...prev, { id: Date.now().toString(), role: 'user', content: text }]);
    setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'agent',
        content: "I'm a voice agent — tap the 🎙️ microphone to start a live conversation with me!",
      }]);
    }, 1200);
  }, [inputText]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSendText(); }
  };

  const closeModal = useCallback(() => {
    setModalOpen(false);
    if (status === 'active' || status === 'connecting') {
      clientRef.current?.stopCall();
      setStatus('idle');
      setIsSpeaking(false);
    }
  }, [status]);

  const handleFabClick = useCallback(() => {
    if (status === 'active' || status === 'connecting') {
      clientRef.current?.stopCall();
      setStatus('idle');
      setIsSpeaking(false);
      setModalOpen(false);
    } else {
      setModalOpen(prev => !prev);
    }
  }, [status]);

  const isActive     = status === 'active';
  const isConnecting = status === 'connecting';
  const hasInput     = inputText.trim().length > 0;

  return (
    <div className="fixed bottom-10 right-6 z-50 flex flex-col items-end gap-3">

      {/* ═══════════════ CHAT MODAL ═══════════════ */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            key="modal"
            data-lenis-prevent
            initial={{ opacity: 0, scale: 0.85, y: 60, x: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50, x: 10 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            style={{
              transformOrigin: 'bottom right',
              width: 340,
              height: 480,
              borderRadius: 20,
              background: 'rgba(255, 255, 255, 0.08)',
              backdropFilter: 'blur(18px) saturate(180%)',
              WebkitBackdropFilter: 'blur(18px) saturate(180%)',
              border: '1px solid rgba(255, 255, 255, 0.18)',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.25), 0 8px 32px rgba(0,0,0,0.25), 0 2px 8px rgba(0,0,0,0.15)',
            }}
          >
            <div className="flex flex-col h-full w-full overflow-hidden" style={{ borderRadius: 19 }}>
              
              {/* ── Header ─────────────────────────────── */}
              <div
                className="relative shrink-0 px-4 pt-4 pb-3 overflow-hidden"
                style={{ borderBottom: '1px solid rgba(255,255,255,0.10)' }}
              >
                <div className="relative flex items-center gap-3">
                  {/* Avatar with dynamic glow */}
                  <div className="relative">
                    <motion.div
                      animate={isAgentSpeaking ? {
                        boxShadow: ['0 0 0px rgba(139,92,246,0)', '0 0 16px rgba(139,92,246,0.8)', '0 0 0px rgba(139,92,246,0)']
                      } : {}}
                      transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                      className="relative w-11 h-11 rounded-full flex items-center justify-center"
                      style={{ background: 'rgba(255,255,255,0.10)', border: '1px solid rgba(255,255,255,0.18)' }}
                    >
                      <LogoMark className="w-6 h-6 brightness-0 invert" />
                    </motion.div>
                    
                    {/* Breathing online dot */}
                    <motion.span 
                      animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute -bottom-0.5 -right-0.5 flex h-3.5 w-3.5 rounded-full"
                      style={{
                        background: '#34d399',
                        border: '2px solid rgba(255,255,255,0.15)',
                        boxShadow: '0 0 8px rgba(0,255,100,0.5)',
                      }}
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-[15px] font-bold tracking-tight" style={{ color: 'rgba(255,255,255,0.90)' }}>Chloe</p>
                      <span
                        className="px-1.5 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-wider"
                        style={{ background: 'rgba(139,92,246,0.20)', color: '#A78BFA' }}
                      >AI</span>
                    </div>
                    <AnimatePresence mode="wait">
                      <motion.p 
                        key={isActive ? (isAgentSpeaking ? 'speaking' : 'listening') : 'online'}
                        initial={{ opacity: 0, y: 2 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -2 }}
                        className="text-[11px] font-medium mt-0.5"
                        style={{ color: 'rgba(255,255,255,0.50)' }}
                      >
                        {isActive 
                          ? (isAgentSpeaking ? `Chloe is speaking… (${fmtTime(callSeconds)})` : `Listening… (${fmtTime(callSeconds)})`)
                          : isConnecting ? 'Connecting voice…' : 'Online · Voice Agent'
                        }
                      </motion.p>
                    </AnimatePresence>
                  </div>

                  <button
                    onClick={closeModal}
                    className="relative w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer"
                    style={{ color: 'rgba(255,255,255,0.50)' }}
                    onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.12)'; e.currentTarget.style.color = 'rgba(255,255,255,0.90)'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(255,255,255,0.50)'; }}
                    aria-label="Close chat"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* ── Messages ───────────────────────────── */}
              <div className="flex-1 overflow-y-auto overscroll-y-contain min-h-0">
                <div className="px-4 py-4 flex flex-col gap-3">
                  {/* Greeting */}
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                    className="flex gap-2.5 items-start"
                  >
                    <div
                      className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center mt-0.5"
                      style={{ background: 'rgba(255,255,255,0.10)', border: '1px solid rgba(255,255,255,0.18)' }}
                    >
                      <LogoMark className="w-4 h-4 brightness-0 invert" />
                    </div>
                    <div className="max-w-[240px]">
                      <div
                        className="px-3.5 py-2.5 rounded-2xl rounded-tl-md text-[13px] leading-relaxed"
                        style={{
                          background: 'rgba(255, 255, 255, 0.10)',
                          backdropFilter: 'blur(18px) saturate(180%)',
                          WebkitBackdropFilter: 'blur(18px) saturate(180%)',
                          border: '1px solid rgba(255,255,255,0.18)',
                          color: 'rgba(255,255,255,0.90)',
                        }}
                      >
                        Hi! I'm <span className="font-semibold" style={{ color: '#A78BFA' }}>Chloe</span>, your AI voice assistant.
                        Ask me anything or tap the <span
                          className="inline-flex items-center align-middle mx-0.5 px-1 py-0.5 rounded"
                          style={{ background: 'rgba(139,92,246,0.20)', color: '#A78BFA' }}
                        >
                          <MicIcon size={11} /></span> to start a voice call.
                      </div>
                      <p className="text-[10px] mt-1 ml-1" style={{ color: 'rgba(255,255,255,0.30)' }}>Just now</p>
                    </div>
                  </motion.div>

                  {/* Quick action chips */}
                  {messages.length === 0 && !isActive && !isConnecting && (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="flex flex-wrap gap-1.5 ml-9"
                    >
                      {['What can you do?', 'Start a voice call', 'Book a demo'].map((chip) => (
                        <button
                          key={chip}
                          onClick={() => {
                            if (chip === 'Start a voice call') {
                              handleClick();
                            } else {
                              setInputText(chip);
                              setTimeout(() => {
                                setMessages(prev => [...prev, { id: Date.now().toString(), role: 'user', content: chip }]);
                                setIsTyping(true);
                                setTimeout(() => {
                                  setIsTyping(false);
                                  setMessages(prev => [...prev, {
                                    id: (Date.now() + 1).toString(),
                                    role: 'agent',
                                    content: chip === 'What can you do?'
                                      ? "I can answer your questions, book appointments, and handle calls 24/7. Want to try a live voice call? Tap the mic!"
                                      : "I'd love to help you set up a demo! Just start a voice call and I'll walk you through everything.",
                                  }]);
                                }, 1200);
                                setInputText('');
                              }, 100);
                            }
                          }}
                          className="px-3 py-1.5 rounded-full text-[11px] font-medium transition-all duration-200 cursor-pointer"
                          style={{
                            background: 'rgba(255,255,255,0.12)',
                            border: '1px solid rgba(255,255,255,0.20)',
                            color: 'rgba(255,255,255,0.90)',
                          }}
                          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.22)'; }}
                          onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.12)'; }}
                        >
                          {chip}
                        </button>
                      ))}
                    </motion.div>
                  )}

                  {/* Chat messages */}
                  {messages.map((msg) => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 8, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.25, delay: 0.05 }}
                      className={`flex gap-2.5 items-start ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                    >
                      {msg.role === 'agent' && (
                        <div
                          className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center mt-0.5"
                          style={{ background: 'rgba(255,255,255,0.10)', border: '1px solid rgba(255,255,255,0.18)' }}
                        >
                          <LogoMark className="w-4 h-4 brightness-0 invert" />
                        </div>
                      )}
                      <div
                        className={`max-w-[230px] px-3.5 py-2.5 rounded-2xl text-[13px] leading-relaxed ${
                          msg.role === 'user' ? 'rounded-tr-md' : 'rounded-tl-md'
                        }`}
                        style={msg.role === 'user' ? {
                          background: 'rgba(139,92,246,0.35)',
                          backdropFilter: 'blur(18px) saturate(180%)',
                          WebkitBackdropFilter: 'blur(18px) saturate(180%)',
                          border: '1px solid rgba(139,92,246,0.30)',
                          color: 'rgba(255,255,255,0.95)',
                          boxShadow: '0 4px 12px rgba(139,92,246,0.15)',
                        } : {
                          background: 'rgba(255, 255, 255, 0.10)',
                          backdropFilter: 'blur(18px) saturate(180%)',
                          WebkitBackdropFilter: 'blur(18px) saturate(180%)',
                          border: '1px solid rgba(255,255,255,0.18)',
                          color: 'rgba(255,255,255,0.90)',
                        }}
                      >
                        {msg.content}
                      </div>
                    </motion.div>
                  ))}

                  {/* Typing indicator */}
                  <AnimatePresence>
                    {isTyping && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                      >
                        <TypingIndicator />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div ref={messagesEndRef} className="h-0.5" />
                </div>
              </div>

              {/* ── Input bar ──────────────────────────── */}
              <div
                className="shrink-0 px-3 pb-3 pt-2"
                style={{ borderTop: '1px solid rgba(255,255,255,0.10)' }}
              >
                <div
                  className="flex items-center gap-2 px-2 py-2 rounded-[18px] transition-all duration-300"
                  style={{
                    background: 'rgba(255,255,255,0.07)',
                    border: '1px solid rgba(255,255,255,0.12)',
                  }}
                >

                  {/* Mic toggle */}
                  <motion.button
                    onClick={handleClick}
                    whileTap={{ scale: 0.9 }}
                    className="relative shrink-0 w-9 h-9 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 overflow-hidden"
                    style={isActive ? {
                      background: 'rgba(244,63,94,0.60)',
                      color: '#fff',
                      boxShadow: '0 0 12px rgba(244,63,94,0.5)',
                    } : isConnecting ? {
                      background: 'rgba(139,92,246,0.15)',
                      color: '#A78BFA',
                    } : {
                      background: 'transparent',
                      color: '#A78BFA',
                    }}
                    aria-label={isActive ? 'End call' : 'Start voice call'}
                  >
                    {isActive && (
                      <motion.div className="absolute inset-0 opacity-20"
                        style={{ background: 'rgba(244,63,94,0.40)' }}
                        animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      />
                    )}

                    <AnimatePresence mode="wait">
                      {isActive ? (
                        <motion.div key="wave-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                          className="flex items-center gap-[2px] h-4 z-10">
                          {[0, 0.1, 0.2].map((d, i) => (
                            <WaveBar key={i} delay={d} color="bg-white" />
                          ))}
                        </motion.div>
                      ) : isConnecting ? (
                        <motion.div key="spin-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                          className="w-4 h-4 rounded-full animate-spin z-10"
                          style={{ border: '2px solid rgba(139,92,246,0.30)', borderTopColor: '#A78BFA' }} />
                      ) : (
                        <motion.div key="mic-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="z-10">
                          <MicIcon size={18} />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.button>

                  {/* Text input */}
                  <AnimatePresence mode="wait">
                    <motion.input
                      key={isActive ? 'disabled' : 'active'}
                      initial={{ opacity: 0, x: -5 }}
                      animate={{ opacity: 1, x: 0 }}
                      type="text"
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder={isActive ? 'Voice call active…' : placeholders[placeholderIdx]}
                      className="retell-glass-input flex-1 bg-transparent text-[13px] outline-none py-1.5 transition-all"
                      style={{ color: 'rgba(255,255,255,0.90)' }}
                      disabled={isActive || isConnecting}
                    />
                  </AnimatePresence>

                  {/* Send button */}
                  <motion.button
                    type="button"
                    disabled={!hasInput || isActive || isConnecting}
                    onClick={handleSendText}
                    whileTap={hasInput && !isActive && !isConnecting ? { scale: 0.93 } : undefined}
                    whileHover={hasInput && !isActive && !isConnecting ? { scale: 1.05 } : undefined}
                    className="shrink-0 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300"
                    style={hasInput && !isActive && !isConnecting ? {
                      background: 'rgba(139,92,246,0.60)',
                      color: '#fff',
                      boxShadow: '0 4px 12px rgba(139,92,246,0.30)',
                      cursor: 'pointer',
                    } : {
                      background: 'rgba(255,255,255,0.05)',
                      color: 'rgba(255,255,255,0.20)',
                      cursor: 'not-allowed',
                      border: '1px solid rgba(255,255,255,0.08)',
                    }}
                    aria-label="Send message"
                  >
                    <ArrowUp className="w-5 h-5" />
                  </motion.button>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-center gap-1.5 mt-2.5">
                  <span
                    className="w-1 h-1 rounded-full"
                    style={{ background: '#34d399', boxShadow: '0 0 4px rgba(0,255,100,0.5)' }}
                  />
                  <p
                    className="text-[9px] font-semibold tracking-[0.15em] uppercase"
                    style={{ color: 'rgba(255,255,255,0.30)' }}
                  >
                    Powered by ClieX AI
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══════════════ FAB BUTTON ═══════════════ */}
      <div className="relative">
        {/* Idle attraction pulse */}
        {!isActive && !isConnecting && !modalOpen && (
          <motion.div
            className="absolute inset-0 rounded-full bg-brand pointer-events-none"
            animate={{ scale: [1, 1.85], opacity: [0.35, 0] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeOut', repeatDelay: 3 }}
          />
        )}

        {/* Active call ring */}
        {isActive && (
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-rose-500 pointer-events-none"
            animate={{ scale: [1, 1.65], opacity: [0.7, 0] }}
            transition={{ duration: 1.1, repeat: Infinity, ease: 'easeOut' }}
          />
        )}

        <motion.button
          onClick={handleFabClick}
          whileHover={{
            scale: 1.06,
            background: isActive ? 'rgba(244, 63, 94, 0.25)' : 'rgba(255, 255, 255, 0.18)'
          }}
          whileTap={{ scale: 0.93 }}
          transition={{ type: 'spring', stiffness: 420, damping: 26 }}
          className="relative h-12 rounded-full px-5 cursor-pointer outline-none flex items-center justify-center gap-2.5 transition-all duration-300 border"
          style={isActive ? {
            background: 'rgba(244, 63, 94, 0.15)',
            backdropFilter: 'blur(18px) saturate(180%)',
            WebkitBackdropFilter: 'blur(18px) saturate(180%)',
            borderColor: 'rgba(244, 63, 94, 0.3)',
            color: '#fb7185',
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.15), 0 8px 32px rgba(244,63,94,0.15)',
          } : {
            background: 'rgba(255, 255, 255, 0.08)',
            backdropFilter: 'blur(18px) saturate(180%)',
            WebkitBackdropFilter: 'blur(18px) saturate(180%)',
            borderColor: 'rgba(255, 255, 255, 0.18)',
            color: 'rgba(255, 255, 255, 0.9)',
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.25), 0 8px 32px rgba(0,0,0,0.25), 0 2px 8px rgba(0,0,0,0.15)',
          }}
          aria-label={isActive ? 'End call with Chloe' : 'Ask Chloe AI assistant'}
        >
          <span className="absolute inset-0 rounded-full bg-gradient-to-b from-white/20 to-transparent dark:from-white/10 pointer-events-none" />

          <AnimatePresence mode="wait">
            {isActive ? (
              <motion.div key="wave" initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }} transition={{ duration: 0.18 }}
                className="flex items-center gap-[3.5px] h-5">
                {[0, 0.1, 0.2, 0.3, 0.2].map((d, i) => (
                  <WaveBar key={i} delay={d} color="bg-rose-400" />
                ))}
              </motion.div>
            ) : isConnecting ? (
              <motion.div key="spin" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="w-5 h-5 rounded-full border-2 border-brand/30 dark:border-white/30 border-t-brand dark:border-t-white animate-spin" />
            ) : (
              <motion.div key="idle" initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.7 }} transition={{ duration: 0.18 }}
                className="flex items-center gap-2.5">
                <LogoMark className="w-5 h-5 brightness-0 invert" />
                <span className="text-[14px] font-bold tracking-wide">Ask Chloe</span>
                <Sparkles className="w-4 h-4 text-amber-300" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </div>
  );
};