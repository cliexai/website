import React from 'react';

const CHLOE_AVATAR = 'https://lh3.googleusercontent.com/aida-public/AB6AXuDLcyVA__nh6rMNDiQujAC1iFU7_meFT-RQaa5nB_ZVXiuFBn8qjUaOFSrt7cHvgqvt0y5goDSj8J52FQRe0KPwbijhI3Io7Lg7WWPdDX8-U9LkP1uq14Kd5CjkDCif82ZuKgxcIAmFDyGq1dHCC_fDQFOy0C4RvGjISckCBu5KiLd-_w0Q3-quLMacuukZAird6NWCZad_kbrWGX6PH2s2vKBE7oNZfLtxY0CtK0XK8q-AT6RkeBK2BAsTsXSz7EGl5BHsFIZzpfM';

export const ChloeChat: React.FC = () => {
  return (
    <div
      id="ask-chloe-fab"
      className="fixed bottom-6 right-6 z-[101] bg-white/10 backdrop-blur-2xl border border-white/20 text-white px-6 py-4 rounded-full shadow-2xl flex items-center gap-3 opacity-60 cursor-default select-none pointer-events-none"
      style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.25), 0 8px 32px rgba(0,0,0,0.25), 0 2px 8px rgba(0,0,0,0.15)' }}
    >
      <div className="w-8 h-8 rounded-full overflow-hidden bg-white/10 flex items-center justify-center ring-1 ring-white/20">
        <img alt="Chloe" className="w-full h-full object-cover" src={CHLOE_AVATAR} />
      </div>
      <span className="font-bold text-label-md">Ask Chloe</span>
    </div>
  );
};
