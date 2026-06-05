import React from 'react';
import { LogoMark } from './SharedPrimitives';
import { Mail } from 'lucide-react';

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

  const linkSections = [
    {
      title: 'Product',
      items: [
        { label: 'Features', href: '#services' },
        { label: 'Integrations', href: '#services' },
        { label: 'Pricing', href: '#pricing' },
      ],
    },
    {
      title: 'Company',
      items: [
        { label: 'About', href: '#about' },
        { label: 'Careers', href: '#' },
        { label: 'Blog', href: '#' },
      ],
    },
    {
      title: 'Support',
      items: [
        { label: 'Help Center', href: '#faq' },
        { label: 'Documentation', href: '#faq' },
        { label: 'Status', href: '#' },
      ],
    },
    {
      title: 'Legal',
      items: [
        { label: 'Privacy Policy', href: '#' },
        { label: 'Terms of Service', href: '#' },
        { label: 'Cookie Policy', href: '#' },
      ],
    },
  ];

  return (
    <footer className="bg-surface-container-lowest py-stack-xl border-t border-outline-variant">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center px-margin-desktop max-w-container-max mx-auto gap-8">
        {/* Brand column */}
        <div className="flex flex-col gap-4">
          <a href="#" className="flex items-center gap-2">
            <LogoMark className="w-7 h-7" />
            <span className="font-headline text-headline-md font-bold text-white">Clie<span className="text-primary">X</span> AI Solutions</span>
          </a>
          <p className="text-on-surface-variant max-w-xs">
            Building the future of human-AI communication, one call at a time.
          </p>

          {/* Social Icons */}
          <div className="flex gap-2.5 mt-2">
            {socialLinks.map((soc) => (
              <a
                key={soc.label}
                href={soc.href}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl border border-outline-variant bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-primary hover:border-primary/40 active:scale-95 transition-all"
                title={soc.label}
                aria-label={soc.label}
              >
                {soc.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Link columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
          {linkSections.map((section) => (
            <div key={section.title} className="flex flex-col gap-3">
              <span className="font-bold text-label-md text-on-surface">{section.title}</span>
              {section.items.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-on-surface-variant hover:text-primary transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-stack-xl pt-8 border-t border-outline-variant max-w-container-max mx-auto px-margin-desktop text-center md:text-left text-caption text-on-surface-variant">
        © {new Date().getFullYear()} ClieX AI Solutions. All rights reserved.
      </div>
    </footer>
  );
};
