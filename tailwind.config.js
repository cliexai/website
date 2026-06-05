/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        /* Brand Core */
        brand: '#8B5CF6',
        'brand-light': '#A78BFA',
        primary: '#6C3CE1',
        'primary-container': '#2A1B4D',
        'on-primary': '#FFFFFF',
        'on-primary-container': '#FFFFFF',
        secondary: '#A78BFA',
        'secondary-container': '#1A1A1A',
        tertiary: '#A78BFA',
        'tertiary-fixed': '#A78BFA',
        'tertiary-container': '#331B66',

        /* Surfaces */
        background: '#111111',
        'on-background': '#FFFFFF',
        surface: '#111111',
        'surface-dim': '#111111',
        'surface-bright': '#1A1A1A',
        'surface-variant': '#1A1A1A',
        'surface-container-lowest': '#0e0e0e',
        'surface-container-low': '#1C1B1B',
        'surface-container': '#1A1A1A',
        'surface-container-high': '#252525',
        'surface-container-highest': '#333333',
        'surface-tint': '#6C3CE1',
        'on-surface': '#FFFFFF',
        'on-surface-variant': '#A0A0A0',

        /* Outline */
        outline: '#333333',
        'outline-variant': '#333333',

        /* Inverse */
        'inverse-surface': '#FFFFFF',
        'inverse-on-surface': '#111111',
        'inverse-primary': '#A78BFA',

        /* Error */
        error: '#CF6679',
        'error-container': '#410002',
        'on-error': '#FFFFFF',
        'on-error-container': '#FFDAD6',

        /* On variants */
        'on-secondary': '#111111',
        'on-secondary-container': '#FFFFFF',
        'on-tertiary': '#111111',
        'on-tertiary-container': '#FFFFFF',
      },
      fontFamily: {
        sans: ['Outfit', 'Inter', 'system-ui', 'sans-serif'],
        headline: ['Outfit', 'Montserrat', 'sans-serif'],
        body: ['Outfit', 'Inter', 'sans-serif'],
        serif: ['Domine', 'serif'],
      },
      fontSize: {
        'headline-xl': ['48px', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }],
        'headline-lg': ['32px', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '700' }],
        'headline-lg-mobile': ['28px', { lineHeight: '1.2', fontWeight: '700' }],
        'headline-md': ['24px', { lineHeight: '1.3', fontWeight: '600' }],
        'body-lg': ['18px', { lineHeight: '1.6', fontWeight: '400' }],
        'body-md': ['16px', { lineHeight: '1.5', fontWeight: '400' }],
        'label-md': ['14px', { lineHeight: '1', letterSpacing: '0.05em', fontWeight: '600' }],
        'caption': ['12px', { lineHeight: '1.4', fontWeight: '400' }],
      },
      spacing: {
        'margin-mobile': '16px',
        'margin-desktop': '40px',
        'unit': '8px',
        'gutter': '24px',
        'container-max': '1280px',
        'stack-xs': '4px',
        'stack-sm': '12px',
        'stack-md': '24px',
        'stack-lg': '48px',
        'stack-xl': '80px',
      },
      borderRadius: {
        DEFAULT: '0.5rem',
        lg: '0.5rem',
        xl: '0.75rem',
        full: '9999px',
      },
    },
  },
  plugins: [],
}
