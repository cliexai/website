import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Plus, Search, MessageSquare, Clock, CheckCircle,
  AlertCircle, ArrowLeft, Send, Loader2,
} from 'lucide-react';

interface TicketMessage {
  from: 'client' | 'support';
  text: string;
  timestamp: string;
}

interface Ticket {
  id: string;
  subject: string;
  category: 'Billing' | 'Technical' | 'Agent Config' | 'Other';
  priority: 'low' | 'medium' | 'high';
  status: 'open' | 'in-progress' | 'resolved';
  createdAt: string;
  messages: TicketMessage[];
}

const STORAGE_KEY = 'cliex-tickets';

const DEFAULT_TICKETS: Ticket[] = [
  {
    id: 'TKT-001',
    subject: 'Agent not picking up calls after 6 PM',
    category: 'Technical',
    priority: 'high',
    status: 'in-progress',
    createdAt: 'May 28, 2026',
    messages: [
      { from: 'client', text: "Our voice agent stops answering calls after 6 PM EST. We have 24/7 coverage on our plan. Can you check?", timestamp: 'May 28, 10:15 AM' },
      { from: 'support', text: "Thanks for reporting this. I can see your agent's business hours are set to 9 AM – 6 PM. I've updated them to 24/7 and restarted the agent. Please test and let us know!", timestamp: 'May 28, 11:30 AM' },
      { from: 'client', text: "Confirmed! It's working now after hours. Thank you!", timestamp: 'May 28, 7:45 PM' },
    ],
  },
  {
    id: 'TKT-002',
    subject: 'Need to update billing address',
    category: 'Billing',
    priority: 'low',
    status: 'resolved',
    createdAt: 'May 25, 2026',
    messages: [
      { from: 'client', text: 'Can you update our billing address to 555 Oak Street, Suite 200, Austin TX 78701?', timestamp: 'May 25, 2:00 PM' },
      { from: 'support', text: 'Done! Your billing address has been updated. It will reflect on your next invoice.', timestamp: 'May 25, 3:15 PM' },
    ],
  },
  {
    id: 'TKT-003',
    subject: 'Custom greeting message for holiday hours',
    category: 'Agent Config',
    priority: 'medium',
    status: 'open',
    createdAt: 'May 30, 2026',
    messages: [
      { from: 'client', text: 'We need to set up a special holiday greeting for July 4th. The office will be closed but we want the agent to inform callers and take messages.', timestamp: 'May 30, 9:00 AM' },
    ],
  },
];

