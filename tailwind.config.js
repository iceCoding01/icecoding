/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.html",
    "./scripts/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        'deep-navy': '#001F3F',
        'electric-blue': '#007BFF',
        'charcoal': '#2D2D2D',
      },
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
      },
      maxWidth: {
        'container': '1200px',
      },
      spacing: {
        'section': '80px',
      },
      borderRadius: {
        'default': '8px',
      },
      boxShadow: {
        'brand': '0 10px 30px rgba(0, 31, 63, 0.1)',
        'brand-hover': '0 20px 40px rgba(0, 31, 63, 0.15)',
      },
    },
  },
  plugins: [],
}
