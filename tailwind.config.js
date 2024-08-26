/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#EBF4FB',
          100: '#D7E9F7',
          200: '#AFCDF0',
          300: '#87B2E8',
          400: '#5F96E1',
          500: '#56A7DC',
          600: '#418FC8',
          700: '#346E9B',
          800: '#274D6F',
          900: '#1A2D42'
        },
        secondary: {
          50: '#FFF3E0',
          100: '#FFE0B2',
          200: '#FFCC80',
          300: '#FFB74D',
          400: '#FFA726',
          500: '#FB8C00',
          600: '#F57C00',
          700: '#EF6C00',
          800: '#E65100',
          900: '#BF360C'
        }
      }
    }
  },
  plugins: []
}
