import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Fix: Use '.' instead of process.cwd() to avoid type errors when Node types are missing
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [react()],
    // Polyfill process.env so the existing Gemini service works without code changes
    define: {
      'process.env': env
    }
  };
});