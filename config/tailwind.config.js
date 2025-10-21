const path = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    path.join(__dirname, '../index.html'),
    path.join(__dirname, '../content/**/*.html'),
    path.join(__dirname, '../public/css/site.css'),
    path.join(__dirname, '../public/js/**/*.js'),
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        teal: {
          500: '#06b6d4',
          600: '#0891b2',
          700: '#0e7490',
        },
      },
    },
  },
};
