export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      animation: {
        'gradient-x': 'gradient-x 15s ease infinite',
        'fade-in': 'fade-in 1s ease-out forwards',
      },
      keyframes: {
        'gradient-x': {
          '0%, 100%': {
            'background-position': '0% 50%',
          },
          '50%': {
            'background-position': '100% 50%',
          },
        },
        'fade-in': {
          '0%': {
            opacity: 0,
            transform: 'translateY(20px)',
          },
          '100%': {
            opacity: 1,
            transform: 'translateY(0)',
          },
        },
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.text-shadow': {
          'text-shadow': '2px 2px 4px rgba(0,0,0,0.3)',
        },
        '.text-shadow-md': {
          'text-shadow': '3px 3px 6px rgba(0,0,0,0.3)',
        },
        '.text-shadow-lg': {
          'text-shadow': '4px 4px 8px rgba(0,0,0,0.3)',
        },
      });
    },
  ],
};