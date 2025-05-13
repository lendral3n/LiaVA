import { defineConfig } from 'vite';

export default defineConfig({
  preview: {
    port: 4173,
    host: true,
    allowedHosts: ['all'],
  },
});
