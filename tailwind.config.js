/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#1f1d35",
        darkBlue: '#48497f',
        purple: '#827ab3',
        lightBlue: '#b7badc',
        white: '#b7badc',
      }
    },
  },
  plugins: [],
}