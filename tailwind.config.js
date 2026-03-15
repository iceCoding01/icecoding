/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.html",
    "./scripts/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        /* Brand palette */
        'deep-navy':      '#001F3F',
        'electric-blue':  '#007BFF',
        'charcoal':       '#2D2D2D',
        /* Surfaces */
        'surface-subtle': '#F7F9FC',
        'surface-muted':  '#EEF2F8',
        /* Text */
        'text-secondary': '#4A5568',
        'text-muted':     '#64748B',
        /* Status */
        'success-green':  '#0CAF60',
        'warning-orange': '#FF9500',
        'error-red':      '#E53E3E',
        /* Legacy aliases */
        'light-gray':     '#F7F9FC',
        'navy-dark':      '#001228',
      },
      fontFamily: {
        'sans':    ['Poppins', 'sans-serif'],
        'poppins': ['Poppins', 'sans-serif'],
      },
      maxWidth: {
        'container': '1300px',
      },
      spacing: {
        'section': '80px',
      },
      borderRadius: {
        'default': '8px',
        'xl2':     '1.5rem',
        'xl3':     '2rem',
      },
      boxShadow: {
        'xs':         '0 1px 3px rgba(0,31,63,0.06)',
        'sm':         '0 4px 8px rgba(0,31,63,0.08)',
        'brand':      '0 10px 24px rgba(0,31,63,0.10)',
        'brand-hover':'0 20px 40px rgba(0,31,63,0.12)',
        'card':       '0 10px 40px -12px rgba(0,0,0,0.10)',
        'card-hover': '0 20px 40px -12px rgba(0,0,0,0.15)',
        'nav':        '0 4px 20px rgba(0,0,0,0.05)',
        'xl':         '0 32px 64px rgba(0,31,63,0.16)',
      },
      backgroundImage: {
        'gradient-tech':   'linear-gradient(135deg, #001F3F 0%, #007BFF 100%)',
        'gradient-light':  'linear-gradient(135deg, #F7F9FC 0%, #E9F3FF 100%)',
        'gradient-navy':   'linear-gradient(135deg, #001F3F 0%, #001228 100%)',
        'gradient-subtle': 'linear-gradient(135deg, #F7F9FC 0%, #E9F3FF 100%)',
      },
      transitionDuration: {
        'fast': '150ms',
        'slow': '500ms',
      },
      transitionTimingFunction: {
        'spring': 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      },
      height: {
        '128': '32rem',
      },
      zIndex: {
        '-10': '-10',
      },
    },
  },
  plugins: [],
}
