/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",   // ✅ all your React pages/components
  ],
  theme: {
    extend: {
      colors: {
        citizenBlue: "#2b6cb0",   // custom theme color for Citizen
        authorityGreen: "#16a34a", // custom theme color for Authority
      },
    },
  },
  plugins: [],
};
