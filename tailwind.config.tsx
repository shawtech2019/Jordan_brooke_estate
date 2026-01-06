/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
      extend: {
        fontFamily: {
          sans: ['Noto Sans', 'sans-serif'],
          neuton: ['Neuton', 'sans-serif'],
          poppins: ["Poppins", "sans-serif"],
          fairs: ["Playfair Display", 'serif'],
          merri: ["Merriweather", 'serif'],
          sacram: ["Sacramento", "cursive;"]
        },
      },
    },
  };