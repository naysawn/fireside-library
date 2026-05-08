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
      const onChange = (file) => {
        if (file.startsWith(contentDir)) server.restart();
      };
      server.watcher.on('change', onChange);
      server.watcher.on('add', onChange);
      server.watcher.on('unlink', onChange);
    },
  };
}

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss(), watchContentPlugin()],
  },
});