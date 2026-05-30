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
      monthlyPrice: '$199',
      yearlyPrice: '$159',
      setupFee: '$499 setup fee',
      desc: 'Self-Serve/Basic Automation for small businesses.',
      features: [
        '1 Inbound Agent',
        'Standard FAQs',
        'Email Support',
        '1,000 Call Minutes/mo'
      ]
    },
    {
      tier: 'Pro Growth',
      monthlyPrice: '$499',
      yearlyPrice: '$399',
      setupFee: '$1,499 setup fee',
      desc: 'Premium Done-For-You service with advanced workflows.',
      features: [
        '3 Specialized Agents (In/Out)',
        'Full CRM & Calendar Sync',
        'Smart Human Handoff',
        '2,500 Call Minutes/mo',
        'Priority Support'
      ],
      isPro: true,
    },
    {
      tier: 'Enterprise',
      monthlyPrice: 'Custom',
      yearlyPrice: 'Custom',
      setupFee: 'Custom Setup ($3,000+)',
      desc: 'Bespoke solutions for high-volume enterprise operations.',
      features: [
        'Custom Voice Cloning',
        'Multi-Language Switching',
        'Dedicated Server',
        'HIPAA/PCI Compliance',
        'Dedicated Account Manager'
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
          const billingSuffix = (price === 'Custom') 
            ? 'Retainer' 
            : (yearly ? '/mo, billed yearly' : '/mo');

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
