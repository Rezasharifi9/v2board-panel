const defaultTheme = require('tailwindcss/defaultTheme')
const plugin = require('tailwindcss/plugin')

module.exports = {
  darkMode: ['class', '[data-theme="dark"]'],

  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/layouts/**/*.{js,ts,jsx,tsx}',
  ],

  theme: {
    extend: {
      colors: {
        'title-color': '#1a1a1a',
        'background-color': '#fff',
        primary: '#BF40BF',
        'primary-hover': '#333333',
        secondary: '#C3B1E1',
        'input-color': '#ccc',
        'input-active-color': '#60C4B2',
        'input-error-color': '#f46a6a',
        ternary: '5A5A5A',
        light: '#F3F1F5',
        light2: '#F3F1F6',
        light3: '#F7F6F9',
        light4: '#EDEBF3',
        gray_dark: '#5C5C5C',
        gray_dark2: '#404040',
        gray_medium: '#828282',
        gray_medium2: '#898989',
        gray_light: '#AAAAAA',
        gray_light3: '#848484',
        scroll: '#D9D9D9',
        light_green: '#DDF4EA',
        light_green2: '#7EB29C',
        green: '#8BCBA8',
        dark_green: '#577C68',
      },
      fontWeight: {
        extrablack: 950,
      },
      screens: {
        xs: '400px',
        ...defaultTheme.screens,
      },
    },
  },
}
