/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Space Grotesk', 'Inter', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif']
      },
      colors: {
        ink: '#06070d',
        panel: '#101321',
        line: 'rgba(160, 174, 255, 0.18)',
        premiere: '#9b5cff',
        after: '#5f7bff',
        cyan: '#24e8ff',
        amber: '#f7b955'
      },
      boxShadow: {
        glow: '0 0 40px rgba(112, 101, 255, 0.35)',
        cyan: '0 0 28px rgba(36, 232, 255, 0.28)'
      },
      backgroundImage: {
        grid:
          'linear-gradient(rgba(255,255,255,.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.04) 1px, transparent 1px)'
      }
    }
  },
  plugins: []
};
