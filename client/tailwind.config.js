/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}", // Note the addition of the `app` directory.
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        ".truncate-lines-2": {
          display: "-webkit-box",
          "-webkit-line-clamp": "2", // Number of lines to show
          "-webkit-box-orient": "vertical",
          overflow: "hidden",
        },
      };

      addUtilities(newUtilities, ["responsive", "hover"]);
    },
  ],
};
