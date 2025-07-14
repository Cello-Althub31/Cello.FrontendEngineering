/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./screens/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#B22222",
        secondary: "#FFCDD2",
        background: "#F5F5F5",
        calming: "#0288D1",
        iconText: "#212121",
        grey: "#7C8BA0",
      },
      fontFamily: {
        poppins: ["Poppins_400Regular"],
        "poppins-medium": ["Poppins_500Medium"],
        "poppins-semibold": ["Poppins_600SemiBold"],
        "poppins-bold": ["Poppins_700Bold"],
      },
      spacing: {
        // Custom mt-* values
        100: "25rem", // mt-100
        120: "30rem", // mt-120
        144: "36rem", // mt-144
      },
    },
  },
  plugins: [],
};

