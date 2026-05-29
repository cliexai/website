import React, { useState } from 'react';
import { Check } from 'lucide-react';

interface Plan {
  tier: string;
  monthlyPrice: string;
  yearlyPrice: string;
  setupFee: string;
  desc: string;
  features: string[];
  isPro?: boolean;
}

export const Pricing: React.FC = () => {
  const [yearly, setYearly] = useState(false);

  const plans: Plan[] = [
    {
      tier: 'Starter',
      monthlyPrice: '$100',
      yearlyPrice: '$80', // equivalent or absolute
      setupFee: '$50 setup fee',
      desc: 'For small businesses starting their automation journey.',
      features: [
        '1 Custom AI Voice Agent',
        '30 days storage for recordings',
        'Basic calendar & database sync',
        'Standard business hours support',
        'Access via dashboard console'
      ]
    },
    {
      tier: 'Growth',
      monthlyPrice: '$150',
      yearlyPrice: '$120',
      setupFee: '$100 setup fee',
      desc: 'For growing businesses requiring flexibility and priority handling.',
      features: [
        '5 Custom AI Voice Agents',
        '90 days storage for recordings',
        'Advanced database & CRM sync',
        'Multi-language support (29+ languages)',
        'Priority customer support queue'
      ]
    },
    {
      tier: 'Premium',
      isPro: true,
      monthlyPrice: '$300',
      yearlyPrice: '$240',
      setupFee: '$200 setup fee',
      desc: 'For enterprise creators requiring custom setups and dedicated hosting.',
      features: [
        'Unlimited AI Voice Agents',
        '365 days storage for recordings',
        'Custom POS & database integration',
        'Voice cloning & custom accents',
        'Dedicated account manager (24/7)'
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
          const billingSuffix = yearly ? '/mo, billed yearly' : '/mo';
          return (
            <div
              key={plan.tier}
              className={`c3-card ${plan.isPro ? 'c3-card-pro' : ''}`}
            >
              <span className="c3-tier-small">{plan.tier}</span>
              <div className="flex flex-col">
                <span className="c3-tier-large">{price}</span>
                <span className="text-xs text-black/45 dark:text-white/45 font-medium mt-1">
                  {billingSuffix}
                </span>
                <span className="text-[10px] text-brand font-bold uppercase tracking-wider mt-1.5">
                  {plan.setupFee}
                </span>
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
                Choose {plan.tier}
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
};
