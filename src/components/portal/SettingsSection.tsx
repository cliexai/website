import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  User, Bell, Shield, Trash2, LogOut,
  Save, AlertTriangle, CheckCircle, Loader2,
} from 'lucide-react';

interface SettingsData {
  businessName: string;
  phone: string;
  defaultVoice: string;
  greetingMessage: string;
  businessHours: boolean;
  emailNotifications: boolean;
  smsAlerts: boolean;
  weeklyReport: boolean;
}

const STORAGE_KEY = 'cliex-settings';

const DEFAULT_SETTINGS: SettingsData = {
  businessName: '',
  phone: '',
  defaultVoice: 'Chloe (Female, US)',
  greetingMessage: "Thank you for calling! How can I help you today?",
  businessHours: true,
  emailNotifications: true,
  smsAlerts: false,
  weeklyReport: true,
};

const VOICES = [
  'Chloe (Female, US)',
  'Aria (Female, US)',
  'Nova (Female, UK)',
  'Ethan (Male, US)',
  'Marcus (Male, UK)',
  'Sofia (Female, ES)',
  'Kenji (Male, JP)',
];

interface SettingsSectionProps {
  userName: string;
  userEmail: string;
  userAvatar?: string;
  onSignOut: () => void;
}

export const SettingsSection: React.FC<SettingsSectionProps> = ({
  userName, userEmail, userAvatar, onSignOut,
}) => {
  const [settings, setSettings] = useState<SettingsData>(() => {
    try { const s = localStorage.getItem(STORAGE_KEY); return s ? { ...DEFAULT_SETTINGS, ...JSON.parse(s) } : DEFAULT_SETTINGS; } catch { return DEFAULT_SETTINGS; }
  });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'profile' | 'agent' | 'notifications' | 'security'>('profile');

  useEffect(() => { localStorage.setItem(STORAGE_KEY, JSON.stringify(settings)); }, [settings]);

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }, 800);
  };

  const update = <K extends keyof SettingsData>(key: K, value: SettingsData[K]) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const ToggleSwitch: React.FC<{ checked: boolean; onChange: (v: boolean) => void }> = ({ checked, onChange }) => (
    <button onClick={() => onChange(!checked)}
      className={`relative w-10 h-5.5 rounded-full transition-colors ${checked ? 'bg-brand' : 'bg-white/10'}`}
      style={{ width: 40, height: 22 }}
    >
      <div className={`absolute top-0.5 w-[18px] h-[18px] rounded-full bg-white shadow transition-transform ${checked ? 'translate-x-[20px]' : 'translate-x-0.5'}`} />
    </button>
  );

  const tabs = [
    { id: 'profile' as const, label: 'Profile', icon: <User className="w-4 h-4" /> },
    { id: 'agent' as const, label: 'Agent', icon: <Bell className="w-4 h-4" /> },
    { id: 'notifications' as const, label: 'Notifications', icon: <Bell className="w-4 h-4" /> },
    { id: 'security' as const, label: 'Security', icon: <Shield className="w-4 h-4" /> },
  ];

  return (
    <div className="flex flex-col gap-5 max-w-[800px]">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-extrabold text-white">Settings</h2>
          <p className="text-xs text-white/40 mt-0.5">Manage your account, agent, and notification preferences.</p>
        </div>
        <button onClick={handleSave} disabled={saving}
          className="flex items-center gap-2 px-4 py-2 bg-brand text-white rounded-lg text-xs font-semibold hover:bg-brand/90 active:scale-95 transition-all disabled:opacity-50"
        >
          {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : saved ? <CheckCircle className="w-3.5 h-3.5" /> : <Save className="w-3.5 h-3.5" />}
          {saving ? 'Saving...' : saved ? 'Saved!' : 'Save Changes'}
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-white/[0.03] p-1 rounded-lg border border-white/[0.06]">
        {tabs.map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)}
            className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-md text-[11px] font-semibold transition-all ${
              activeTab === tab.id ? 'bg-white/10 text-white shadow-sm' : 'text-white/40 hover:text-white/60'
            }`}
          >
            {tab.icon} <span className="hidden sm:inline">{tab.label}</span>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {/* Profile tab */}
        {activeTab === 'profile' && (
          <motion.div key="profile" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex flex-col gap-5">
            {/* Avatar and info */}
            <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-5 flex items-center gap-5">
              {userAvatar ? (
                <>
                  <img src={userAvatar} alt="" referrerPolicy="no-referrer" className="w-16 h-16 rounded-full ring-2 ring-brand/30" onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.nextElementSibling?.classList.remove('hidden'); }} />
                  <div className="hidden w-16 h-16 rounded-full bg-brand/20 items-center justify-center ring-2 ring-brand/30">
                    <User className="w-8 h-8 text-brand" />
                  </div>
                </>
              ) : (
                <div className="w-16 h-16 rounded-full bg-brand/20 flex items-center justify-center ring-2 ring-brand/30">
                  <User className="w-8 h-8 text-brand" />
                </div>
              )}
              <div>
                <p className="text-sm font-bold text-white">{userName}</p>
                <p className="text-xs text-white/40 mt-0.5">{userEmail}</p>
                <p className="text-[10px] text-white/25 mt-1">Managed by Google OAuth · Cannot change email</p>
              </div>
            </div>

            {/* Editable fields */}
            <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-5 flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-white/50 uppercase tracking-wider">Business Name</label>
                <input value={settings.businessName} onChange={(e) => update('businessName', e.target.value)} placeholder="Your Business Name"
                  className="bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-xs text-white outline-none focus:border-brand/40 placeholder-white/25"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-white/50 uppercase tracking-wider">Phone Number</label>
                <input value={settings.phone} onChange={(e) => update('phone', e.target.value)} placeholder="+1 (555) 000-0000"
                  className="bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-xs text-white outline-none focus:border-brand/40 placeholder-white/25"
                />
              </div>
            </div>
          </motion.div>
        )}

        {/* Agent tab */}
        {activeTab === 'agent' && (
          <motion.div key="agent" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex flex-col gap-4">
            <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-5 flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-white/50 uppercase tracking-wider">Default Voice</label>
                <select value={settings.defaultVoice} onChange={(e) => update('defaultVoice', e.target.value)}
                  className="bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-xs text-white outline-none focus:border-brand/40"
                >
                  {VOICES.map(v => <option key={v} className="bg-[#0c0c0c]" value={v}>{v}</option>)}
                </select>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-white/50 uppercase tracking-wider">Greeting Message</label>
                <textarea value={settings.greetingMessage} onChange={(e) => update('greetingMessage', e.target.value)} rows={3}
                  className="bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-xs text-white outline-none focus:border-brand/40 resize-none"
                />
              </div>
              <div className="flex items-center justify-between py-2">
                <div>
                  <p className="text-xs font-semibold text-white">Business Hours Only</p>
                  <p className="text-[10px] text-white/35 mt-0.5">When off, agent answers 24/7</p>
                </div>
                <ToggleSwitch checked={settings.businessHours} onChange={(v) => update('businessHours', v)} />
              </div>
            </div>
          </motion.div>
        )}

        {/* Notifications tab */}
        {activeTab === 'notifications' && (
          <motion.div key="notifications" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-5 flex flex-col gap-1">
              {[
                { key: 'emailNotifications' as const, label: 'Email Notifications', desc: 'Receive call summaries and alerts via email' },
                { key: 'smsAlerts' as const, label: 'SMS Alerts', desc: 'Get text messages for missed calls and urgent events' },
                { key: 'weeklyReport' as const, label: 'Weekly Report', desc: 'Automated performance summary every Monday' },
              ].map(item => (
                <div key={item.key} className="flex items-center justify-between py-3.5 border-b border-white/[0.04] last:border-0">
                  <div>
                    <p className="text-xs font-semibold text-white">{item.label}</p>
                    <p className="text-[10px] text-white/35 mt-0.5">{item.desc}</p>
                  </div>
                  <ToggleSwitch checked={settings[item.key]} onChange={(v) => update(item.key, v)} />
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Security tab */}
        {activeTab === 'security' && (
          <motion.div key="security" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex flex-col gap-4">
            {/* Active sessions */}
            <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-5">
              <h3 className="text-xs font-bold text-white mb-4">Active Sessions</h3>
              <div className="flex items-center justify-between py-3 border-b border-white/[0.04]">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-brand/10 flex items-center justify-center">
                    <Shield className="w-4 h-4 text-brand" />
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold text-white">Current Session</p>
                    <p className="text-[10px] text-white/30">Windows · Chrome · {new Date().toLocaleDateString()}</p>
                  </div>
                </div>
                <span className="text-[9px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full font-bold">Active</span>
              </div>
            </div>

            {/* Sign out all */}
            <button onClick={onSignOut}
              className="flex items-center justify-center gap-2 py-3 rounded-xl border border-white/10 text-xs font-semibold text-white/50 hover:text-white hover:bg-white/5 transition-all"
            >
              <LogOut className="w-4 h-4" /> Sign Out of All Devices
            </button>

            {/* Danger zone */}
            <div className="bg-red-500/[0.03] border border-red-500/10 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle className="w-4 h-4 text-red-500" />
                <h3 className="text-xs font-bold text-red-400">Danger Zone</h3>
              </div>
              <p className="text-[11px] text-white/40 mb-4 leading-relaxed">
                Deleting your account is permanent. All data, call history, knowledge base, and settings will be erased and cannot be recovered.
              </p>
              <button onClick={() => setShowDeleteModal(true)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-red-500/30 text-xs font-semibold text-red-400 hover:bg-red-500/10 transition-all"
              >
                <Trash2 className="w-3.5 h-3.5" /> Delete Account
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete confirmation modal */}
      <AnimatePresence>
        {showDeleteModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-6"
            onClick={() => setShowDeleteModal(false)}
          >
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#111] border border-white/10 rounded-2xl p-6 w-full max-w-sm"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-red-500" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Delete Account?</h3>
                  <p className="text-[11px] text-white/40">This action cannot be undone.</p>
                </div>
              </div>
              <div className="flex gap-2 mt-6">
                <button onClick={() => setShowDeleteModal(false)} className="flex-1 py-2.5 rounded-lg border border-white/10 text-xs font-semibold text-white/60 hover:bg-white/5 transition-all">
                  Cancel
                </button>
                <button onClick={() => { setShowDeleteModal(false); onSignOut(); }}
                  className="flex-1 py-2.5 rounded-lg bg-red-500 text-white text-xs font-semibold hover:bg-red-600 transition-all"
                >
                  Delete Forever
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
