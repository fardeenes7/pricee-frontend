/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamilyfontFamily: {
        walsheim: ["var(--font-walsheim)"],
      },
      colors: {
        primary: "#101011",
        secondary: "#F3F4FD",
        accent: {
          0: "#ffedd5",
          1: "#E86840",
          2: "#d1552e",
        },
        complement: "#4CAF50",
      },
    },
  },
  plugins: [
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/forms"),
  ],
};
