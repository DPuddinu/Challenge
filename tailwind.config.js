const { createGlobPatternsForDependencies } = require('@nx/angular/tailwind');
const { join } = require('path');
import fluid, { extract, screens, fontSize } from 'fluid-tailwind'

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: {
    files: [join(__dirname, 'src/**/!(*.stories|*.spec).{ts,html}'), ...createGlobPatternsForDependencies(__dirname)],
    extract
  },
  theme: {
    screens,
    fontSize,
    extend: {}
  },
  plugins: [fluid]
};
