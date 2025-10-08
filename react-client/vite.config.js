import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file from root folder based on `mode`
  const envPath = path.resolve(process.cwd());
  const env = loadEnv(mode, envPath);

  //proxy for backend connection
  return {
    plugins: [react()],
    server: {
      host: true,
      proxy: {
        '/express': {
          target: `http://${env.VITE_EXPRESS_HOST}:${env.VITE_EXPRESS_PORT}`,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/express/, ''),
        },
      },
    },
    test: {
      globals: true,
      environment: 'jsdom',
    },
  };
});