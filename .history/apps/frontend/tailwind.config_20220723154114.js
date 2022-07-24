const { createGlobPatternsForDependencies } = require('@nrwl/angular/tailwind');
const { join } = require('path');

module.exports = {
  content: [
    join(__dirname, 'src/**/!(*.stories|*.spec).{ts,html}'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {
      colors: {
        lavender: '#BC839B',
        queenPink: {
          100: '#f6eef1',
          200: '#e5cdd6',
          300: '#d3abbb',
          400: '#c28a9f',
          500: '#b06984',
          600: '#964f6a',
          700: '#753d53',
          800: '#542c3b',
          900: '#321a23',
        },
        periwinkie: '#BCC0D4',
        lavenderGray: '#CECEDE',
      },
    },
  },
  plugins: [],
};