const STATUS_MAP = {
  'open':        { label: 'Open',        cls: 'bg-amber-500/10 text-amber-400 border-amber-500/20' },
  'in-progress': { label: 'In Progress', cls: 'bg-blue-500/10 text-blue-400 border-blue-500/20' },
  'resolved':    { label: 'Resolved',    cls: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' },
};

const PRIORITY_MAP = {
  low:    { label: 'Low',    cls: 'text-white/40' },
  medium: { label: 'Medium', cls: 'text-amber-400' },
  high:   { label: 'High',   cls: 'text-red-400' },
};

export const SupportSection: React.FC = () => {
  const [tickets, setTickets] = useState<Ticket[]>(() => {
    try { const s = localStorage.getItem(STORAGE_KEY); return s ? JSON.parse(s) : DEFAULT_TICKETS; } catch { return DEFAULT_TICKETS; }
  });
  const [view, setView] = useState<'list' | 'detail' | 'new'>('list');
  const [activeTicketId, setActiveTicketId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [replyText, setReplyText] = useState('');
  const [isSending, setIsSending] = useState(false);

  // New ticket form
  const [newTicket, setNewTicket] = useState({
    subject: '', category: 'Technical' as Ticket['category'], priority: 'medium' as Ticket['priority'], description: '',
  });

  useEffect(() => { localStorage.setItem(STORAGE_KEY, JSON.stringify(tickets)); }, [tickets]);

  const activeTicket = tickets.find(t => t.id === activeTicketId);

  const filtered = tickets.filter(t => {
    if (statusFilter !== 'all' && t.status !== statusFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return t.subject.toLowerCase().includes(q) || t.id.toLowerCase().includes(q);
    }
    return true;
  });

  const createTicket = () => {
    if (!newTicket.subject.trim() || !newTicket.description.trim()) return;
    const ticket: Ticket = {
      id: `TKT-${String(tickets.length + 1).padStart(3, '0')}`,
      subject: newTicket.subject,
      category: newTicket.category,
      priority: newTicket.priority,
      status: 'open',
      createdAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      messages: [{ from: 'client', text: newTicket.description, timestamp: new Date().toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' }) }],
    };
    setTickets(prev => [ticket, ...prev]);
    setNewTicket({ subject: '', category: 'Technical', priority: 'medium', description: '' });
    setActiveTicketId(ticket.id);
    setView('detail');
  };

  const sendReply = () => {
    if (!replyText.trim() || !activeTicketId) return;
    setIsSending(true);
    const msg: TicketMessage = {
      from: 'client',
      text: replyText,
      timestamp: new Date().toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' }),
    };
    setTickets(prev => prev.map(t => t.id === activeTicketId ? { ...t, messages: [...t.messages, msg] } : t));
    setReplyText('');

    // Simulate auto-reply
    setTimeout(() => {
      const autoReply: TicketMessage = {
        from: 'support',
        text: "Thank you for your message. A ClieX AI support engineer will review this and get back to you shortly. For urgent issues, please email support@cliexai.com.",
        timestamp: new Date().toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' }),
      };
      setTickets(prev => prev.map(t => t.id === activeTicketId ? { ...t, status: 'in-progress', messages: [...t.messages, autoReply] } : t));
      setIsSending(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col gap-5 max-w-[900px]">
      <AnimatePresence mode="wait">
        {/* ─── LIST VIEW ─── */}
        {view === 'list' && (
          <motion.div key="list" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-extrabold text-white">Support</h2>
                <p className="text-xs text-white/40 mt-0.5">{tickets.filter(t => t.status !== 'resolved').length} open tickets</p>
              </div>
              <button onClick={() => setView('new')}
                className="flex items-center gap-2 px-4 py-2.5 bg-brand text-white rounded-xl text-xs font-semibold hover:bg-brand/90 active:scale-95 transition-all shadow-lg shadow-brand/20 shrink-0"
              >
                <Plus className="w-4 h-4" /> New Ticket
              </button>
            </div>

            {/* Filters */}
            <div className="flex items-center gap-2">
              <div className="flex-1 relative">
                <Search className="w-4 h-4 text-white/30 absolute left-3 top-1/2 -translate-y-1/2" />
                <input type="text" placeholder="Search tickets..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white/5 border border-white/[0.06] rounded-lg py-2 pl-9 pr-3 text-xs text-white outline-none focus:border-brand/40 placeholder-white/30"
                />
              </div>
              <div className="flex gap-1.5">
                {['all', 'open', 'in-progress', 'resolved'].map(s => (
                  <button key={s} onClick={() => setStatusFilter(s)}
                    className={`px-2.5 py-1.5 rounded-md text-[10px] font-semibold capitalize transition-all ${statusFilter === s ? 'bg-brand text-white' : 'bg-white/5 text-white/40 hover:text-white/60'}`}
                  >
                    {s === 'all' ? 'All' : STATUS_MAP[s as keyof typeof STATUS_MAP]?.label || s}
                  </button>
                ))}
              </div>
            </div>

            {/* Ticket list */}
            <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl overflow-hidden divide-y divide-white/[0.04]">
              {filtered.length === 0 ? (
                <div className="flex flex-col items-center py-16 text-white/25 gap-2">
                  <MessageSquare className="w-8 h-8" />
                  <span className="text-xs">No tickets found</span>
                </div>
              ) : (
                filtered.map((ticket) => {
                  const status = STATUS_MAP[ticket.status];
                  const priority = PRIORITY_MAP[ticket.priority];
                  return (
                    <div key={ticket.id} onClick={() => { setActiveTicketId(ticket.id); setView('detail'); }}
                      className="flex items-center gap-4 px-4 py-3.5 hover:bg-white/[0.02] cursor-pointer transition-colors"
                    >
                      <div className="shrink-0">
                        {ticket.status === 'resolved' ? <CheckCircle className="w-5 h-5 text-emerald-500/60" /> :
                         ticket.status === 'in-progress' ? <Clock className="w-5 h-5 text-blue-400/60" /> :
                         <AlertCircle className="w-5 h-5 text-amber-400/60" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-white truncate">{ticket.subject}</p>
                        <p className="text-[10px] text-white/35 mt-0.5">
                          {ticket.id} · {ticket.category} · <span className={priority.cls}>{priority.label} priority</span>
                        </p>
                      </div>
                      <div className="text-right shrink-0">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-bold border ${status.cls}`}>
                          {status.label}
                        </span>
                        <p className="text-[9px] text-white/25 mt-1 font-mono">{ticket.createdAt}</p>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </motion.div>
        )}

        {/* ─── DETAIL VIEW ─── */}
        {view === 'detail' && activeTicket && (
          <motion.div key="detail" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="flex flex-col gap-4">
            <button onClick={() => setView('list')} className="flex items-center gap-1.5 text-xs text-white/40 hover:text-white/60 transition-colors self-start">
              <ArrowLeft className="w-4 h-4" /> Back to tickets
            </button>

            {/* Ticket header */}
            <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
                <h3 className="text-sm font-bold text-white">{activeTicket.subject}</h3>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[9px] font-bold border shrink-0 ${STATUS_MAP[activeTicket.status].cls}`}>
                  {STATUS_MAP[activeTicket.status].label}
                </span>
              </div>
              <p className="text-[10px] text-white/35">
                {activeTicket.id} · {activeTicket.category} · {activeTicket.priority} priority · Created {activeTicket.createdAt}
              </p>
            </div>

            {/* Messages */}
            <div className="flex flex-col gap-3 max-h-[50vh] overflow-y-auto pr-1">
              {activeTicket.messages.map((msg, idx) => (
                <div key={idx} className={`flex flex-col ${msg.from === 'client' ? 'items-end' : 'items-start'}`}>
                  <span className="text-[9px] font-bold text-white/30 uppercase tracking-wider mb-1">
                    {msg.from === 'client' ? 'You' : 'ClieX Support'}
                  </span>
                  <div className={`max-w-[80%] rounded-2xl p-3.5 text-xs leading-relaxed font-medium ${
                    msg.from === 'client'
                      ? 'bg-brand text-white rounded-tr-sm'
                      : 'bg-white/5 border border-white/5 text-white rounded-tl-sm'
                  }`}>
                    {msg.text}
                  </div>
                  <span className="text-[9px] text-white/20 mt-1 font-mono">{msg.timestamp}</span>
                </div>
              ))}
              {isSending && (
                <div className="flex flex-col items-start">
                  <span className="text-[9px] font-bold text-white/30 uppercase tracking-wider mb-1">ClieX Support</span>
                  <div className="bg-white/5 border border-white/5 rounded-2xl px-5 py-3 rounded-tl-sm flex gap-1.5 items-center">
                    <span className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce" />
                    <span className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce [animation-delay:0.2s]" />
                    <span className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              )}
            </div>

            {/* Reply bar */}
            {activeTicket.status !== 'resolved' && (
              <form onSubmit={(e) => { e.preventDefault(); sendReply(); }} className="flex gap-2 items-center pt-2 border-t border-white/[0.06]">
                <input type="text" value={replyText} onChange={(e) => setReplyText(e.target.value)} placeholder="Type your reply..."
                  className="flex-1 bg-white/5 border border-white/[0.06] rounded-lg py-2.5 px-4 text-xs text-white outline-none focus:border-brand/40 placeholder-white/30"
                />
                <button type="submit" disabled={isSending || !replyText.trim()}
                  className="px-4 py-2.5 bg-brand text-white rounded-lg text-xs font-semibold hover:bg-brand/90 active:scale-95 transition-all disabled:opacity-50 flex items-center gap-1.5 shrink-0"
                >
                  {isSending ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />} Reply
                </button>
              </form>
            )}
          </motion.div>
        )}

        {/* ─── NEW TICKET VIEW ─── */}
        {view === 'new' && (
          <motion.div key="new" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="flex flex-col gap-4">
            <button onClick={() => setView('list')} className="flex items-center gap-1.5 text-xs text-white/40 hover:text-white/60 transition-colors self-start">
              <ArrowLeft className="w-4 h-4" /> Back to tickets
            </button>

            <div>
              <h2 className="text-lg font-extrabold text-white">New Support Ticket</h2>
              <p className="text-xs text-white/40 mt-0.5">Describe your issue and we'll get back to you within 24 hours.</p>
            </div>

            <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-5 flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-white/50 uppercase tracking-wider">Subject</label>
                <input value={newTicket.subject} onChange={(e) => setNewTicket({ ...newTicket, subject: e.target.value })} placeholder="Brief description of your issue"
                  className="bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-xs text-white outline-none focus:border-brand/40 placeholder-white/30"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-white/50 uppercase tracking-wider">Category</label>
                  <select value={newTicket.category} onChange={(e) => setNewTicket({ ...newTicket, category: e.target.value as Ticket['category'] })}
                    className="bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-xs text-white outline-none focus:border-brand/40"
                  >
                    <option className="bg-[#0c0c0c]" value="Technical">Technical</option>
                    <option className="bg-[#0c0c0c]" value="Billing">Billing</option>
                    <option className="bg-[#0c0c0c]" value="Agent Config">Agent Config</option>
                    <option className="bg-[#0c0c0c]" value="Other">Other</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-white/50 uppercase tracking-wider">Priority</label>
                  <select value={newTicket.priority} onChange={(e) => setNewTicket({ ...newTicket, priority: e.target.value as Ticket['priority'] })}
                    className="bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-xs text-white outline-none focus:border-brand/40"
                  >
                    <option className="bg-[#0c0c0c]" value="low">Low</option>
                    <option className="bg-[#0c0c0c]" value="medium">Medium</option>
                    <option className="bg-[#0c0c0c]" value="high">High</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-white/50 uppercase tracking-wider">Description</label>
                <textarea value={newTicket.description} onChange={(e) => setNewTicket({ ...newTicket, description: e.target.value })} rows={5}
                  placeholder="Describe your issue in detail. Include any relevant IDs, screenshots, or steps to reproduce..."
                  className="bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-xs text-white outline-none focus:border-brand/40 placeholder-white/30 resize-none"
                />
              </div>

              <button onClick={createTicket} disabled={!newTicket.subject.trim() || !newTicket.description.trim()}
                className="w-full py-3 bg-brand text-white rounded-xl text-xs font-semibold hover:bg-brand/90 active:scale-[0.98] transition-all shadow-lg shadow-brand/20 disabled:opacity-50"
              >
                Submit Ticket
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
