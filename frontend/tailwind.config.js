/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "primary": "#2463eb",
        "primary-hover": "#1d4ed8",
        "background-light": "#f6f6f8",
        "background-dark": "#111621",
        "surface-dark": "#1c212e",
        "border-dark": "#282d39",
        "text-secondary": "#9da6b9",
      },
      fontFamily: {
        "display": ["Space Grotesk", "sans-serif"],
        "body": ["Noto Sans", "sans-serif"],
      },
      borderRadius: {
        "DEFAULT": "1rem", 
        "lg": "1.5rem", 
        "xl": "2rem", 
        "full": "9999px"
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(180deg, rgba(17,22,33,0) 0%, #111621 100%)',
      }
    },
  },
  plugins: [],
}
