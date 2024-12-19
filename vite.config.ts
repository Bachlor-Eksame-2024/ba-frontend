import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    proxy: {
      '/auth': {
        target: 'http://localhost:3000/api', // Replace with your backend URL
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
