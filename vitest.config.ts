import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'node:path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      'components': path.resolve(__dirname, './src/components'),
      'UI components': path.resolve(__dirname, './src/UI components'),
      'services': path.resolve(__dirname, './src/services'),
      'hooks': path.resolve(__dirname, './src/hooks'),
      'assets': path.resolve(__dirname, './src/assets'),
      'utils': path.resolve(__dirname, './src/utils'),
      'tests': path.resolve(__dirname, './tests'),
    },
  },
  test: {
    environment: 'jsdom',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: ['src/**/*.{ts,tsx}'],
      exclude: ['src/tests/**/*', 'src/app/**/*'],
    },
    setupFiles: ['./tests/vitest-setup.ts'],
  },
});
