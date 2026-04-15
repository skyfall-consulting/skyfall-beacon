import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';

export default defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
      rollupTypes: true,
      tsconfigPath: './tsconfig.json',
    }),
  ],
  css: {
    modules: {
      // Produce short but unique scoped class names
      generateScopedName: 'beacon-[local]-[hash:base64:5]',
    },
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'beacon',
      formats: ['es', 'cjs'],
      fileName: (format) => (format === 'es' ? 'index.mjs' : 'index.js'),
      cssFileName: 'index',
    },
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        'react/jsx-runtime',
        'react/jsx-dev-runtime',
        'recharts',
        /^recharts\//,
      ],
      output: {
        // Keep "use client" banner
        banner: '"use client";',
        // Preserve export names
        exports: 'named',
      },
    },
    sourcemap: true,
    // Don't minify class names in CSS
    cssMinify: false,
    target: 'es2020',
    outDir: 'dist',
    emptyOutDir: true,
  },
});
