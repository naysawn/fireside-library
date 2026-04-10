// @ts-check
import { defineConfig } from 'astro/config';
import path from 'node:path';

import tailwindcss from '@tailwindcss/vite';

const contentDir = path.resolve(import.meta.dirname, '../content');

/** Watch the content directory outside the Astro root for live reload */
function watchContentPlugin() {
  return {
    name: 'watch-content',
    configureServer(server) {
      server.watcher.add(contentDir);
    },
  };
}

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss(), watchContentPlugin()],
  },
});