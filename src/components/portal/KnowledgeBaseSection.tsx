import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Upload, FileText, Globe, HelpCircle,
  Trash2, CheckCircle, AlertCircle, Loader2,
  Plus, X, ExternalLink, Search,
} from 'lucide-react';

interface KBDocument {
  id: string;
  name: string;
  type: 'pdf' | 'docx' | 'txt' | 'url';
  size: string;
  uploadDate: string;
  status: 'active' | 'processing' | 'failed';
}

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const STORAGE_KEY = 'cliex-kb';

const DEFAULT_DOCS: KBDocument[] = [
  { id: '1', name: 'Product FAQ Sheet.pdf', type: 'pdf', size: '2.4 MB', uploadDate: 'May 28, 2026', status: 'active' },
  { id: '2', name: 'Business Hours & Policies.docx', type: 'docx', size: '840 KB', uploadDate: 'May 27, 2026', status: 'active' },
  { id: '3', name: 'Menu & Pricing Guide.txt', type: 'txt', size: '128 KB', uploadDate: 'May 25, 2026', status: 'active' },
  { id: '4', name: 'https://cliexai.com/about', type: 'url', size: '—', uploadDate: 'May 24, 2026', status: 'active' },
];

const DEFAULT_FAQS: FAQItem[] = [
  { id: '1', question: 'What are your business hours?', answer: 'We are open Monday to Friday, 9 AM to 6 PM EST. Our AI agent is available 24/7.' },
  { id: '2', question: 'What payment methods do you accept?', answer: 'We accept all major credit cards, ACH bank transfers, and invoiced billing for Enterprise clients.' },
  { id: '3', question: 'How do I cancel my subscription?', answer: 'You can cancel anytime from the Settings page. Your service continues until the end of the billing period.' },
];

const TYPE_ICONS: Record<string, React.ReactNode> = {
  pdf:  <FileText className="w-5 h-5 text-red-400" />,
  docx: <FileText className="w-5 h-5 text-blue-400" />,
  txt:  <FileText className="w-5 h-5 text-white/50" />,
  url:  <Globe className="w-5 h-5 text-emerald-400" />,
};

