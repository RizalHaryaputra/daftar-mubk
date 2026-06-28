/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  theme: {
    extend: {
      colors: {
        brand: {
          brown:   '#3D1F1A',
          deeper:  '#2A1511',
          orange:  '#F5720A',
          cream:   '#F5F0E8',
          border:  '#E5DDD8',
          muted:   '#888880',
        }
      },
      fontFamily: {
        display: ['Playfair Display', 'Georgia', 'serif'],
        sans:    ['Plus Jakarta Sans', 'sans-serif'],
      },
      animation: {
        'marquee': 'marquee 25s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        }
      }
    }
  },
  plugins: [],
}
