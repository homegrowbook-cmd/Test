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
        primary: {
          50: '#e6fff2',
          100: '#ccffe6',
          200: '#99ffcc',
          300: '#66ffb3',
          400: '#39FF14', // Neon green
          500: '#00FF00', // Pure neon green
          600: '#00e600',
          700: '#00cc00',
          800: '#00b300',
          900: '#009900',
        },
        neon: {
          green: '#39FF14',
          lime: '#00FF00',
          emerald: '#00FF7F',
        },
      },
      fontFamily: {
        sans: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
        '4xl': '2.5rem',
      },
      boxShadow: {
        'neon-sm': '0 0 10px rgba(57, 255, 20, 0.3)',
        'neon': '0 0 20px rgba(57, 255, 20, 0.5)',
        'neon-lg': '0 0 30px rgba(57, 255, 20, 0.7)',
        'neon-xl': '0 0 40px rgba(57, 255, 20, 0.9)',
      },
    },
  },
  plugins: [],
  darkMode: 'class',
}
