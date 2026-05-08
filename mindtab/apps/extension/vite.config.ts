import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function resolvePackages(pkg: string) {
  return path.resolve(__dirname, `../../packages/${pkg}/src`);
}

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'copy-manifest',
      closeBundle() {
        const manifestSource = path.resolve(__dirname, 'manifest.json');
        const distDir = path.resolve(__dirname, 'dist');
        const manifestTarget = path.resolve(distDir, 'manifest.json');

        if (!fs.existsSync(distDir)) {
          fs.mkdirSync(distDir, { recursive: true });
        }

        if (fs.existsSync(manifestSource)) {
          fs.copyFileSync(manifestSource, manifestTarget);
        }
      },
    },
  ],
  resolve: {
    alias: {
      '@mindtab/ui': resolvePackages('ui'),
      '@mindtab/shared': resolvePackages('shared'),
      '@mindtab/storage': resolvePackages('storage'),
      '@mindtab/event-bus': resolvePackages('event-bus'),
    },
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        newtab: path.resolve(__dirname, 'src/newtab/index.html'),
        popup: path.resolve(__dirname, 'src/newtab/popup.html'),
        options: path.resolve(__dirname, 'src/newtab/options.html'),
        background: path.resolve(__dirname, 'src/background/service-worker.ts'),
        content: path.resolve(__dirname, 'src/content/content-script.ts'),
      },
    },
  },
  server: {
    port: 3000,
    strictPort: true,
  },
});
