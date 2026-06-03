import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search, Play, Phone, PhoneCall, Clock,
  MoreHorizontal, Sparkles, Download, Filter,
  SmilePlus, Meh, Frown, X
} from 'lucide-react';

interface CallTranscriptLine {
  speaker: 'agent' | 'customer';
  text: string;
}

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
  sentiment: 'positive' | 'neutral' | 'negative';
  transcript: CallTranscriptLine[];
}

const SCENARIOS: CallScenario[] = [
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
    sentiment: 'positive',
    aiSummary: 'Customer ordered 1x Large Pepperoni Pizza and 1x Garlic Knots for delivery to 742 Evergreen Terrace. Total: $28.50. Estimated delivery: 35 mins.',
    transcript: [
      { speaker: 'agent', text: "Thanks for calling Mario's Pizza! How can I help you feed the family today?" },
      { speaker: 'customer', text: "Hey! I'd like to order a large Pepperoni pizza and a side of garlic knots, please." },
      { speaker: 'agent', text: "Great choice! That's one large Pepperoni and a side of garlic knots. Will that be for pickup or delivery?" },
      { speaker: 'customer', text: "Delivery to 742 Evergreen Terrace, please." },
      { speaker: 'agent', text: "Got it, 742 Evergreen Terrace. Your total is $28.50. We'll have that at your door in 35 minutes! Anything else?" },
      { speaker: 'customer', text: "No, that's everything. Thanks a lot!" },
      { speaker: 'agent', text: "My pleasure! Enjoy the pizza, Marcus!" },
    ],
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
    sentiment: 'positive',
    aiSummary: 'Customer scheduled a tooth cleaning appointment for Friday, May 29th at 2:00 PM. Confirmed text reminder sent.',
    transcript: [
      { speaker: 'agent', text: "Hello! Thank you for calling Apex Dental. This is Chloe, how can I assist you?" },
      { speaker: 'customer', text: "Hi Chloe, I'd like to book an appointment for a routine cleaning sometime this week if possible." },
      { speaker: 'agent', text: "I can absolutely help with that. Let me look... We have an opening this Friday, May 29th, at 2:00 PM. Does that work for you?" },
      { speaker: 'customer', text: "Yes, 2:00 PM on Friday is perfect." },
      { speaker: 'agent', text: "Wonderful. I have booked you for Friday at 2:00 PM with Dr. Reynolds. You will receive a text reminder shortly!" },
      { speaker: 'customer', text: "Awesome, thank you Chloe!" },
      { speaker: 'agent', text: "Of course! We look forward to seeing you, Sophia. Have a great day!" },
    ],
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
    sentiment: 'neutral',
    aiSummary: 'Customer requested a refund for an accidental subscription renewal. Agent validated billing history and escalated to finance for processing.',
    transcript: [
      { speaker: 'agent', text: "Thanks for calling ClieX Tech Support! How can I help you today?" },
      { speaker: 'customer', text: "Hi, my subscription renewed yesterday automatically, but I meant to cancel it. Can I get a refund?" },
      { speaker: 'agent', text: "I completely understand. Let me check your account. Yes, I see the renewal for $149.00. Since it renewed within 24 hours, you are eligible for a full refund." },
      { speaker: 'customer', text: "Oh, that's fantastic! Thank you." },
      { speaker: 'agent', text: "You're very welcome. I've initiated the refund, and it should show up on your card in 3 to 5 business days. Your subscription has been set to cancel." },
      { speaker: 'customer', text: "Perfect. I appreciate the quick help." },
      { speaker: 'agent', text: "Anytime, David. Have a wonderful rest of your day!" },
    ],
  },
  {
    id: '4',
    caller: 'Emily Rodriguez',
    scenario: 'Auto Repair Scheduling',
    avatarText: 'ER',
    avatarGradient: 'from-[#EC4899] to-[#BE185D]',
    duration: '2m 03s',
    time: 'Yesterday',
    status: 'completed',
    tag: 'Automotive',
    tagColor: '#EC4899',
    sentiment: 'positive',
    aiSummary: 'Customer booked a brake inspection for her 2022 Honda Civic on Monday at 10:00 AM at the downtown location.',
    transcript: [
      { speaker: 'agent', text: "Good morning! You've reached QuickFix Auto. How can I help you today?" },
      { speaker: 'customer', text: "Hi, I need to bring in my car for a brake inspection. They're making a squealing noise." },
      { speaker: 'agent', text: "I'm sorry to hear that, Emily. Let me check our schedule. We have an opening this Monday at 10:00 AM — would that work?" },
      { speaker: 'customer', text: "Monday morning works great." },
      { speaker: 'agent', text: "You're booked for Monday at 10 AM. We'll take a look at those brakes for you!" },
    ],
  },
  {
    id: '5',
    caller: 'James Park',
    scenario: 'Insurance Claim Inquiry',
    avatarText: 'JP',
    avatarGradient: 'from-[#6366F1] to-[#4338CA]',
    duration: '4m 18s',
    time: 'May 28',
    status: 'completed',
    tag: 'Insurance',
    tagColor: '#6366F1',
    sentiment: 'negative',
    aiSummary: 'Customer frustrated about delayed claim processing. Agent verified claim #CLM-87231, confirmed it\'s under review, and set a follow-up callback for Monday.',
    transcript: [
      { speaker: 'agent', text: "Thank you for calling SecureLife Insurance. How can I assist you today?" },
      { speaker: 'customer', text: "Yeah, I filed a claim two weeks ago and haven't heard anything back. This is ridiculous." },
      { speaker: 'agent', text: "I completely understand your frustration, James. Let me look into your claim right away. Can you provide your claim number?" },
      { speaker: 'customer', text: "It's CLM-87231." },
      { speaker: 'agent', text: "Thank you. I can see your claim is currently under review by our adjustments team. I'll flag this as urgent and schedule a follow-up call for you on Monday. Would that work?" },
      { speaker: 'customer', text: "Fine, but I expect someone to actually call this time." },
      { speaker: 'agent', text: "Absolutely. I've set the callback and added a priority note. You'll hear from us Monday morning." },
    ],
  },
];

