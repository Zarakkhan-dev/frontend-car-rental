/** @type {import('tailwindcss').Config} */

import defaultTheme from 'tailwindcss/defaultTheme';

const colors = {
  ...defaultTheme.colors,
  primary: {
    900: "#192236",
    // 900: "#f5f5f5",
    800: "#2f384a",
    700: "#464e5e",
    600: "#5e6472",
    500: "#757a86",
    400: "#8c909a",
    300: "#a3a6ae",
    200: "#babcc2",
    100: "#d1d2d6",
    50: "#e8e8ea",
    0: "#ffffff",
  },
  ground: "#e7e7e7", // Add your custom color here
  // tertiary: "#2596be"
};

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    borderRadius: {
      'none': '0',
      'sm': '0.125rem',
      DEFAULT: '0.25rem',
      'md': '0.375rem',
      'lg': 'rem',
      'full': '9999px',
      'large': '12px',
    },
    extend: {
      colors, // Extend the colors with the custom colors
      // Add custom utilities here
      scrollbar: {
        hide: {
          /* Hide scrollbar for Chrome, Safari and Opera */
          '&::-webkit-scrollbar': {
            display: 'none',
          },
          /* Hide scrollbar for IE, Edge and Firefox */
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
        },
      },
    },
  },
  plugins: [
    // Add the plugin to use the custom utilities
    function ({ addUtilities }) {
      addUtilities({
        '.scrollbar-hide': {
          /* Hide scrollbar for Chrome, Safari and Opera */
          '&::-webkit-scrollbar': {
            display: 'none',
          },
          /* Hide scrollbar for IE, Edge and Firefox */
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
        },
      });
    },
  ],
}