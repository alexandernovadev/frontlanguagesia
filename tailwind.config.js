/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      },
      colors: {
        customGreen: {
          50: "#004D40",
          100: "#003a353a", // Verde translúcido
        },
        customBlack: {
          100: "#1a1a1a55", // Negro translúcido
          200: "#2C2C2C", // Color de fondo negro personalizado
        },
        black: {
          100: "#F5F5F5",
          200: "#E0E0E0",
          300: "#CCCCCC",
          400: "#999999",
          500: "#666666",
          600: "#4D4D4D",
          700: "#333333",
          800: "#1A1A1A",
          900: "#0D0D0D",
        },
        green: {
          100: "#B9F6CA",
          500: "#00E676",
          700: "#00C853",
          800: "#00e677bd",
          900: "#00e677b7",
          950: "#00b364b7",
        },
        gray: {
          100: "#F5F5F5",
          200: "#EEEEEE",
          300: "#E0E0E0",
          400: "#BDBDBD",
          500: "#9E9E9E",
          600: "#757575",
          700: "#616161",
          800: "#424242",
          900: "#212121",
        },
      },
    },
  },
  plugins: [],
};
