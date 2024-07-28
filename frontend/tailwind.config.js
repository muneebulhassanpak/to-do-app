/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        myBlack: "#201E43",
        myBlue: "#134B70",
        myGreen: "#6C946F",
        myRed: "#E4003A",
      },
    },
  },
  plugins: [],
};
