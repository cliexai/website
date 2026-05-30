import React from 'react';
import { LogoMark } from './SharedPrimitives';
import { Globe, ArrowUpRight, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  const socialLinks = [
    {
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
          <rect x="2" y="9" width="4" height="12"></rect>
          <circle cx="4" cy="4" r="2"></circle>
        </svg>
      ),
      href: 'https://www.linkedin.com/in/cliexai',
      label: 'LinkedIn'
    },
    {
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
        </svg>
      ),
      href: 'https://www.instagram.com/cliexai/',
      label: 'Instagram'
    },
    {
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
      href: 'https://x.com/cliex_ai',
      label: 'X/Twitter'
    },
    {
      icon: (
        <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      ),
      href: 'https://wa.me/8801568031212',
      label: 'WhatsApp'
    },
    {
      icon: <Mail className="w-4 h-4" />,
      href: 'https://mail.google.com/mail/?view=cm&fs=1&to=cliexai@gmail.com',
      label: 'Email'
    }
  ];

  type FooterItem = { label: string; href?: string; type?: 'header'; badge?: string; highlight?: boolean };
  const linkSections: { title: string; items: FooterItem[] }[] = [
    {
      title: 'Solutions',
      items: [
        { type: 'header', label: 'By Industry' },
        { label: 'Real Estate', href: '#services' },
        { label: 'E-commerce', href: '#services' },
        { label: 'Healthcare & Clinics', href: '#services' },
        { label: 'Financial Services', href: '#services' },
        { label: 'Automotive Dealerships', href: '#services' },
        { type: 'header', label: 'By Use Case' },
        { label: 'Lead Generation', href: '#lead-form' },
        { label: 'Appointment Booking', href: '#lead-form' },
        { label: '24/7 Customer Support', href: '#services' },
      ]
    },
    {
      title: 'Product',
      items: [
        { label: 'Voice Agent Console', href: '#services' },
        { label: 'Multi-LLM Routing', href: '#services' },
        { label: 'Twilio Integration', href: '#services' },
        { label: 'Multilingual Engine', href: '#services' },
        { label: 'Instant API Webhooks', href: '#services' },
        { label: 'Simple Pricing', href: '#pricing' },
      ]
    },
    {
      title: 'Resources',
      items: [
        { label: 'Documentation', href: '#faq', badge: 'API' },
        { label: 'Integration Guides', href: '#faq' },
        { label: 'Voice Demo Gallery', href: '#services' },
        { label: 'Agency Blog', href: '#services' },
        { label: 'FAQ Support', href: '#faq' },
      ]
    },
    {
      title: 'Sales & Support',
      items: [
        { label: 'Book a Demo Call', href: '#lead-form', highlight: true },
        { label: 'WhatsApp Sales', href: 'https://wa.me/8801568031212' },
        { label: 'Email Outreach', href: 'https://mail.google.com/mail/?view=cm&fs=1&to=cliexai@gmail.com' },
        { type: 'header', label: 'Legal' },
        { label: 'Privacy Policy', href: '#' },
        { label: 'Terms of Use', href: '#' },
        { label: 'Data Security (DPA)', href: '#' },
      ]
    }
  ];

  return (
    <footer className="w-full relative z-10 border-t border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-[#0c0c0c]/80 backdrop-blur-md py-16 md:py-20">
      <div className="max-w-6xl mx-auto px-6 flex flex-col lg:flex-row gap-12 lg:gap-8 justify-between">
        
        {/* Left Column - Brand & Info */}
        <div className="flex flex-col items-start max-w-sm lg:w-1/4">
          <a href="#" className="flex items-center gap-2 text-brand mb-4 group select-none">
            <LogoMark className="w-8 h-8 text-brand group-hover:scale-110 transition-transform duration-300" />
            <span className="text-base font-black tracking-wider uppercase text-black dark:text-white">
              ClieX AI
            </span>
          </a>
          <p className="text-xs text-black/55 dark:text-white/55 leading-relaxed font-medium">
            Building 24/7 AI Voice Agents that operate at native fluency to book leads, secure appointments, and boost business revenues.
          </p>
          
          <div className="mt-4 flex flex-wrap gap-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 text-[9px] text-brand font-bold uppercase select-none">
              <Globe className="w-3 h-3" />
              <span>Global Delivery & Hosting</span>
            </div>
          </div>

          {/* Creative Status Badge */}
          <div className="mt-6 flex items-center gap-2 select-none border border-black/5 dark:border-white/5 bg-black/[0.02] dark:bg-white/[0.02] px-2.5 py-1.5 rounded-xl">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[9px] font-bold text-black/50 dark:text-white/40 tracking-wider uppercase">
              All Systems Operational
            </span>
          </div>

          <p className="text-[10px] text-black/40 dark:text-white/30 font-semibold mt-8 select-none">
            © {new Date().getFullYear()} ClieX AI. All rights reserved.
          </p>
        </div>

        {/* Right Columns - Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:w-3/4">
          {linkSections.map((section) => (
            <div key={section.title} className="flex flex-col gap-4">
              <span className="text-[10px] font-extrabold text-black/40 dark:text-white/30 uppercase tracking-[0.2em] select-none">
                {section.title}
              </span>
              <div className="flex flex-col gap-2.5">
                {section.items.map((item, idx) => {
                  if (item.type === 'header') {
                    return (
                      <span
                        key={idx}
                        className="text-[9px] font-black text-black/35 dark:text-white/25 uppercase tracking-wider mt-3 mb-1 first:mt-0 select-none"
                      >
                        {item.label}
                      </span>
                    );
                  }

                  const isExternal = item.href?.startsWith('http') || item.href?.startsWith('mailto');

                  return (
                    <a
                      key={idx}
                      href={item.href}
                      target={isExternal ? '_blank' : undefined}
                      rel={isExternal ? 'noreferrer' : undefined}
                      className={`text-xs font-semibold flex items-center gap-1 group w-fit transition-colors duration-200 ${
                        item.highlight
                          ? 'text-brand dark:text-brand hover:text-brand/80'
                          : 'text-black/60 dark:text-white/60 hover:text-brand dark:hover:text-white'
                      }`}
                    >
                      <span>{item.label}</span>
                      {item.badge && (
                        <span className="text-[8px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-brand/10 text-brand select-none scale-90 origin-left">
                          {item.badge}
                        </span>
                      )}
                      {item.highlight && (
                        <ArrowUpRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      )}
                    </a>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Socials & Sub-Footer */}
      <div className="max-w-6xl mx-auto px-6 mt-16 pt-8 border-t border-black/5 dark:border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Social Icons */}
        <div className="flex flex-col items-center md:items-start gap-3">
          <span className="text-[10px] font-extrabold text-black/40 dark:text-white/30 uppercase tracking-[0.2em] select-none">
            Contacts
          </span>
          <div className="flex gap-2.5">
            {socialLinks.map((soc) => (
              <a
                key={soc.label}
                href={soc.href}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 flex items-center justify-center text-black/55 dark:text-white/55 hover:text-brand dark:hover:text-white hover:border-brand/40 dark:hover:border-brand/40 active:scale-95 transition-all shadow-sm hover:shadow-md"
                title={soc.label}
                aria-label={soc.label}
              >
                {soc.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Bottom utility links */}
        <div className="flex flex-wrap justify-center gap-6 text-[10px] text-black/45 dark:text-white/40 font-semibold">
          <a href="#" className="hover:text-brand transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-brand transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-brand transition-colors">Cookie Policy</a>
          <a href="#" className="hover:text-brand transition-colors">Sitemap</a>
        </div>

      </div>
    </footer>
  );
};
