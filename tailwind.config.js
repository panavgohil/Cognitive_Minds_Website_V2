/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#F2E8D5",
        primary: "#17130F",
        secondary: "rgba(23,19,15,0.65)",
        accent: "#E4B51A",
        oxblood: "#681F2C",
        paper: "#FFF8E8",
        ink: "#17130F",
      },
      fontFamily: {
        sans: ['"Space Grotesk"', 'sans-serif'],
        serif: ['Fraunces', 'serif'],
      },
      boxShadow: {
        poster: "12px 12px 0 #17130F",
        "poster-gold": "10px 10px 0 #E4B51A",
      },
      minHeight: {
        'screen': '100vh',
      },
      animation: {
        marquee: 'marquee 22s linear infinite',
      },
      keyframes: {
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
}
