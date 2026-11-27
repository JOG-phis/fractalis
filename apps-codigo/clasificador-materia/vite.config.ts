import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
        // Kit de identidad común de las apps de Fractalis (cabecera, pie, logo, colores)
        '@fractalis': path.resolve(__dirname, '../_comun/Fractalis.tsx'),
      },
      // El kit está fuera de la carpeta de la app: que use el React de la app
      dedupe: ['react', 'react-dom'],
    },
    // Nombres fijos (sin huella) para que al recompilar se sobrescriban en static/apps/… y no se acumulen archivos viejos
    build: {
      rollupOptions: {
        output: { entryFileNames: 'assets/app.js', chunkFileNames: 'assets/[name].js', assetFileNames: 'assets/[name][extname]' },
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
