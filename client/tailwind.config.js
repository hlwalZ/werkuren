/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        pastelBlauw: "#413FA3",
        pastelGoud: "#DBBA02",
        pastelGroen: "#2BC693",
        pastelRoze: "#D35879",
        pastelGrijs: "#8687B9",
      },
      fontFamily: {
        sans: ["Roboto", "sans-serif"],
      },
      gridTemplateColumns: {
        "70/30": "70% 28%",
      },
    },
  },
  plugins: [],
};
