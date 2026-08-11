import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import vercel from '@astrojs/vercel';

import remarkRemovePlusPlus from './src/plugins/remark-remove-plusplus.mjs';

export default defineConfig({
  site: 'https://www.theeduassist.com',
  trailingSlash: 'always',
  build: {
    format: 'directory',
  },
  output: 'static',
  adapter: vercel(),
  vite: {
    plugins: [tailwindcss()]
  },
  integrations: [
    react()
  ],
  markdown: {
    remarkPlugins: [remarkRemovePlusPlus],
  },
});
