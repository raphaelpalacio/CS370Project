/*eslint-env node*/

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,tsx}", // Corrected the file extension pattern
  ],
  theme: {
    extend: {
      colors: {
        "custom-blue": "#0E0F2E", // Add your custom color here
      },
    },
  },
  plugins: [],
};
