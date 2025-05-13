import { defineConfig } from 'vite';

export default defineConfig({
  preview: {
    port: 4173,
    host: true,
    allowedHosts: ['lia-web-production.up.railway.app'],
  },
});
