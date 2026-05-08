import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import zlib from 'zlib';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function resolvePackages(pkg: string) {
  return path.resolve(__dirname, `../../packages/${pkg}/src`);
}

function createSimplePNG(size: number): Buffer {
  const header = Buffer.from([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]);

  const ihdr = createChunk('IHDR', Buffer.from([
    (size >> 24) & 0xFF, (size >> 16) & 0xFF, (size >> 8) & 0xFF, size & 0xFF,
    (size >> 24) & 0xFF, (size >> 16) & 0xFF, (size >> 8) & 0xFF, size & 0xFF,
    8, 2, 0, 0, 0
  ]));

  const rawData: number[] = [];
  for (let y = 0; y < size; y++) {
    rawData.push(0);
    for (let x = 0; x < size; x++) {
      const centerX = size / 2;
      const centerY = size / 2;
      const radius = size * 0.4;
      const dist = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2);

      if (dist < radius) {
        rawData.push(66, 135, 245, 255);
      } else {
        rawData.push(255, 255, 255, 255);
      }
    }
  }

  const rawBuffer = Buffer.from(rawData);
  const idat = createChunk('IDAT', zlib.deflateSync(rawBuffer));
  const iend = createChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([header, ihdr, idat, iend]);
}

function createChunk(type: string, data: Buffer): Buffer {
  const length = Buffer.alloc(4);
  length.writeUInt32BE(data.length, 0);
  const typeBuffer = Buffer.from(type, 'ascii');
  const crcData = Buffer.concat([typeBuffer, data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(crcData), 0);
  return Buffer.concat([length, typeBuffer, data, crc]);
}

function crc32(buffer: Buffer): number {
  let crc = 0xFFFFFFFF;
  for (let i = 0; i < buffer.length; i++) {
    crc ^= buffer[i];
    for (let j = 0; j < 8; j++) {
      crc = (crc >>> 1) ^ (crc & 1 ? 0xEDB88320 : 0);
    }
  }
  return (crc ^ 0xFFFFFFFF) >>> 0;
}

function generateIcons(distDir: string) {
  const iconsDir = path.join(distDir, 'icons');
  if (!fs.existsSync(iconsDir)) {
    fs.mkdirSync(iconsDir, { recursive: true });
  }

  const sizes = [16, 32, 48, 128];
  sizes.forEach(size => {
    const png = createSimplePNG(size);
    fs.writeFileSync(path.join(iconsDir, `icon${size}.png`), png);
  });
}

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'copy-manifest-and-fix-html',
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

        generateIcons(distDir);

        const htmlSourceFiles = [
          { src: path.resolve(__dirname, 'src/newtab/index.html'), dest: path.resolve(distDir, 'newtab.html') },
          { src: path.resolve(__dirname, 'src/newtab/popup.html'), dest: path.resolve(distDir, 'popup.html') },
          { src: path.resolve(__dirname, 'src/newtab/options.html'), dest: path.resolve(distDir, 'options.html') },
        ];

        htmlSourceFiles.forEach(({ src, dest }) => {
          if (fs.existsSync(src)) {
            let content = fs.readFileSync(src, 'utf-8');
            content = content.replace(/src="\.\/main\.tsx"/g, 'src="./main.js"');
            content = content.replace(/src="\.\/popup\.tsx"/g, 'src="./popup.js"');
            content = content.replace(/src="\.\/options\.tsx"/g, 'src="./options.js"');
            if (!content.includes('globals.css')) {
              content = content.replace('</head>', '    <link rel="stylesheet" href="./globals.css" />\n  </head>');
            }
            fs.writeFileSync(dest, content);
          }
        });

        if (fs.existsSync(manifestTarget)) {
          let manifestContent = fs.readFileSync(manifestTarget, 'utf-8');
          const manifest = JSON.parse(manifestContent);
          
          if (manifest.chrome_url_overrides?.newtab) {
            manifest.chrome_url_overrides.newtab = 'newtab.html';
          }
          if (manifest.action?.default_popup) {
            manifest.action.default_popup = 'popup.html';
          }
          if (manifest.options_page) {
            manifest.options_page = 'options.html';
          }
          if (manifest.options_ui?.page) {
            manifest.options_ui.page = 'options.html';
          }
          
          fs.writeFileSync(manifestTarget, JSON.stringify(manifest, null, 2));
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
        main: path.resolve(__dirname, 'src/newtab/main.tsx'),
        popup: path.resolve(__dirname, 'src/newtab/popup.tsx'),
        options: path.resolve(__dirname, 'src/newtab/options.tsx'),
        background: path.resolve(__dirname, 'src/background/service-worker.ts'),
        content: path.resolve(__dirname, 'src/content/content-script.ts'),
      },
      output: {
        entryFileNames: '[name].js',
        chunkFileNames: '[name].js',
        assetFileNames: '[name].[ext]',
      },
    },
  },
  server: {
    port: 3000,
    strictPort: true,
  },
});
