/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.tsx',
    './index.html'
  ],
  theme: {
    extend: {
      colors: {
        gray: {
          700: '#403939'
        }
      }
    },
  },
  plugins: [],
}

