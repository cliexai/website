import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';

/* ─────────────────────────────────────────────────────────────
   VoiceAgentButton
   ─────────────────────────────────────────────────────────────
   Visual overlay that sits on top of the (invisible) Retell widget.
   The real Retell widget at bottom-right handles all WebRTC / auth.
   We just forward clicks to it and mirror its visual state.
   ──────────────────────────────────────────────────────────── */

const MicIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2a3 3 0 0 1 3 3v7a3 3 0 0 1-6 0V5a3 3 0 0 1 3-3Z" />
    <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
    <line x1="12" y1="19" x2="12" y2="22" />
    <line x1="8" y1="22" x2="16" y2="22" />
  </svg>
);

const WaveBar = ({ delay }: { delay: number }) => (
  <span
    className="inline-block w-[3px] rounded-full bg-white animate-wave"
    style={{ animationDelay: `${delay}s` }}
  />
);

type Status = 'idle' | 'connecting' | 'active';

/* Inspect the Retell widget's shadow DOM to guess current state */
function detectRetellStatus(widget: Element): Status {
  const sr = (widget as HTMLElement & { shadowRoot: ShadowRoot | null }).shadowRoot;
  if (!sr) return 'idle';
  const text = sr.textContent ?? '';
  // If the widget shows "End" or "Listening" or "Speaking" it's active
  if (/end|listening|speaking|mute/i.test(text)) return 'active';
  // If it shows "Connecting" it's connecting
  if (/connect/i.test(text)) return 'connecting';
  return 'idle';
}

export const VoiceAgentButton: React.FC = () => {
  const [status, setStatus] = useState<Status>('idle');
  const [showHint, setShowHint] = useState(false);

  /* ── Find the real Retell widget button and click it ── */
  const clickRealWidget = useCallback(() => {
    const widget = document.querySelector('retell-widget');
    if (!widget) return;

    const sr = (widget as HTMLElement & { shadowRoot: ShadowRoot | null }).shadowRoot;
    if (sr) {
      const btn = sr.querySelector<HTMLElement>('button, [role="button"]');
      if (btn) { btn.click(); return; }
    }
    // Fallback: click the element itself
    (widget as HTMLElement).click();
  }, []);

  /* ── Poll widget shadow DOM for state changes ── */
  useEffect(() => {
    let raf: number;

    const poll = () => {
      const widget = document.querySelector('retell-widget');
      if (widget) {
        const next = detectRetellStatus(widget);
        setStatus(prev => prev !== next ? next : prev);
      }
      raf = requestAnimationFrame(poll);
    };

    raf = requestAnimationFrame(poll);
    return () => cancelAnimationFrame(raf);
  }, []);

  /* ── Auto-show hint tooltip after 3 s ── */
  useEffect(() => {
    const t = setTimeout(() => {
      setShowHint(true);
      setTimeout(() => setShowHint(false), 4000);
    }, 3000);
    return () => clearTimeout(t);
  }, []);

  const isActive     = status === 'active';
  const isConnecting = status === 'connecting';

  const label = isActive ? 'Tap to end call' : isConnecting ? 'Connecting…' : 'Talk to Chloe';

  return (
    /*
      z-[9999] puts us above the widget (z-9998).
      pointer-events-none on the wrapper lets clicks pass through to the real widget,
      except on the button itself which is pointer-events-auto.
    */
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end gap-2 pointer-events-none select-none">

      {/* Tooltip */}
      <AnimatePresence>
        {(showHint || isConnecting) && (
          <motion.div
            key="tip"
            initial={{ opacity: 0, y: 6, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="pointer-events-none mr-1 px-3 py-1.5 rounded-xl
              text-[11px] font-semibold tracking-wide text-right
              bg-white/90 dark:bg-[#111]/90 backdrop-blur-xl
              border border-black/10 dark:border-white/10
              text-black/70 dark:text-white/60
              shadow-xl max-w-[190px]"
          >
            {label}
          </motion.div>
        )}
      </AnimatePresence>

      {/* FAB + rings */}
      <div className="relative pointer-events-auto">

        {/* Idle attraction pulse */}
        {!isActive && !isConnecting && (
          <motion.div
            className="absolute inset-0 rounded-full bg-[#8B5CF6] pointer-events-none"
            animate={{ scale: [1, 1.85], opacity: [0.4, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut', repeatDelay: 4 }}
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

        {/* The button — clicking this forwards to the hidden Retell widget */}
        <motion.button
          id="voice-agent-fab"
          aria-label={isActive ? 'End call with Chloe' : 'Talk to Chloe, AI voice agent'}
          onClick={clickRealWidget}
          onMouseEnter={() => setShowHint(true)}
          onMouseLeave={() => setShowHint(false)}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.91 }}
          transition={{ type: 'spring', stiffness: 420, damping: 26 }}
          className={`
            relative w-14 h-14 rounded-full flex items-center justify-center
            text-white cursor-pointer outline-none overflow-hidden
            shadow-[0_8px_30px_rgba(0,0,0,0.30),0_2px_8px_rgba(0,0,0,0.18)]
            ring-2 transition-all duration-300
            ${isActive
              ? 'bg-gradient-to-br from-rose-600 to-red-500 ring-rose-500/50'
              : 'bg-gradient-to-br from-violet-700 to-[#8B5CF6] ring-[#8B5CF6]/40'
            }
          `}
        >
          {/* Gloss highlight */}
          <span className="absolute inset-0 rounded-full bg-gradient-to-b from-white/25 to-transparent pointer-events-none" />

          <AnimatePresence mode="wait">
            {isActive ? (
              <motion.div
                key="wave"
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                transition={{ duration: 0.18 }}
                className="flex items-center gap-[3.5px] h-6"
              >
                {[0, 0.1, 0.2, 0.3, 0.2, 0.1, 0].map((d, i) => (
                  <WaveBar key={i} delay={d} />
                ))}
              </motion.div>
            ) : isConnecting ? (
              <motion.div
                key="spin"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin"
              />
            ) : (
              <motion.div
                key="mic"
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.7 }}
                transition={{ duration: 0.18 }}
              >
                <MicIcon />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Label below button */}
      <AnimatePresence>
        {!isActive && (
          <motion.p
            key="lbl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-[10px] font-semibold tracking-widest uppercase
              text-black/30 dark:text-white/25 mr-0.5 pointer-events-none"
          >
            {isConnecting ? 'Connecting…' : 'Ask Chloe'}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};
