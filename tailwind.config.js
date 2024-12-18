const { createGlobPatternsForDependencies } = require('@nx/angular/tailwind');
const { join } = require('path');
import fluid, { extract, screens, fontSize } from 'fluid-tailwind'
import containerQueries from "@tailwindcss/container-queries"

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: {
    files: [join(__dirname, 'src/**/!(*.stories|*.spec).{ts,html}'), ...createGlobPatternsForDependencies(__dirname)],
    extract
  },
  theme: {
    screens,
    fontSize,
    extend: {
      colors: {
        primary: {
          50: 'var(--primary-50)',
          100: 'var(--primary-100)',
          200: 'var(--primary-200)',
          300: 'var(--primary-300)',
          400: 'var(--primary-400)',
          500: 'var(--primary-500)',
          600: 'var(--primary-600)',
          700: 'var(--primary-700)',
          800: 'var(--primary-800)',
          900: 'var(--primary-900)',
          950: 'var(--primary-950)',
          content: 'var(--primary-content)'
        },
        secondary: {
          50: 'var(--secondary-50)',
          100: 'var(--secondary-100)',
          200: 'var(--secondary-200)',
          300: 'var(--secondary-300)',
          400: 'var(--secondary-400)',
          500: 'var(--secondary-500)',
          600: 'var(--secondary-600)',
          700: 'var(--secondary-700)',
          800: 'var(--secondary-800)',
          900: 'var(--secondary-900)',
          950: 'var(--secondary-950)',
          content: 'var(--secondary-content)'
        },
        background: 'var(--background)',
        foreground: 'var(--foreground)'
      },
      animation: {
        'fade-in': 'fadeIn 200ms ease-in',
        'fade-out': 'fadeOut 200ms ease-out',
        'slide-in': 'slideIn 200ms ease-out',
        'slide-out': 'slideOut 200ms ease-in'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        fadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' }
        },
        slideIn: {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' }
        },
        slideOut: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(100%)' }
        }
      }
    }
  },
  plugins: [fluid, containerQueries]
};
