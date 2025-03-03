import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    proxy: {
      '/api/apartments': {
        target: 'https://vilpas.kiinteistomaailma.fi',
        changeOrigin: true,
        rewrite: (path) => '/export/km/listings/baseline.json',
      },
    },
  },
});
