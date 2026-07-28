import path from 'path';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

const rawPort = process.env.PORT;
const port = rawPort ? Number(rawPort) : 5173;

// On Vercel the site lives at root; locally Replit sets BASE_PATH.
const basePath = process.env.BASE_PATH ?? '/';

export default defineConfig(async () => {
  const isReplit =
    process.env.NODE_ENV !== 'production' &&
    process.env.REPL_ID !== undefined;

  const replitPlugins = isReplit
    ? [
        (await import('@replit/vite-plugin-runtime-error-modal')).default(),
        await import('@replit/vite-plugin-cartographer').then((m) =>
          m.cartographer({ root: path.resolve(import.meta.dirname, '..') }),
        ),
        await import('@replit/vite-plugin-dev-banner').then((m) =>
          m.devBanner(),
        ),
      ]
    : [];

  return {
    base: basePath,
    plugins: [react(), tailwindcss(), ...replitPlugins],
    resolve: {
      alias: {
        '@': path.resolve(import.meta.dirname, 'src'),
        '@assets': path.resolve(
          import.meta.dirname,
          '..',
          '..',
          'attached_assets',
        ),
      },
      dedupe: ['react', 'react-dom'],
    },
    root: path.resolve(import.meta.dirname),
    build: {
      outDir: path.resolve(import.meta.dirname, 'dist/public'),
      emptyOutDir: true,
    },
    server: {
      port,
      strictPort: !!rawPort,
      host: '0.0.0.0',
      allowedHosts: true,
    },
    preview: {
      port,
      host: '0.0.0.0',
      allowedHosts: true,
    },
  };
});
