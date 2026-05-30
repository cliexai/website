import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Search, Play, Phone, PhoneCall, Volume2, Mic, MoreHorizontal, BarChart2, Clock, LogOut } from 'lucide-react';
import { useIsMobile } from '../hooks/useIsMobile';
import { useAuth } from '../contexts/AuthContext';
import { Loader2 } from 'lucide-react';
import { LogoMark } from '../components/SharedPrimitives';

interface CallScenario {
  id: string;
  caller: string;
  scenario: string;
  avatarText: string;
  avatarGradient: string;
  duration: string;
  time: string;
  status: 'active' | 'completed' | 'failed';
  tag: string;
  tagColor: string;
  aiSummary: string;
  transcript: { speaker: 'agent' | 'customer'; text: string }[];
}

export const PortalPage: React.FC = () => {
  const { user, loading, signOut } = useAuth();
  const isMobile = useIsMobile();

  // Guard: redirect unauthenticated users to /login
  useEffect(() => {
    if (!loading && !user) {
      window.location.href = '/login';
    }
  }, [user, loading]);

  const scenarios: CallScenario[] = [
    {
      id: '1',
      caller: 'Marcus Vance',
      scenario: 'Pizza Restaurant Order',
      avatarText: 'MV',
      avatarGradient: 'from-[#8B5CF6] to-[#4c1d95]',
      duration: '2m 14s',
      time: '9:41 AM',
      status: 'active',
      tag: 'Restaurant',
      tagColor: '#00d2ff',
      aiSummary: 'Customer ordered 1x Large Pepperoni Pizza and 1x Garlic Knots for delivery to 742 Evergreen Terrace. Total: $28.50. Estimated delivery: 35 mins.',
      transcript: [
        { speaker: 'agent', text: "Thanks for calling Mario's Pizza! How can I help you feed the family today?" },
        { speaker: 'customer', text: "Hey! I'd like to order a large Pepperoni pizza and a side of garlic knots, please." },
        { speaker: 'agent', text: "Great choice! That's one large Pepperoni and a side of garlic knots. Will that be for pickup or delivery?" },
        { speaker: 'customer', text: "Delivery to 742 Evergreen Terrace, please." },
        { speaker: 'agent', text: "Got it, 742 Evergreen Terrace. Your total is $28.50. We'll have that at your door in 35 minutes! Anything else?" },
        { speaker: 'customer', text: "No, that's everything. Thanks a lot!" },
        { speaker: 'agent', text: "My pleasure! Enjoy the pizza, Marcus!" }
      ]
    },
    {
      id: '2',
      caller: 'Sophia Chen',
      scenario: 'Dental Clinic Appointment',
      avatarText: 'SC',
      avatarGradient: 'from-[#10B981] to-[#047857]',
      duration: '1m 45s',
      time: '8:12 AM',
      status: 'completed',
      tag: 'Healthcare',
      tagColor: '#A4F4FD',
      aiSummary: 'Customer scheduled a tooth cleaning appointment for Friday, May 29th at 2:00 PM. Confirmed text reminder sent.',
      transcript: [
        { speaker: 'agent', text: "Hello! Thank you for calling Apex Dental. This is Aria, how can I assist you?" },
        { speaker: 'customer', text: "Hi Aria, I'd like to book an appointment for a routine cleaning sometime this week if possible." },
        { speaker: 'agent', text: "I can absolutely help with that. Let me look... We have an opening this Friday, May 29th, at 2:00 PM. Does that work for you?" },
        { speaker: 'customer', text: "Yes, 2:00 PM on Friday is perfect." },
        { speaker: 'agent', text: "Wonderful. I have booked you for Friday at 2:00 PM with Dr. Reynolds. You will receive a text reminder shortly!" },
        { speaker: 'customer', text: "Awesome, thank you Aria!" },
        { speaker: 'agent', text: "Of course! We look forward to seeing you, Sophia. Have a great day!" }
      ]
    },
    {
      id: '3',
      caller: 'David Lim',
      scenario: 'SaaS Billing Support',
      avatarText: 'DL',
      avatarGradient: 'from-[#F59E0B] to-[#D97706]',
      duration: '3m 12s',
      time: 'Yesterday',
      status: 'completed',
      tag: 'SaaS & Support',
      tagColor: '#8B5CF6',
      aiSummary: 'Customer requested a refund for an accidental subscription renewal. Agent validated billing history and escalated to finance for processing.',
      transcript: [
        { speaker: 'agent', text: "Thanks for calling ClieX Tech Support! How can I help you today?" },
        { speaker: 'customer', text: "Hi, my subscription renewed yesterday automatically, but I meant to cancel it. Can I get a refund?" },
        { speaker: 'agent', text: "I completely understand. Let me check your account. Yes, I see the renewal for $149.00. Since it renewed within 24 hours, you are eligible for a full refund." },
        { speaker: 'customer', text: "Oh, that's fantastic! Thank you." },
        { speaker: 'agent', text: "You're very welcome. I've initiated the refund, and it should show up on your card in 3 to 5 business days. Your subscription has been set to cancel." },
        { speaker: 'customer', text: "Perfect. I appreciate the quick help." },
        { speaker: 'agent', text: "Anytime, David. Have a wonderful rest of your day!" }
      ]
    }
  ];

  const [activeScenarioId, setActiveScenarioId] = useState('1');
  const activeScenario = scenarios.find(s => s.id === activeScenarioId) || scenarios[0];

  // Live sandbox state
  const [sandboxMessages, setSandboxMessages] = useState<{ speaker: 'agent' | 'customer'; text: string }[]>([
    { speaker: 'agent', text: "Hi! I'm your ClieX AI sandbox agent. Pick a scenario or type anything below to test my voice and text response!" }
  ]);
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [activeTab, setActiveTab] = useState<'logs' | 'sandbox'>('logs');

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;
    
    // Add customer message
    const userMsg = text;
    setSandboxMessages(prev => [...prev, { speaker: 'customer', text: userMsg }]);
    setInputText('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      let reply = "I understand you're asking about that. As a ClieX AI Voice Agent, I can connect to your databases in real-time, speak 29+ languages, and answer instantly. Would you like to book a full demo?";
      const lower = userMsg.toLowerCase();
      if (lower.includes('pizza') || lower.includes('order') || lower.includes('food')) {
        reply = "Sure! I can take your food order, suggest appetizers, calculate tax, apply discount codes, and inject the order directly into your POS system. Shall we set this up for your restaurant?";
      } else if (lower.includes('book') || lower.includes('appointment') || lower.includes('schedule')) {
        reply = "I can sync directly with Google Calendar, Outlook, or your custom booking CRM. I'll read available slots, book the customer in, and send text confirmations instantly. What calendar system do you use?";
      } else if (lower.includes('price') || lower.includes('pricing') || lower.includes('cost')) {
        reply = "Our plans start at $100/month for the Starter tier, up to $300/month for Premium. Check out the Pricing section below! I can also custom-quote enterprise usage. What are your monthly call volumes?";
      }

      setSandboxMessages(prev => [...prev, { speaker: 'agent', text: reply }]);
      setIsTyping(false);
    }, 1200);
  };

  const handleMicClick = () => {
    if (isListening) {
      setIsListening(false);
    } else {
      setIsListening(true);
      // Simulate hearing voice after 3s
      setTimeout(() => {
        if (isListening) return; // if turned off
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

  if (loading || !user) {
    return (
      <div className="min-h-screen bg-[#0c0c0c] flex items-center justify-center">
        <Loader2 className="w-6 h-6 text-brand animate-spin" />
      </div>
    );
  }

  return (
    <div className="h-screen bg-[#0c0c0c] text-white flex flex-col font-sans overflow-hidden selection:bg-brand/30">
      {/* Top Header */}
      <header className="h-14 border-b border-white/[0.07] bg-[#0c0c0c] px-4 md:px-5 flex items-center justify-between shrink-0 relative z-20">
        <div className="flex items-center gap-3">
          <LogoMark className="w-6 h-6 text-brand" />
          <span className="font-bold text-sm tracking-tight text-white hidden sm:block">ClieX AI Portal</span>
        </div>

        {/* Central Tab Switcher */}
        <div className="flex items-center bg-white/5 p-1 rounded-lg border border-white/5">
          <button
            onClick={() => setActiveTab('logs')}
            className={`px-3 md:px-4 py-1 md:py-1.5 rounded-md text-xs font-semibold transition-all ${
              activeTab === 'logs'
                ? 'bg-white/10 text-white shadow-sm'
                : 'text-white/50 hover:text-white'
            }`}
          >
            <span className="hidden sm:inline">Call History </span>Dashboard
          </button>
          <button
            onClick={() => setActiveTab('sandbox')}
            className={`px-3 md:px-4 py-1 md:py-1.5 rounded-md text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === 'sandbox' ? 'bg-white/10 text-white' : 'text-white/50 hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-brand" />
            <span className="hidden sm:inline">Live Agent </span>Sandbox
          </button>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={signOut}
            className="flex items-center gap-1.5 text-xs font-semibold text-white/50 hover:text-red-400 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:block">Sign Out</span>
          </button>
        </div>
      </header>

      {/* Main App Grid - fills remaining height */}
      <div className="flex-1 grid grid-cols-12 overflow-hidden relative z-10">
        {/* Sidebar (col-span-3) */}
        <div className="col-span-12 md:col-span-3 border-r border-white/5 bg-black/30 p-4 md:p-5 flex flex-col overflow-y-auto">
          <div className="flex flex-col gap-5 flex-1">
            {/* Compose Button */}
            <button
              onClick={() => setActiveTab('sandbox')}
              className="w-full rounded-xl bg-brand text-white text-xs font-semibold px-4 py-3 flex items-center gap-2 justify-center shadow-lg shadow-brand/20 hover:bg-brand/90 active:scale-95 transition-all"
            >
              <Sparkles className="w-4 h-4" />
              <span>Test Live Agent</span>
            </button>

            {/* Navigation Items */}
            <div className="flex flex-col gap-1">
              <button
                onClick={() => setActiveTab('logs')}
                className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition-colors ${
                  activeTab === 'logs' ? 'bg-white/10 text-white' : 'text-white/60 hover:bg-white/5'
                }`}
              >
                <span className="flex items-center gap-2">
                  <BarChart2 className="w-4 h-4 text-brand" />
                  <span>Call Dashboard</span>
                </span>
                <span className="text-[10px] bg-brand/20 text-brand px-1.5 py-0.5 rounded font-mono font-bold">12</span>
              </button>

              <button
                onClick={() => {
                  setActiveTab('logs');
                  setActiveScenarioId('1');
                }}
                className="flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium text-white/60 hover:bg-white/5 transition-colors"
              >
                <span className="flex items-center gap-2">
                  <PhoneCall className="w-4 h-4 text-emerald-500 animate-pulse" />
                  <span>Active Calls</span>
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
              </button>

              <button className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-xs font-medium text-white/60 hover:bg-white/5 transition-colors">
                <Volume2 className="w-4 h-4 text-violet-500" />
                <span>Custom Voices</span>
              </button>
            </div>

            {/* Industries/Tags section */}
            <div className="mt-2">
              <span className="text-[10px] font-bold tracking-widest text-white/40 uppercase block px-3 mb-3">
                Scenarios
              </span>
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-3 px-3 py-1.5 text-xs text-white/70">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#00d2ff]" />
                  <span>Restaurants</span>
                </div>
                <div className="flex items-center gap-3 px-3 py-1.5 text-xs text-white/70">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#A4F4FD]" />
                  <span>Healthcare</span>
                </div>
                <div className="flex items-center gap-3 px-3 py-1.5 text-xs text-white/70">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#8B5CF6]" />
                  <span>SaaS & Support</span>
                </div>
                <div className="flex items-center gap-3 px-3 py-1.5 text-xs text-white/70">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#10b981]" />
                  <span>E-commerce</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Info Card */}
          <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02] mt-6">
            <span className="text-[10px] font-bold text-brand uppercase block mb-1.5">ClieX Engine</span>
            <span className="text-[11px] text-white/50 block leading-relaxed">
              Resolution Engine running at <strong className="text-white">98% efficiency</strong>.
            </span>
          </div>
        </div>

        {/* Conditional Middle and Right Rendering */}
        <AnimatePresence mode="wait">
          {activeTab === 'logs' ? (
            <React.Fragment key="logs-tab">
              {/* Call Log List (col-span-4) */}
              <div className="col-span-12 md:col-span-4 border-r border-white/5 flex flex-col overflow-y-auto bg-black/10">
                {/* Search bar */}
                <div className="p-4 border-b border-white/5 flex items-center gap-3">
                  <Search className="w-4 h-4 text-white/40" />
                  <input
                    type="text"
                    placeholder="Search call logs..."
                    className="bg-transparent border-none outline-none text-sm text-white w-full placeholder-white/40"
                  />
                </div>

                {/* Scenario list */}
                <div className="flex-1 divide-y divide-white/5">
                  {scenarios.map((sc) => (
                    <div
                      key={sc.id}
                      onClick={() => setActiveScenarioId(sc.id)}
                      className={`p-5 cursor-pointer transition-all duration-200 ${
                        activeScenarioId === sc.id
                          ? 'bg-white/5 border-l-2 border-brand'
                          : 'hover:bg-white/[0.02]'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-semibold text-white">
                          {sc.caller}
                        </span>
                        <span className="text-[11px] text-white/40 font-mono">
                          {sc.time}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mb-2.5">
                        <span
                          className="w-1.5 h-1.5 rounded-full"
                          style={{ backgroundColor: sc.tagColor }}
                        />
                        <span className="text-xs font-medium text-white/50">
                          {sc.scenario}
                        </span>
                      </div>
                      <p className="text-xs text-white/40 line-clamp-2 leading-relaxed">
                        {sc.aiSummary}
                      </p>
                      <div className="mt-3.5 flex items-center justify-between">
                        <span className="text-[10px] font-bold text-white/40 flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5" />
                          {sc.duration}
                        </span>
                        {sc.status === 'active' ? (
                          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-500 text-[9px] font-bold uppercase tracking-wider animate-pulse">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                            Live Call
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-white/5 text-white/40 text-[9px] font-bold uppercase tracking-wider">
                            Completed
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Call Transcript Reader (col-span-5) */}
              <div className="col-span-12 md:col-span-5 p-5 md:p-6 flex flex-col h-full overflow-hidden bg-[#0c0c0c]">
                {/* Top actions */}
                <div className="flex items-center justify-between pb-4 border-b border-white/5 shrink-0">
                  <div className="flex items-center gap-2">
                    <button className="px-3 py-1.5 rounded-lg border border-white/10 text-white/70 hover:bg-white/5 active:scale-95 transition-all flex items-center gap-1.5 text-[11px] font-semibold">
                      <Play className="w-3.5 h-3.5 fill-current text-brand" />
                      Play Recording
                    </button>
                    <button className="px-3 py-1.5 rounded-lg border border-white/10 text-white/70 hover:bg-white/5 active:scale-95 transition-all text-[11px] font-semibold">
                      Export CRM
                    </button>
                  </div>
                  <MoreHorizontal className="w-5 h-5 text-white/40 cursor-pointer hover:text-white" />
                </div>

                {/* Transcript content */}
                <div className="flex-1 py-5 flex flex-col gap-5 overflow-y-auto pr-2">
                  {/* Scenario header card */}
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white bg-gradient-to-br ${activeScenario.avatarGradient}`}>
                      {activeScenario.avatarText}
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white mb-0.5">
                        {activeScenario.caller}
                      </h3>
                      <p className="text-[11px] text-white/40">
                        Incoming Call · {activeScenario.time}
                      </p>
                    </div>
                    <span className="ml-auto px-2.5 py-1 rounded-full text-[10px] font-bold text-brand bg-brand/10 border border-brand/20 uppercase tracking-wide">
                      {activeScenario.tag}
                    </span>
                  </div>

                  {/* AI extracted intent block */}
                  <div className="p-4 rounded-xl border border-brand/20 bg-brand/[0.02] flex gap-3">
                    <Sparkles className="w-4 h-4 text-brand shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-[11px] font-bold text-brand uppercase tracking-wider mb-1.5">
                        AI Intent Summary
                      </h4>
                      <p className="text-xs text-white/70 leading-relaxed font-medium">
                        {activeScenario.aiSummary}
                      </p>
                    </div>
                  </div>

                  {/* Transcript bubbles */}
                  <div className="flex flex-col gap-3 pb-4">
                    {activeScenario.transcript.map((line, idx) => (
                      <div
                        key={idx}
                        className={`flex flex-col ${
                          line.speaker === 'agent' ? 'items-start' : 'items-end'
                        }`}
                      >
                        <span className="text-[9px] font-bold tracking-wider text-white/40 uppercase mb-1">
                          {line.speaker === 'agent' ? 'ClieX AI Agent' : activeScenario.caller}
                        </span>
                        <p
                          className={`text-xs leading-relaxed max-w-[85%] rounded-2xl p-3.5 font-medium ${
                            line.speaker === 'agent'
                              ? 'bg-white/5 border border-white/5 text-white rounded-tl-sm'
                              : 'bg-brand text-white rounded-tr-sm'
                          }`}
                        >
                          {line.text}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer status bar */}
                <div className="pt-4 border-t border-white/5 flex items-center justify-between text-[11px] text-white/45 font-medium shrink-0">
                  <span className="flex items-center gap-1.5">
                    <Phone className="w-4 h-4 text-brand" />
                    Codec: Opus 24kHz High Definition
                  </span>
                  <span>Lat: 1.4s</span>
                </div>
              </div>
            </React.Fragment>
          ) : (
            /* Live Agent Sandbox Console (col-span-9) */
            <motion.div
              key="sandbox-tab"
              initial={{ opacity: 0, x: isMobile ? 10 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: isMobile ? -10 : -20 }}
              transition={{ duration: isMobile ? 0.15 : 0.3 }}
              className="col-span-12 md:col-span-9 p-5 md:p-8 flex flex-col h-full bg-black/10"
            >
              {/* Top sandbox banner */}
              <div className="flex items-center justify-between pb-4 border-b border-white/5 shrink-0">
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
                {/* Waveform indicator */}
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

              {/* Simulated conversations container */}
              <div className="flex-1 py-6 flex flex-col gap-4 overflow-y-auto pr-2">
                {sandboxMessages.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex flex-col ${
                      msg.speaker === 'agent' ? 'items-start' : 'items-end'
                    }`}
                  >
                    <span className="text-[9px] font-bold tracking-wider text-white/40 uppercase mb-1">
                      {msg.speaker === 'agent' ? 'ClieX AI Assistant' : 'You (Sandbox Caller)'}
                    </span>
                    <p
                      className={`text-xs md:text-sm leading-relaxed max-w-[80%] rounded-2xl p-4 font-medium ${
                        msg.speaker === 'agent'
                          ? 'bg-white/5 border border-white/5 text-white rounded-tl-sm shadow-lg shadow-black/20'
                          : 'bg-brand text-white rounded-tr-sm shadow-lg shadow-brand/20'
                      }`}
                    >
                      {msg.text}
                    </p>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex flex-col items-start">
                    <span className="text-[9px] font-bold tracking-wider text-white/40 uppercase mb-1">
                      ClieX AI Assistant
                    </span>
                    <div className="bg-white/5 border border-white/5 rounded-2xl px-5 py-4 rounded-tl-sm flex gap-1.5 items-center">
                      <span className="w-2 h-2 bg-white/40 rounded-full animate-bounce" />
                      <span className="w-2 h-2 bg-white/40 rounded-full animate-bounce [animation-delay:0.2s]" />
                      <span className="w-2 h-2 bg-white/40 rounded-full animate-bounce [animation-delay:0.4s]" />
                    </div>
                  </div>
                )}
              </div>

              {/* Input sandbox bar */}
              <div className="pt-4 border-t border-white/5 flex gap-3 items-center shrink-0">
                <button
                  onClick={handleMicClick}
                  className={`w-12 h-12 rounded-full flex items-center justify-center active:scale-90 transition-all shadow-lg ${
                    isListening
                      ? 'bg-red-500 text-white animate-pulse shadow-red-500/20'
                      : 'bg-brand/10 text-brand hover:bg-brand/20 border border-brand/20'
                  }`}
                  title={isListening ? 'Listening... click to stop' : 'Click to talk / simulate voice input'}
                >
                  <Mic className="w-5 h-5" />
                </button>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage(inputText);
                  }}
                  className="flex-1 flex gap-3 relative"
                >
                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder={isListening ? 'Listening to voice... click mic to stop' : 'Try saying: "Book appointment", "Pizza order", or custom...'}
                    disabled={isListening}
                    className="flex-1 bg-white/5 border border-white/5 rounded-full pl-5 pr-20 py-3.5 text-sm text-white outline-none focus:border-brand/40 placeholder-white/30 shadow-inner"
                  />
                  <button
                    type="submit"
                    className="absolute right-1.5 top-1.5 bottom-1.5 bg-brand hover:bg-brand/90 text-white rounded-full px-5 text-xs font-semibold active:scale-95 transition-all shadow-md"
                  >
                    Send
                  </button>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
