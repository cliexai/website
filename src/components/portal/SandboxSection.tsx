import React, { useState } from 'react';

export const SandboxSection: React.FC = () => {
  const [isActive, setIsActive] = useState(true);
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-container-max mx-auto w-full">
      
<div className="flex flex-col gap-stack-lg">

<div className="flex justify-between items-end">
<div>
<h2 className="font-headline-lg text-headline-lg text-on-surface">My Agent Configuration</h2>
<p className="text-on-surface-variant mt-2 max-w-2xl font-body-md">Tailor your AI agent's identity and interaction style. Changes take effect immediately across all connected channels.</p>
</div>
<div className="bg-surface-container-low rounded-xl p-4 flex items-center gap-4 shadow-sm border border-outline-variant">
<div className="flex flex-col">
<span className="text-label-md font-bold text-on-surface-variant">Agent Status</span>
<span className={isActive ? "text-primary font-bold" : "text-on-surface-variant font-bold"} id="status-text">{isActive ? "Active" : "Paused"}</span>
</div>
<label className="relative inline-flex items-center cursor-pointer">
<input defaultChecked className="sr-only peer" onChange={(e) => setIsActive(e.target.checked)} type="checkbox" />
<div className="w-14 h-8 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:start-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-primary"></div>
</label>
</div>
</div>

<div className="grid grid-cols-12 gap-gutter">

<div className="col-span-12 lg:col-span-8 bg-surface-container rounded-xl p-stack-md shadow-xl border border-outline-variant">
<h3 className="font-headline-md text-headline-md mb-stack-md flex items-center gap-2">
<span className="material-symbols-outlined text-primary">edit_note</span>
                        Core Identity
                    </h3>
<form className="space-y-stack-md">

<div className="flex flex-col gap-2">
<label className="font-label-md text-on-surface-variant ml-1">Agent Name</label>
<input className="bg-surface-container-low border border-outline-variant rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-on-surface" placeholder="Enter a name for your agent" type="text" value="ClieX AI Assistant" />
</div>

<div className="flex flex-col gap-2">
<label className="font-label-md text-on-surface-variant ml-1">Primary Language</label>
<select className="bg-surface-container-low border border-outline-variant rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-on-surface appearance-none">
<option>English (US) - Professional Neutral</option>
<option>English (UK) - Sophisticated</option>
<option>Spanish (ES) - Warm &amp; Friendly</option>
<option>German (DE) - Technical &amp; Precise</option>
<option>French (FR) - Elegant</option>
</select>
</div>

<div className="flex flex-col gap-2">
<label className="font-label-md text-on-surface-variant ml-1">Initial Greeting Message</label>
<textarea className="bg-surface-container-low border border-outline-variant rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none text-on-surface" rows={4}>Hello! Thank you for calling ClieX AI. My name is Alex, your dedicated voice assistant. How can I assist you with our AI services today?</textarea>
<span className="text-caption text-on-surface-variant text-right">142 / 500 characters</span>
</div>

<div className="pt-stack-md flex justify-end gap-stack-sm">
<button className="px-6 py-3 border border-outline text-on-surface-variant font-label-md rounded-lg hover:bg-surface-container-high hover:text-on-surface transition-all" type="button">Discard Changes</button>
<button className="px-10 py-3 bg-primary text-on-primary font-bold font-label-md rounded-lg shadow-lg shadow-primary/20 hover:-translate-y-0.5 active:scale-95 transition-all" type="submit">Save Changes</button>
</div>
</form>
</div>

<div className="col-span-12 lg:col-span-4 flex flex-col gap-gutter">

<div className="bg-surface-container-low rounded-xl p-stack-md border border-outline-variant overflow-hidden relative group">
<div className="flex justify-between items-start mb-stack-md relative z-10">
<h3 className="font-label-md text-on-surface-variant uppercase tracking-widest">Voice Preview</h3>
<button className="p-2 bg-primary rounded-full text-on-primary shadow-md hover:scale-110 active:scale-90 transition-all">
<span className="material-symbols-outlined" style={{ fontVariationSettings: '\'FILL\' 1' }}>play_arrow</span>
</button>
</div>
<div className="flex items-center justify-center gap-1.5 h-32 mb-stack-md relative z-10">
<div className="voice-bar w-1.5 bg-primary rounded-full" style={{ animationDelay: '0.1s' }}></div>
<div className="voice-bar w-1.5 bg-primary/60 rounded-full" style={{ animationDelay: '0.3s' }}></div>
<div className="voice-bar w-1.5 bg-primary rounded-full" style={{ animationDelay: '0.2s' }}></div>
<div className="voice-bar w-1.5 bg-primary/40 rounded-full" style={{ animationDelay: '0.5s' }}></div>
<div className="voice-bar w-1.5 bg-primary rounded-full" style={{ animationDelay: '0.4s' }}></div>
<div className="voice-bar w-1.5 bg-primary/60 rounded-full" style={{ animationDelay: '0.6s' }}></div>
<div className="voice-bar w-1.5 bg-primary rounded-full" style={{ animationDelay: '0.1s' }}></div>
<div className="voice-bar w-1.5 bg-primary/60 rounded-full" style={{ animationDelay: '0.3s' }}></div>
<div className="voice-bar w-1.5 bg-primary rounded-full" style={{ animationDelay: '0.2s' }}></div>
</div>
<div className="text-center relative z-10">
<p className="font-label-md text-on-surface-variant mb-1">Current Voice Model</p>
<p className="font-bold text-primary">Quantum-Neural V4 (BETA)</p>
</div>
<div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
</div>

<div className="bg-surface-container-highest rounded-xl p-stack-md text-on-surface shadow-md border border-outline-variant">
<div className="flex items-center gap-3 mb-4">
<span className="material-symbols-outlined text-primary">tips_and_updates</span>
<p className="font-bold">Configuration Tips</p>
</div>
<p className="text-caption text-on-surface-variant leading-relaxed">
                            Clear and concise greeting messages improve user engagement by up to 40%. Try to keep your opening statement under 15 seconds of spoken time for optimal performance.
                        </p>
<div className="mt-4 pt-4 border-t border-outline-variant">
<a className="text-primary font-label-md flex items-center gap-1 hover:underline" href="#">
                                Read Documentation 
                                <span className="material-symbols-outlined text-sm">open_in_new</span>
</a>
</div>
</div>
</div>
</div>

<div className="bg-surface-container-high rounded-xl p-stack-md border border-outline-variant grid grid-cols-1 md:grid-cols-3 gap-stack-md">
<div className="flex gap-4">
<div className="h-12 w-12 bg-surface-container-low border border-outline-variant rounded-lg flex items-center justify-center text-primary">
<span className="material-symbols-outlined">speed</span>
</div>
<div>
<h4 className="font-bold text-on-surface">Response Speed</h4>
<p className="text-caption text-on-surface-variant">Fast (150ms latency)</p>
</div>
</div>
<div className="flex gap-4">
<div className="h-12 w-12 bg-surface-container-low border border-outline-variant rounded-lg flex items-center justify-center text-primary">
<span className="material-symbols-outlined">psychology</span>
</div>
<div>
<h4 className="font-bold text-on-surface">Intelligence Level</h4>
<p className="text-caption text-on-surface-variant">GPT-4 Omni Powered</p>
</div>
</div>
<div className="flex gap-4">
<div className="h-12 w-12 bg-surface-container-low border border-outline-variant rounded-lg flex items-center justify-center text-primary">
<span className="material-symbols-outlined">security</span>
</div>
<div>
<h4 className="font-bold text-on-surface">Privacy Guard</h4>
<p className="text-caption text-on-surface-variant">PII Masking Enabled</p>
</div>
</div>
</div>
</div>

    </div>
  );
};