const SENTIMENT_ICONS = {
  positive: <SmilePlus className="w-3.5 h-3.5 text-emerald-400" />,
  neutral:  <Meh className="w-3.5 h-3.5 text-amber-400" />,
  negative: <Frown className="w-3.5 h-3.5 text-red-400" />,
};

export const CallHistorySection: React.FC = () => {
  const [activeScenarioId, setActiveScenarioId] = useState('1');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'completed' | 'failed'>('all');
  const [showFilters, setShowFilters] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);

  const activeScenario = SCENARIOS.find(s => s.id === activeScenarioId) || SCENARIOS[0];

  const filtered = SCENARIOS.filter(sc => {
    if (statusFilter !== 'all' && sc.status !== statusFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return sc.caller.toLowerCase().includes(q) || sc.scenario.toLowerCase().includes(q) || sc.aiSummary.toLowerCase().includes(q);
    }
    return true;
  });

  const exportCSV = () => {
    const headers = ['Caller', 'Scenario', 'Duration', 'Time', 'Status', 'Sentiment', 'Summary'];
    const rows = SCENARIOS.map(s => [s.caller, s.scenario, s.duration, s.time, s.status, s.sentiment, `"${s.aiSummary}"`]);
    const csv = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'cliex-call-history.csv'; a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col lg:flex-row h-full overflow-hidden">
      {/* Call list panel */}
      <div className={`${showTranscript ? 'hidden lg:flex' : 'flex'} flex-col w-full lg:w-[380px] xl:w-[420px] border-r border-white/[0.06] shrink-0`}>
        {/* Search & filters */}
        <div className="p-4 border-b border-white/[0.06] flex flex-col gap-3 shrink-0">
          <div className="flex items-center gap-2">
            <div className="flex-1 relative">
              <Search className="w-4 h-4 text-white/30 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search calls..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/5 border border-white/[0.06] rounded-lg py-2 pl-9 pr-3 text-xs text-white outline-none focus:border-brand/40 placeholder-white/30 transition-colors"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`w-9 h-9 rounded-lg flex items-center justify-center border transition-all ${showFilters ? 'bg-brand/10 border-brand/30 text-brand' : 'bg-white/5 border-white/[0.06] text-white/40 hover:text-white/60'}`}
            >
              <Filter className="w-4 h-4" />
            </button>
            <button
              onClick={exportCSV}
              className="w-9 h-9 rounded-lg flex items-center justify-center bg-white/5 border border-white/[0.06] text-white/40 hover:text-white/60 transition-all"
              title="Export CSV"
            >
              <Download className="w-4 h-4" />
            </button>
          </div>
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="flex gap-1.5 overflow-hidden"
              >
                {(['all', 'active', 'completed', 'failed'] as const).map(status => (
                  <button
                    key={status}
                    onClick={() => setStatusFilter(status)}
                    className={`px-2.5 py-1 rounded-md text-[10px] font-semibold capitalize transition-all ${
                      statusFilter === status
                        ? 'bg-brand text-white'
                        : 'bg-white/5 text-white/40 hover:text-white/60'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Call list */}
        <div className="flex-1 overflow-y-auto divide-y divide-white/[0.04]">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-white/25 gap-2">
              <PhoneCall className="w-8 h-8" />
              <span className="text-xs">No calls match your filters</span>
            </div>
          ) : (
            filtered.map((sc) => (
              <div
                key={sc.id}
                onClick={() => { setActiveScenarioId(sc.id); setShowTranscript(true); }}
                className={`p-4 cursor-pointer transition-all duration-200 ${
                  activeScenarioId === sc.id ? 'bg-white/[0.04] border-l-2 border-brand' : 'hover:bg-white/[0.02] border-l-2 border-transparent'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[13px] font-semibold text-white">{sc.caller}</span>
                  <span className="text-[10px] text-white/35 font-mono">{sc.time}</span>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: sc.tagColor }} />
                  <span className="text-[11px] font-medium text-white/45 truncate">{sc.scenario}</span>
                  {SENTIMENT_ICONS[sc.sentiment]}
                </div>
                <p className="text-[11px] text-white/35 line-clamp-2 leading-relaxed">{sc.aiSummary}</p>
                <div className="mt-2.5 flex items-center justify-between">
                  <span className="text-[10px] font-bold text-white/35 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />{sc.duration}
                  </span>
                  {sc.status === 'active' ? (
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-500 text-[9px] font-bold uppercase tracking-wider animate-pulse">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Live
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-white/5 text-white/35 text-[9px] font-bold uppercase tracking-wider">
                      Completed
                    </span>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Transcript panel */}
      <div className={`${!showTranscript ? 'hidden lg:flex' : 'flex'} flex-col flex-1 h-full overflow-hidden bg-[#0c0c0c]`}>
        {/* Mobile back button */}
        <div className="lg:hidden p-3 border-b border-white/[0.06] shrink-0">
          <button onClick={() => setShowTranscript(false)} className="flex items-center gap-1.5 text-xs text-white/50 hover:text-white transition-colors">
            <X className="w-4 h-4" /> Back to list
          </button>
        </div>

        {/* Top actions */}
        <div className="flex items-center justify-between p-4 border-b border-white/[0.06] shrink-0">
          <div className="flex items-center gap-2">
            <button className="px-3 py-1.5 rounded-lg border border-white/10 text-white/70 hover:bg-white/5 active:scale-95 transition-all flex items-center gap-1.5 text-[11px] font-semibold">
              <Play className="w-3.5 h-3.5 fill-current text-brand" /> Play Recording
            </button>
            <button className="px-3 py-1.5 rounded-lg border border-white/10 text-white/70 hover:bg-white/5 active:scale-95 transition-all text-[11px] font-semibold">
              Export CRM
            </button>
          </div>
          <MoreHorizontal className="w-5 h-5 text-white/30 cursor-pointer hover:text-white" />
        </div>

        {/* Transcript content */}
        <div className="flex-1 p-5 flex flex-col gap-5 overflow-y-auto">
          {/* Scenario header */}
          <div className="flex items-center gap-4">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white bg-gradient-to-br ${activeScenario.avatarGradient}`}>
              {activeScenario.avatarText}
            </div>
            <div>
              <h3 className="text-sm font-bold text-white mb-0.5">{activeScenario.caller}</h3>
              <p className="text-[11px] text-white/40">Incoming Call · {activeScenario.time}</p>
            </div>
            <span className="ml-auto px-2.5 py-1 rounded-full text-[10px] font-bold text-brand bg-brand/10 border border-brand/20 uppercase tracking-wide">
              {activeScenario.tag}
            </span>
          </div>

          {/* AI summary */}
          <div className="p-4 rounded-xl border border-brand/20 bg-brand/[0.02] flex gap-3">
            <Sparkles className="w-4 h-4 text-brand shrink-0 mt-0.5" />
            <div>
              <h4 className="text-[11px] font-bold text-brand uppercase tracking-wider mb-1.5">AI Intent Summary</h4>
              <p className="text-xs text-white/70 leading-relaxed font-medium">{activeScenario.aiSummary}</p>
            </div>
          </div>

          {/* Sentiment badge */}
          <div className="flex items-center gap-2">
            {SENTIMENT_ICONS[activeScenario.sentiment]}
            <span className="text-[10px] font-bold text-white/40 uppercase tracking-wider">
              {activeScenario.sentiment} Sentiment
            </span>
          </div>

          {/* Transcript bubbles */}
          <div className="flex flex-col gap-3 pb-4">
            {activeScenario.transcript.map((line, idx) => (
              <div key={idx} className={`flex flex-col ${line.speaker === 'agent' ? 'items-start' : 'items-end'}`}>
                <span className="text-[9px] font-bold tracking-wider text-white/35 uppercase mb-1">
                  {line.speaker === 'agent' ? 'ClieX AI Agent' : activeScenario.caller}
                </span>
                <p className={`text-xs leading-relaxed max-w-[85%] rounded-2xl p-3.5 font-medium ${
                  line.speaker === 'agent'
                    ? 'bg-white/5 border border-white/5 text-white rounded-tl-sm'
                    : 'bg-brand text-white rounded-tr-sm'
                }`}>
                  {line.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-white/[0.06] flex items-center justify-between text-[11px] text-white/35 font-medium shrink-0">
          <span className="flex items-center gap-1.5">
            <Phone className="w-4 h-4 text-brand" /> Codec: Opus 24kHz High Definition
          </span>
          <span>Lat: 1.4s</span>
        </div>
      </div>
    </div>
  );
};
