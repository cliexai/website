import React, { useState } from 'react';
import { Check } from 'lucide-react';

interface Plan {
  tier: string;
  monthlyPrice: string;
  originalMonthlyPrice?: string;
  yearlyPrice: string;
  originalYearlyPrice?: string;
  setupFee: string;
  originalSetupFee?: string;
  desc: string;
  features: string[];
  isPro?: boolean;
}

export const Pricing: React.FC = () => {
  const [yearly, setYearly] = useState(false);

  const plans: Plan[] = [
    {
      tier: 'Starter',
      monthlyPrice: '$71',
      originalMonthlyPrice: '$119',
      yearlyPrice: '$57',
      originalYearlyPrice: '$95',
      setupFee: '$59 setup',
      originalSetupFee: '$99 setup',
      desc: 'Self-Serve/Basic Automation for small businesses.',
      features: [
        '24/7 inbound call answering',
        'Basic appointment booking',
        'Simple FAQ handling',
        'Lead capture (name, email, phone)',
        'Standard voice options',
        'And more...'
      ]
    },
    {
      tier: 'Professional',
      monthlyPrice: '$149',
      originalMonthlyPrice: '$249',
      yearlyPrice: '$119',
      originalYearlyPrice: '$199',
      setupFee: '$119 setup',
      originalSetupFee: '$199 setup',
      desc: 'Premium Done-For-You service with advanced workflows.',
      features: [
        'Multiple phone numbers/departments',
        'CRM integration',
        'Customizable call flows/scripts',
        'Advanced voice options',
        'Basic analytics dashboard',
        'And more...'
      ],
      isPro: true,
    },
    {
      tier: 'Enterprise',
      monthlyPrice: '$299+',
      originalMonthlyPrice: '$499+',
      yearlyPrice: '$239+',
      originalYearlyPrice: '$399+',
      setupFee: '$179+ setup',
      originalSetupFee: '$299+ setup',
      desc: 'Bespoke solutions for high-volume enterprise operations.',
      features: [
        'Multi-agent system',
        'Deep customization',
        'Advanced analytics & reporting',
        'Dedicated account manager',
        'Voice cloning & custom voice talent',
        'And more...'
      ]
    }
  ];

  return (
    <section id="pricing" className="c3-pricing-section">
      {/* SVG Noise filter defined exactly as requested */}
      <svg className="absolute w-0 h-0 pointer-events-none" style={{ visibility: 'hidden' }}>
        <defs>
          <filter id="c3-noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.5" numOctaves="2" stitchTiles="stitch" />
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.075" />
            </feComponentTransfer>
            <feComposite in2="SourceGraphic" operator="in" result="noise" />
            <feBlend in="SourceGraphic" in2="noise" mode="overlay" />
          </filter>
        </defs>
      </svg>

      {/* Yearly Toggle wrap */}
      <div className="c3-toggle-wrap">
        <span className="text-sm font-semibold text-black/60 dark:text-white/60">
          Billing Yearly (Save 20%)
        </span>
        <button
          onClick={() => setYearly(!yearly)}
          className={`c3-toggle ${yearly ? 'active' : ''}`}
          aria-label="Toggle yearly pricing"
        >
          <div className="c3-toggle-knob" />
        </button>
      </div>

      {/* Grid of pricing cards */}
      <div className="c3-grid">
        {plans.map((plan) => {
          const price = yearly ? plan.yearlyPrice : plan.monthlyPrice;
          const originalPrice = yearly ? plan.originalYearlyPrice : plan.originalMonthlyPrice;
          const billingSuffix = (price === 'Custom') 
            ? 'Retainer' 
            : (yearly ? '/mo, billed yearly' : '/mo');

          return (
            <div
              key={plan.tier}
              className={`c3-card ${plan.isPro ? 'c3-card-pro' : ''} relative`}
            >
              {/* Limited Offer Badge */}
              <div className="absolute top-0 right-0 bg-brand text-white px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider rounded-bl-xl shadow-lg flex items-center gap-1.5 border-b border-l border-white/10 z-10">
                <span>Limited Offer</span>
                <span className="bg-white text-brand px-1.5 py-0.5 rounded font-black text-[9px]">-40%</span>
              </div>

              <span className="c3-tier-small">{plan.tier}</span>
              <div className="flex flex-col mt-2">
                {originalPrice && (
                  <span className="text-sm text-black/50 dark:text-white/50 line-through decoration-brand/60 decoration-2 font-semibold">
                    {originalPrice}
                  </span>
                )}
                <span className="c3-tier-large !mt-0">{price}</span>
                <span className="text-xs text-black/45 dark:text-white/45 font-medium mt-1">
                  {billingSuffix}
                </span>
                <div className="flex items-center gap-2 mt-1.5">
                  {plan.originalSetupFee && (
                    <span className="text-[10px] text-black/40 dark:text-white/40 font-bold uppercase tracking-wider line-through decoration-brand/60">
                      {plan.originalSetupFee}
                    </span>
                  )}
                  <span className="text-[10px] text-brand font-bold uppercase tracking-wider">
                    {plan.setupFee}
                  </span>
                </div>
              </div>
              <p className="c3-desc">{plan.desc}</p>
              
              <ul className="c3-list">
                {plan.features.map((feat, idx) => (
                  <li key={idx}>
                    <span className="c3-check">
                      <Check className="w-3.5 h-3.5" />
                    </span>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
              
              <button
                onClick={() => {
                  window.location.href = `/get-started?plan=${encodeURIComponent(plan.tier)}`;
                }}
                className="c3-btn"
              >
                {plan.tier}
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
};
