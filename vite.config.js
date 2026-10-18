import { defineConfig } from 'vite';

export default defineConfig({
  // Relative Pfade: der Build läuft auf jedem Webspace, auch in Unterordnern
  base: './',
  server: { host: true, open: true },
  build: {
    target: 'es2018',
    assetsInlineLimit: 0
  }
});
