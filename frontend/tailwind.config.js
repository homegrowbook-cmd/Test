/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // homegrowbook.de color scheme
        accent: {
          DEFAULT: '#57ff92',
          soft: 'rgba(87, 255, 146, 0.12)',
          border: 'rgba(87, 255, 146, 0.4)',
        },
        bg: {
          DEFAULT: '#050708',
          elevated: '#0c1014',
          soft: '#11161c',
        },
        text: {
          main: '#f6f7fb',
          muted: '#a3a8b5',
        },
        border: {
          subtle: '#1f2630',
        },
        pill: {
          bg: '#121820',
        },
        // Keep existing colors for compatibility
        primary: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#57ff92', // Updated to match accent
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        },
      },
      fontFamily: {
        sans: ['system-ui', '-apple-system', 'BlinkMacSystemFont', '"SF Pro Text"', '"Segoe UI"', 'sans-serif'],
      },
      borderRadius: {
        'lg': '18px',
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
        '4xl': '2.5rem',
        'pill': '999px',
      },
      boxShadow: {
        'soft-sm': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
        'soft': '0 30px 80px rgba(0, 0, 0, 0.6)',
        'soft-md': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
        'soft-lg': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
        'nav': '0 18px 40px rgba(0, 0, 0, 0.7)',
        'accent': '0 12px 32px rgba(87, 255, 146, 0.35)',
        'accent-hover': '0 16px 40px rgba(87, 255, 146, 0.45)',
      },
      backdropBlur: {
        'nav': '18px',
      },
    },
  },
  plugins: [],
  darkMode: 'class',
}
