/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#19C37D',
        secondary: '#202123',
        'chat-bg': '#343541',
        'user-bg': '#343541',
        'assistant-bg': '#444654',
      },
    },
  },
  plugins: [],
}