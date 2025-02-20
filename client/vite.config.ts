import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',  // Ensures that Vite listens on all network interfaces (for Render to access it)
    port: Number(process.env.PORT) || 3000, 
    strictPort: true, // Use the PORT environment variable, or default to 3000 if not set
  },
  build: {
    outDir: 'client/dist',
  }
});