const STATUS_BADGES: Record<string, { label: string; cls: string }> = {
  active:     { label: 'Active',     cls: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' },
  processing: { label: 'Processing', cls: 'bg-amber-500/10 text-amber-400 border-amber-500/20' },
  failed:     { label: 'Failed',     cls: 'bg-red-500/10 text-red-400 border-red-500/20' },
};

export const KnowledgeBaseSection: React.FC = () => {
  const [tab, setTab] = useState<'documents' | 'faqs'>('documents');
  const [docs, setDocs] = useState<KBDocument[]>(() => {
    try { const s = localStorage.getItem(STORAGE_KEY + '-docs'); return s ? JSON.parse(s) : DEFAULT_DOCS; } catch { return DEFAULT_DOCS; }
  });
  const [faqs, setFaqs] = useState<FAQItem[]>(() => {
    try { const s = localStorage.getItem(STORAGE_KEY + '-faqs'); return s ? JSON.parse(s) : DEFAULT_FAQS; } catch { return DEFAULT_FAQS; }
  });
  const [urlInput, setUrlInput] = useState('');
  const [showUrlForm, setShowUrlForm] = useState(false);
  const [editFaqId, setEditFaqId] = useState<string | null>(null);
  const [newFaq, setNewFaq] = useState({ question: '', answer: '' });
  const [showNewFaq, setShowNewFaq] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Persist
  useEffect(() => { localStorage.setItem(STORAGE_KEY + '-docs', JSON.stringify(docs)); }, [docs]);
  useEffect(() => { localStorage.setItem(STORAGE_KEY + '-faqs', JSON.stringify(faqs)); }, [faqs]);

  const handleFileDrop = (files: FileList | null) => {
    if (!files) return;
    Array.from(files).forEach(file => {
      const ext = file.name.split('.').pop()?.toLowerCase() || 'txt';
      const sizeKB = file.size / 1024;
      const newDoc: KBDocument = {
        id: Date.now().toString() + Math.random(),
        name: file.name,
        type: (ext as KBDocument['type']),
        size: sizeKB > 1024 ? `${(sizeKB / 1024).toFixed(1)} MB` : `${Math.round(sizeKB)} KB`,
        uploadDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        status: 'processing',
      };
      setDocs(prev => [newDoc, ...prev]);
      // Simulate processing
      setTimeout(() => {
        setDocs(prev => prev.map(d => d.id === newDoc.id ? { ...d, status: 'active' } : d));
      }, 2000 + Math.random() * 2000);
    });
    setIsDragging(false);
  };

  const addUrl = () => {
    if (!urlInput.trim()) return;
    const newDoc: KBDocument = {
      id: Date.now().toString(),
      name: urlInput.trim(),
      type: 'url',
      size: '—',
      uploadDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      status: 'processing',
    };
    setDocs(prev => [newDoc, ...prev]);
    setUrlInput('');
    setShowUrlForm(false);
    setTimeout(() => {
      setDocs(prev => prev.map(d => d.id === newDoc.id ? { ...d, status: 'active' } : d));
    }, 3000);
  };

  const removeDoc = (id: string) => setDocs(prev => prev.filter(d => d.id !== id));

  const addFaq = () => {
    if (!newFaq.question.trim() || !newFaq.answer.trim()) return;
    setFaqs(prev => [...prev, { id: Date.now().toString(), ...newFaq }]);
    setNewFaq({ question: '', answer: '' });
    setShowNewFaq(false);
  };

  const updateFaq = (id: string, field: 'question' | 'answer', value: string) => {
    setFaqs(prev => prev.map(f => f.id === id ? { ...f, [field]: value } : f));
  };

  const removeFaq = (id: string) => setFaqs(prev => prev.filter(f => f.id !== id));

  const filteredDocs = docs.filter(d => !searchQuery.trim() || d.name.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="flex flex-col gap-5 max-w-[1000px]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-extrabold text-white">Knowledge Base</h2>
          <p className="text-xs text-white/40 mt-0.5">Upload documents and manage FAQs to train your AI agent.</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setTab('documents')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${tab === 'documents' ? 'bg-brand text-white' : 'bg-white/5 text-white/50 hover:text-white/70'}`}
          >
            Documents ({docs.length})
          </button>
          <button
            onClick={() => setTab('faqs')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${tab === 'faqs' ? 'bg-brand text-white' : 'bg-white/5 text-white/50 hover:text-white/70'}`}
          >
            FAQs ({faqs.length})
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {tab === 'documents' ? (
          <motion.div key="docs" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} className="flex flex-col gap-4">
            {/* Drop zone */}
            <div
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={(e) => { e.preventDefault(); handleFileDrop(e.dataTransfer.files); }}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center gap-3 cursor-pointer transition-all ${
                isDragging ? 'border-brand bg-brand/5' : 'border-white/10 bg-white/[0.02] hover:border-white/20'
              }`}
            >
              <input ref={fileInputRef} type="file" multiple accept=".pdf,.docx,.doc,.txt" className="hidden" onChange={(e) => handleFileDrop(e.target.files)} />
              <Upload className={`w-8 h-8 ${isDragging ? 'text-brand' : 'text-white/30'}`} />
              <div className="text-center">
                <p className="text-xs font-semibold text-white/70">Drag & drop files here, or <span className="text-brand">browse</span></p>
                <p className="text-[10px] text-white/30 mt-1">PDF, DOCX, TXT — up to 10MB each</p>
              </div>
            </div>

            {/* URL import + search */}
            <div className="flex items-center gap-2">
              <div className="flex-1 relative">
                <Search className="w-4 h-4 text-white/30 absolute left-3 top-1/2 -translate-y-1/2" />
                <input type="text" placeholder="Search documents..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white/5 border border-white/[0.06] rounded-lg py-2 pl-9 pr-3 text-xs text-white outline-none focus:border-brand/40 placeholder-white/30"
                />
              </div>
              <button onClick={() => setShowUrlForm(!showUrlForm)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white/5 border border-white/[0.06] text-xs font-semibold text-white/60 hover:text-white/80 transition-all shrink-0"
              >
                <Globe className="w-3.5 h-3.5" /> Add URL
              </button>
            </div>

            {/* URL input */}
            <AnimatePresence>
              {showUrlForm && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                  <div className="flex gap-2">
                    <input type="url" value={urlInput} onChange={(e) => setUrlInput(e.target.value)} placeholder="https://example.com/faq"
                      className="flex-1 bg-white/5 border border-white/[0.06] rounded-lg py-2 px-3 text-xs text-white outline-none focus:border-brand/40 placeholder-white/30"
                    />
                    <button onClick={addUrl} className="px-4 py-2 bg-brand text-white rounded-lg text-xs font-semibold hover:bg-brand/90 active:scale-95 transition-all">Import</button>
                    <button onClick={() => setShowUrlForm(false)} className="p-2 text-white/30 hover:text-white/60"><X className="w-4 h-4" /></button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Document list */}
            <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl overflow-hidden divide-y divide-white/[0.04]">
              {filteredDocs.length === 0 ? (
                <div className="flex flex-col items-center py-12 text-white/25 gap-2">
                  <FileText className="w-8 h-8" />
                  <span className="text-xs">{searchQuery ? 'No documents match' : 'No documents uploaded yet'}</span>
                </div>
              ) : (
                filteredDocs.map((doc) => {
                  const badge = STATUS_BADGES[doc.status];
                  return (
                    <div key={doc.id} className="flex items-center gap-4 px-4 py-3 hover:bg-white/[0.02] transition-colors group">
                      <div className="shrink-0">{TYPE_ICONS[doc.type]}</div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-white truncate flex items-center gap-2">
                          {doc.name}
                          {doc.type === 'url' && <ExternalLink className="w-3 h-3 text-white/30 shrink-0" />}
                        </p>
                        <p className="text-[10px] text-white/35 mt-0.5">{doc.size} · {doc.uploadDate}</p>
                      </div>
                      <span className={`shrink-0 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold border ${badge.cls}`}>
                        {doc.status === 'processing' && <Loader2 className="w-3 h-3 animate-spin" />}
                        {doc.status === 'active' && <CheckCircle className="w-3 h-3" />}
                        {doc.status === 'failed' && <AlertCircle className="w-3 h-3" />}
                        {badge.label}
                      </span>
                      <button onClick={() => removeDoc(doc.id)}
                        className="shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-white/15 hover:text-red-400 hover:bg-red-500/10 opacity-0 group-hover:opacity-100 transition-all"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  );
                })
              )}
            </div>
          </motion.div>
        ) : (
          <motion.div key="faqs" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="flex flex-col gap-4">
            {/* FAQ list */}
            <div className="flex flex-col gap-3">
              {faqs.map((faq) => (
                <div key={faq.id} className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-4 group">
                  <div className="flex items-start justify-between gap-3">
                    <HelpCircle className="w-4 h-4 text-brand shrink-0 mt-0.5" />
                    <div className="flex-1 min-w-0">
                      {editFaqId === faq.id ? (
                        <div className="flex flex-col gap-2">
                          <input value={faq.question} onChange={(e) => updateFaq(faq.id, 'question', e.target.value)}
                            className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-brand/40"
                          />
                          <textarea value={faq.answer} onChange={(e) => updateFaq(faq.id, 'answer', e.target.value)} rows={2}
                            className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-brand/40 resize-none"
                          />
                          <button onClick={() => setEditFaqId(null)} className="self-end text-[10px] text-brand font-semibold">Done</button>
                        </div>
                      ) : (
                        <div onClick={() => setEditFaqId(faq.id)} className="cursor-pointer">
                          <p className="text-xs font-semibold text-white">{faq.question}</p>
                          <p className="text-[11px] text-white/45 mt-1 leading-relaxed">{faq.answer}</p>
                        </div>
                      )}
                    </div>
                    <button onClick={() => removeFaq(faq.id)}
                      className="shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-white/15 hover:text-red-400 hover:bg-red-500/10 opacity-0 group-hover:opacity-100 transition-all"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* New FAQ form */}
            <AnimatePresence>
              {showNewFaq ? (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                  className="bg-white/[0.03] border border-brand/20 rounded-xl p-4 flex flex-col gap-3 overflow-hidden"
                >
                  <input placeholder="Question" value={newFaq.question} onChange={(e) => setNewFaq({ ...newFaq, question: e.target.value })}
                    className="bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-xs text-white outline-none focus:border-brand/40 placeholder-white/30"
                  />
                  <textarea placeholder="Answer" value={newFaq.answer} onChange={(e) => setNewFaq({ ...newFaq, answer: e.target.value })} rows={3}
                    className="bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-xs text-white outline-none focus:border-brand/40 placeholder-white/30 resize-none"
                  />
                  <div className="flex gap-2 justify-end">
                    <button onClick={() => { setShowNewFaq(false); setNewFaq({ question: '', answer: '' }); }} className="px-3 py-1.5 text-xs text-white/40 hover:text-white/60">Cancel</button>
                    <button onClick={addFaq} className="px-4 py-1.5 bg-brand text-white rounded-lg text-xs font-semibold hover:bg-brand/90 active:scale-95 transition-all">Add FAQ</button>
                  </div>
                </motion.div>
              ) : (
                <button onClick={() => setShowNewFaq(true)}
                  className="flex items-center justify-center gap-2 py-3 rounded-xl border border-dashed border-white/10 text-xs text-white/40 hover:text-white/60 hover:border-white/20 transition-all"
                >
                  <Plus className="w-4 h-4" /> Add FAQ Entry
                </button>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
