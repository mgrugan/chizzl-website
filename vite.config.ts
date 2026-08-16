import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  // Relative, not '/chizzl-website/' or '/'. The site has to serve correctly
  // from the Pages project subpath AND from the apex of chizzl.co, and
  // relative URLs are right at both without a cutover commit that briefly
  // breaks one of them.
  base: './',
  plugins: [react(), tailwindcss()],
  build: { outDir: 'dist', assetsInlineLimit: 0 },
});
