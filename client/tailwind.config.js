/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Sora', 'system-ui', 'sans-serif'],
      },
      colors: {
        ink: {
          950: '#070a12',
          900: '#0b1020',
          850: '#0f152a',
          800: '#141b33',
          700: '#1d2742',
        },
        accent: {
          DEFAULT: '#8b5cf6',
          soft: '#a78bfa',
          cyan: '#22d3ee',
          pink: '#f472b6',
        },
      },
      boxShadow: {
        glow: '0 0 60px -15px rgba(139, 92, 246, 0.6)',
        card: '0 20px 50px -25px rgba(0, 0, 0, 0.75)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-18px)' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'spin-slow': {
          to: { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'fade-up': 'fade-up 0.7s ease-out both',
        'spin-slow': 'spin-slow 18s linear infinite',
      },
    },
  },
  plugins: [],
};
