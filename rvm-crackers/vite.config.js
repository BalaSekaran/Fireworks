import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Dev and preview servers both fall back to index.html for unknown paths,
// so deep links like /product/... and /category/... work on refresh.
export default defineConfig({
  plugins: [react()],
  server: { port: 5173, open: true },
  preview: { port: 4173 },
});
