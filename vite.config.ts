import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    // Inject environment variables
    'process.env': {
      REACT_APP_PAYSTACK_KEY: JSON.stringify(process.env.REACT_APP_PAYSTACK_KEY),
      // Add other environment variables here as needed
    },
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
