// vite.config.js or vite.config.ts
import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@/registry': path.resolve(__dirname, './registry'),
      '@/components': path.resolve(__dirname, './components'),
    },
  },
});
