/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
    './error.vue',
    './node_modules/@nuxt/ui/**/*.{js,vue,ts}', // Додайте шлях до Nuxt UI
  ],
  theme: {
    extend: {
      colors: {
        'atlantis': {
          DEFAULT: '#A2CC3E',
          50: '#E8F2CF',
          100: '#E0EEBF',
          200: '#D1E69F',
          300: '#C1DD7F',
          400: '#B2D55E',
          500: '#A2CC3E',
          600: '#82A62C',
          700: '#5F7A20',
          800: '#3C4D14',
          900: '#1A2109',
          950: '#080B03'
        },
        'whiteLilac': {
          DEFAULT: '#F1F1F9',
          50: '#FFFFFF',
          100: '#FFFFFF',
          200: '#FFFFFF',
          300: '#FFFFFF',
          400: '#FFFFFF',
          500: '#F1F1F9',
          600: '#CACAE8',
          700: '#A2A2D7',
          800: '#7B7BC7',
          900: '#5454B6',
          950: '#4747A6'
        },
        'fiord': {
          DEFAULT: '#404B71',
          50: '#A0A9C9',
          100: '#939DC2',
          200: '#7986B3',
          300: '#5F6EA4',
          400: '#4F5C8B',
          500: '#404B71',
          600: '#2C334D',
          700: '#171B29',
          800: '#030406',
          900: '#000000',
          950: '#000000'
        },
      }
    },
  },
  plugins: [],
};
