import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';

const projectRoot = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig({
  root: projectRoot,
  publicDir: 'public',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    cssCodeSplit: true,
    modulePreload: { polyfill: false },
    rollupOptions: {
      input: fileURLToPath(new URL('./index.html', import.meta.url)),
      output: {
        manualChunks: {
          vendor: ['framer-motion', 'gsap', 'lenis'],
          icons: ['react-icons', 'lucide-react'],
        },
      },
    },
  },
  server: {
    host: '127.0.0.1',
    port: 5173
  }
});
