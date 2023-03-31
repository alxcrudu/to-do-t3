/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        'waves-haikei': "url('/waves-haikei.svg')",
      }
    },
  },
  plugins: [require("daisyui")],
};

module.exports = config;
