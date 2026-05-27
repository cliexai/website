import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Search, Play, Phone, PhoneCall, Volume2, Mic, MoreHorizontal, BarChart2, Clock } from 'lucide-react';

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

export const VoiceDashboardMockup: React.FC = () => {
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

  return (
    <section id="demo" className="max-w-7xl mx-auto px-6 py-16 md:py-24 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 70 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: '-100px' }}
        transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="relative rounded-2xl overflow-hidden border border-black/10 dark:border-white/10 bg-white/90 dark:bg-[#0e1014]/90 backdrop-blur-2xl shadow-2xl flex flex-col"
      >
        {/* macOS Style Title Bar */}
        <div className="h-12 border-b border-black/5 dark:border-white/5 bg-black/[0.03] dark:bg-white/[0.02] flex items-center px-4 justify-between">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#ff5f57] cursor-pointer" />
            <span className="w-3 h-3 rounded-full bg-[#febc2e] cursor-pointer" />
            <span className="w-3 h-3 rounded-full bg-[#28c840] cursor-pointer" />
          </div>
          
          {/* Tabs selector */}
          <div className="flex items-center bg-black/5 dark:bg-white/5 p-0.5 rounded-lg border border-black/5 dark:border-white/5">
            <button
              onClick={() => setActiveTab('logs')}
              className={`px-3 py-1 rounded-md text-[11px] font-semibold transition-all ${
                activeTab === 'logs'
                  ? 'bg-white dark:bg-white/10 text-black dark:text-white shadow-sm'
                  : 'text-black/55 dark:text-white/50 hover:text-black dark:hover:text-white'
              }`}
            >
              <span className="hidden sm:inline">Call History </span>Dashboard
            </button>
            <button
              onClick={() => setActiveTab('sandbox')}
              className={`px-4 py-1.5 rounded-lg text-[11px] font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === 'sandbox' ? 'bg-black/10 dark:bg-white/10 text-black dark:text-white' : 'text-black/50 dark:text-white/50 hover:text-black dark:hover:text-white'
              }`}
            >
              <Sparkles className="w-3 h-3 text-brand" />
              <span className="hidden sm:inline">Live Agent </span>Sandbox
            </button>
          </div>

          <div className="hidden md:block text-[11px] text-black/40 dark:text-white/40 font-mono">
            dashboard_v2.0.ts
          </div>
        </div>

        {/* Dashboard Grid Content */}
        <div className="grid grid-cols-12 h-auto md:h-[520px]">
          {/* Sidebar (col-span-3) */}
          <div className="col-span-12 md:col-span-3 border-r border-black/5 dark:border-white/5 bg-black/[0.02] dark:bg-black/30 p-4 flex flex-col justify-between overflow-y-auto">
            <div className="flex flex-col gap-5">
              {/* Compose Button */}
              <button
                onClick={() => setActiveTab('sandbox')}
                className="w-full rounded-lg bg-brand text-white text-xs font-semibold px-3 py-2.5 flex items-center gap-2 justify-center shadow-lg shadow-brand/20 hover:bg-brand/90 active:scale-95 transition-all"
              >
                <Sparkles className="w-4 h-4" />
                <span className="hidden sm:inline">Test Live Agent</span><span className="sm:hidden">Test</span>
              </button>

              {/* Navigation Items */}
              <div className="flex flex-col gap-1">
                <button
                  onClick={() => setActiveTab('logs')}
                  className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                    activeTab === 'logs' ? 'bg-black/5 dark:bg-white/10 text-black dark:text-white' : 'text-black/60 dark:text-white/60 hover:bg-black/5 dark:hover:bg-white/5'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <BarChart2 className="w-4 h-4 text-brand" />
                    <span>Call Dashboard</span>
                  </span>
                  <span className="text-[10px] bg-brand/10 dark:bg-brand/20 text-brand px-1.5 py-0.5 rounded font-mono font-bold">12</span>
                </button>

                <button
                  onClick={() => {
                    setActiveTab('logs');
                    setActiveScenarioId('1');
                  }}
                  className="flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium text-black/60 dark:text-white/60 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <PhoneCall className="w-4 h-4 text-emerald-500 animate-pulse" />
                    <span>Active Calls</span>
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                </button>

                <button className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium text-black/60 dark:text-white/60 hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                  <Volume2 className="w-4 h-4 text-violet-500" />
                  <span>Custom Voices</span>
                </button>
              </div>

              {/* Industries/Tags section */}
              <div>
                <span className="text-[10px] font-bold tracking-widest text-black/40 dark:text-white/40 uppercase block px-3 mb-2">
                  Scenarios
                </span>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2.5 px-3 py-1.5 text-xs text-black/70 dark:text-white/70">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#00d2ff]" />
                    <span>Restaurants</span>
                  </div>
                  <div className="flex items-center gap-2.5 px-3 py-1.5 text-xs text-black/70 dark:text-white/70">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#A4F4FD]" />
                    <span>Healthcare</span>
                  </div>
                  <div className="flex items-center gap-2.5 px-3 py-1.5 text-xs text-black/70 dark:text-white/70">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#8B5CF6]" />
                    <span>SaaS & Support</span>
                  </div>
                  <div className="flex items-center gap-2.5 px-3 py-1.5 text-xs text-black/70 dark:text-white/70">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#10b981]" />
                    <span>E-commerce</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Info Card */}
            <div className="p-3 rounded-lg border border-black/5 dark:border-white/5 bg-black/[0.02] dark:bg-white/[0.02] mt-4">
              <span className="text-[9px] font-bold text-brand uppercase block mb-1">ClieX Engine</span>
              <span className="text-[10px] text-black/60 dark:text-white/50 block leading-normal">
                Resolution Engine running at <strong className="text-black dark:text-white">98% efficiency</strong>.
              </span>
            </div>
          </div>

          {/* Conditional Middle and Right Rendering */}
          <AnimatePresence mode="wait">
            {activeTab === 'logs' ? (
              <React.Fragment key="logs-tab">
                {/* Call Log List (col-span-4) */}
                <div className="col-span-12 md:col-span-4 border-r border-black/5 dark:border-white/5 flex flex-col overflow-y-auto">
                  {/* Search bar */}
                  <div className="p-3 border-b border-black/5 dark:border-white/5 flex items-center gap-2">
                    <Search className="w-4 h-4 text-black/40 dark:text-white/40" />
                    <input
                      type="text"
                      placeholder="Search call logs..."
                      className="bg-transparent border-none outline-none text-xs text-black dark:text-white w-full placeholder-black/45 dark:placeholder-white/40"
                    />
                  </div>

                  {/* Scenario list */}
                  <div className="flex-1 divide-y divide-black/5 dark:divide-white/5">
                    {scenarios.map((sc) => (
                      <div
                        key={sc.id}
                        onClick={() => setActiveScenarioId(sc.id)}
                        className={`p-4 cursor-pointer transition-all duration-200 ${
                          activeScenarioId === sc.id
                            ? 'bg-black/5 dark:bg-white/5 border-l-2 border-brand'
                            : 'hover:bg-black/[0.02] dark:hover:bg-white/[0.01]'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-xs font-semibold text-black dark:text-white">
                            {sc.caller}
                          </span>
                          <span className="text-[10px] text-black/45 dark:text-white/40 font-mono">
                            {sc.time}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 mb-2">
                          <span
                            className="w-1.5 h-1.5 rounded-full"
                            style={{ backgroundColor: sc.tagColor }}
                          />
                          <span className="text-[10px] font-medium text-black/60 dark:text-white/50">
                            {sc.scenario}
                          </span>
                        </div>
                        <p className="text-[11px] text-black/50 dark:text-white/40 line-clamp-1 leading-normal">
                          {sc.aiSummary}
                        </p>
                        <div className="mt-2.5 flex items-center justify-between">
                          <span className="text-[9px] font-bold text-black/40 dark:text-white/40 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {sc.duration}
                          </span>
                          {sc.status === 'active' ? (
                            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-500 text-[8px] font-bold uppercase tracking-wider animate-pulse">
                              <span className="w-1 h-1 rounded-full bg-emerald-500" />
                              Live Call
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-black/5 dark:bg-white/5 text-black/50 dark:text-white/40 text-[8px] font-bold uppercase tracking-wider">
                              Completed
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Call Transcript Reader (col-span-5) */}
                <div className="col-span-12 md:col-span-5 p-4 flex flex-col justify-between overflow-y-auto">
                  {/* Top actions */}
                  <div className="flex items-center justify-between pb-3 border-b border-black/5 dark:border-white/5">
                    <div className="flex items-center gap-2">
                      <button className="p-1.5 rounded-md border border-black/10 dark:border-white/10 text-black/65 dark:text-white/60 hover:bg-black/5 dark:hover:bg-white/5 active:scale-95 transition-all flex items-center gap-1 text-[10px] font-semibold">
                        <Play className="w-3.5 h-3.5 fill-current text-brand" />
                        Play Recording
                      </button>
                      <button className="p-1.5 rounded-md border border-black/10 dark:border-white/10 text-black/65 dark:text-white/60 hover:bg-black/5 dark:hover:bg-white/5 active:scale-95 transition-all text-[10px] font-semibold">
                        Export CRM
                      </button>
                    </div>
                    <MoreHorizontal className="w-4 h-4 text-black/45 dark:text-white/40 cursor-pointer" />
                  </div>

                  {/* Transcript content */}
                  <div className="flex-1 py-4 flex flex-col gap-4 overflow-y-auto max-h-[360px] pr-1">
                    {/* Scenario header card */}
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white bg-gradient-to-br ${activeScenario.avatarGradient}`}>
                        {activeScenario.avatarText}
                      </div>
                      <div>
                        <h3 className="text-xs font-bold text-black dark:text-white">
                          {activeScenario.caller}
                        </h3>
                        <p className="text-[10px] text-black/45 dark:text-white/40">
                          Incoming Call · {activeScenario.time}
                        </p>
                      </div>
                      <span className="ml-auto px-2 py-0.5 rounded-full text-[9px] font-bold text-brand bg-brand/10 border border-brand/20 uppercase">
                        {activeScenario.tag}
                      </span>
                    </div>

                    {/* AI extracted intent block */}
                    <div className="p-3 rounded-lg border border-brand/20 bg-brand/5 dark:bg-brand/[0.02] flex gap-2">
                      <Sparkles className="w-4 h-4 text-brand shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-[10px] font-bold text-brand uppercase tracking-wider mb-1">
                          AI Intent Summary
                        </h4>
                        <p className="text-[10px] text-black/75 dark:text-white/70 leading-relaxed font-medium">
                          {activeScenario.aiSummary}
                        </p>
                      </div>
                    </div>

                    {/* Transcript bubbles */}
                    <div className="flex flex-col gap-2.5">
                      {activeScenario.transcript.map((line, idx) => (
                        <div
                          key={idx}
                          className={`flex flex-col ${
                            line.speaker === 'agent' ? 'items-start' : 'items-end'
                          }`}
                        >
                          <span className="text-[8px] font-bold tracking-wider text-black/40 dark:text-white/40 uppercase mb-0.5">
                            {line.speaker === 'agent' ? 'ClieX AI Agent' : activeScenario.caller}
                          </span>
                          <p
                            className={`text-[11px] leading-relaxed max-w-[85%] rounded-xl p-2.5 font-medium ${
                              line.speaker === 'agent'
                                ? 'bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 text-black dark:text-white rounded-tl-none'
                                : 'bg-brand text-white rounded-tr-none'
                            }`}
                          >
                            {line.text}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Footer status bar */}
                  <div className="pt-3 border-t border-black/5 dark:border-white/5 flex items-center justify-between text-[10px] text-black/45 dark:text-white/45 font-medium">
                    <span className="flex items-center gap-1">
                      <Phone className="w-3.5 h-3.5 text-brand" />
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
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="col-span-12 md:col-span-9 p-5 flex flex-col justify-between h-full bg-black/[0.01] dark:bg-black/10"
              >
                {/* Top sandbox banner */}
                <div className="flex items-center justify-between pb-3 border-b border-black/5 dark:border-white/5">
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-brand animate-bounce" />
                    <div>
                      <h3 className="text-xs font-bold text-black dark:text-white flex items-center gap-1.5">
                        Interactive AI Audio Simulator
                      </h3>
                      <p className="text-[10px] text-black/40 dark:text-white/40">
                        Synthesizing real-time voice response from text. Click mic to speak!
                      </p>
                    </div>
                  </div>
                  {/* Waveform indicator */}
                  {(isListening || isTyping) && (
                    <div className="flex items-center gap-0.5 h-4 select-none">
                      <span className="w-0.5 bg-brand animate-[bounce_0.8s_infinite_100ms] h-full" />
                      <span className="w-0.5 bg-brand animate-[bounce_0.8s_infinite_300ms] h-2/3" />
                      <span className="w-0.5 bg-brand animate-[bounce_0.8s_infinite_200ms] h-4/5" />
                      <span className="w-0.5 bg-brand animate-[bounce_0.8s_infinite_400ms] h-1/2" />
                      <span className="w-0.5 bg-brand animate-[bounce_0.8s_infinite_150ms] h-full" />
                    </div>
                  )}
                </div>

                {/* Simulated conversations container */}
                <div className="flex-1 py-4 flex flex-col gap-3.5 overflow-y-auto max-h-[330px] pr-1">
                  {sandboxMessages.map((msg, i) => (
                    <div
                      key={i}
                      className={`flex flex-col ${
                        msg.speaker === 'agent' ? 'items-start' : 'items-end'
                      }`}
                    >
                      <span className="text-[8px] font-bold tracking-wider text-black/40 dark:text-white/40 uppercase mb-0.5">
                        {msg.speaker === 'agent' ? 'ClieX AI Assistant' : 'You (Sandbox Caller)'}
                      </span>
                      <p
                        className={`text-[11px] leading-relaxed max-w-[80%] rounded-xl p-2.5 font-medium ${
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
                      <span className="text-[8px] font-bold tracking-wider text-black/40 dark:text-white/40 uppercase mb-0.5">
                        ClieX AI Assistant
                      </span>
                      <div className="bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 rounded-xl px-4 py-3 rounded-tl-none flex gap-1 items-center">
                        <span className="w-1.5 h-1.5 bg-black/40 dark:bg-white/40 rounded-full animate-bounce" />
                        <span className="w-1.5 h-1.5 bg-black/40 dark:bg-white/40 rounded-full animate-bounce [animation-delay:0.2s]" />
                        <span className="w-1.5 h-1.5 bg-black/40 dark:bg-white/40 rounded-full animate-bounce [animation-delay:0.4s]" />
                      </div>
                    </div>
                  )}
                </div>

                {/* Input sandbox bar */}
                <div className="pt-3 border-t border-black/5 dark:border-white/5 flex gap-2 items-center">
                  <button
                    onClick={handleMicClick}
                    className={`w-9 h-9 rounded-full flex items-center justify-center active:scale-90 transition-all ${
                      isListening
                        ? 'bg-red-500 text-white animate-pulse'
                        : 'bg-brand/10 text-brand hover:bg-brand/20'
                    }`}
                    title={isListening ? 'Listening... click to stop' : 'Click to talk / simulate voice input'}
                  >
                    <Mic className="w-4 h-4" />
                  </button>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleSendMessage(inputText);
                    }}
                    className="flex-1 flex gap-2"
                  >
                    <input
                      type="text"
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      placeholder={isListening ? 'Listening to voice... click mic to stop' : 'Try saying: "Book appointment", "Pizza order", or custom...'}
                      disabled={isListening}
                      className="flex-1 bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 rounded-full px-4 py-2 text-xs text-black dark:text-white outline-none focus:border-brand/40 dark:focus:border-brand/40 placeholder-black/45 dark:placeholder-white/45"
                    />
                    <button
                      type="submit"
                      className="bg-brand hover:bg-brand/90 text-white rounded-full px-4 py-2 text-xs font-semibold active:scale-95 transition-all"
                    >
                      Send
                    </button>
                  </form>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  );
};
