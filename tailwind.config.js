/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {  
        buttonColor: "#0067FF",
        primaryColor: "#2563EB",
        yellowColor: "#FEB60D",
        purpleColor: "#9771FF",
        irisBlueColor: "#01B5FF",
        headingColor: "#181A1E",
        textColor: "#4E545F",
      },
      boxShadow: {
        customBoxShadow: "rgba(17, 12, 46, 0.15) 0px 45px 100px 0px",
      },  
    },
  },
  plugins: [],
  };  