/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
  safelist: [
    'border-t-warning',
    'border-t-error',
    'border-t-success',
    'border-t-info',
  ],
};
