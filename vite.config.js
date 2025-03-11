import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist'
  },
  server: {
    host: true, // Ascolta su tutte le interfacce di rete
    port: 8888,
    allowedHosts: ['affiuccio.duckdns.org'] // Aggiungi l'host consentito
  }
});
