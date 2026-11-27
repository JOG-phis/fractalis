import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    // Kit de identidad común de las apps de Fractalis (cabecera, pie, presentación, tema)
    alias: { '@fractalis': path.resolve(__dirname, '../_comun/Fractalis.tsx') },
    // El kit está fuera de la carpeta de la app: que use el React de la app
    dedupe: ['react', 'react-dom'],
  },
  // Nombres fijos (sin huella) para que al recompilar se sobrescriban en static/apps/… y no se acumulen archivos viejos
  build: {
    rollupOptions: {
      output: { entryFileNames: 'assets/app.js', chunkFileNames: 'assets/[name].js', assetFileNames: 'assets/[name][extname]' },
    },
  },
});
