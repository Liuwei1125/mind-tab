import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    '../../packages/ui/src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'var(--color-primary)',
          active: 'var(--color-primary-active)',
          disabled: 'var(--color-primary-disabled)',
        },
        accent: {
          teal: 'var(--color-accent-teal)',
          amber: 'var(--color-accent-amber)',
        },
        canvas: 'var(--color-canvas)',
        surface: {
          soft: 'var(--color-surface-soft)',
          card: 'var(--color-surface-card)',
          'cream-strong': 'var(--color-surface-cream-strong)',
          dark: 'var(--color-surface-dark)',
          'dark-elevated': 'var(--color-surface-dark-elevated)',
          'dark-soft': 'var(--color-surface-dark-soft)',
        },
        hairline: {
          DEFAULT: 'var(--color-hairline)',
          soft: 'var(--color-hairline-soft)',
        },
        ink: 'var(--color-ink)',
        body: {
          strong: 'var(--color-body-strong)',
          DEFAULT: 'var(--color-body)',
        },
        muted: {
          DEFAULT: 'var(--color-muted)',
          soft: 'var(--color-muted-soft)',
        },
        'on-primary': 'var(--color-on-primary)',
        'on-dark': {
          DEFAULT: 'var(--color-on-dark)',
          soft: 'var(--color-on-dark-soft)',
        },
        success: 'var(--color-success)',
        warning: 'var(--color-warning)',
        error: 'var(--color-error)',
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'EB Garamond', 'Georgia', 'serif'],
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      fontSize: {
        'display-xl': ['64px', { lineHeight: '1.05', letterSpacing: '-1.5px' }],
        'display-lg': ['48px', { lineHeight: '1.1', letterSpacing: '-1px' }],
        'display-md': ['36px', { lineHeight: '1.15', letterSpacing: '-0.5px' }],
        'display-sm': ['28px', { lineHeight: '1.2', letterSpacing: '-0.3px' }],
        'title-lg': ['22px', { lineHeight: '1.3' }],
        'title-md': ['18px', { lineHeight: '1.4' }],
        'body-md': ['16px', { lineHeight: '1.55' }],
        'body-sm': ['14px', { lineHeight: '1.55' }],
        caption: ['13px', { lineHeight: '1.4' }],
        'caption-uppercase': ['12px', { lineHeight: '1.4', letterSpacing: '1.5px' }],
        code: ['14px', { lineHeight: '1.6' }],
        button: ['14px', { lineHeight: '1' }],
        'nav-link': ['14px', { lineHeight: '1.4' }],
      },
      spacing: {
        xxs: '4px',
        xs: '8px',
        sm: '12px',
        md: '16px',
        lg: '24px',
        xl: '32px',
        xxl: '48px',
        section: '96px',
      },
      borderRadius: {
        xs: '4px',
        sm: '6px',
        md: '8px',
        lg: '12px',
        xl: '16px',
        pill: '9999px',
      },
      boxShadow: {
        'subtle': '0 1px 3px rgba(20, 20, 19, 0.08)',
        'card': '0 2px 8px rgba(20, 20, 19, 0.06)',
        'elevated': '0 4px 16px rgba(20, 20, 19, 0.08)',
        'glow': '0 0 20px rgba(204, 120, 92, 0.3)',
      },
      transitionDuration: {
        '150': '150ms',
        '300': '300ms',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'pulse-subtle': 'pulseSubtle 2s ease-in-out infinite',
        'spin-slow': 'spin 2s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
      },
      transitionTimingFunction: {
        'out': 'cubic-bezier(0.33, 1, 0.68, 1)',
        'in-out': 'cubic-bezier(0.65, 0, 0.35, 1)',
      },
    },
  },
  plugins: [],
};

export default config;
