import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  test: {
    coverage: {
      exclude: [
        'src/App.tsx',
        'src/main.tsx',
        '.storybook',
        'src/vite-env.d.ts',
        'eslint.config.js',
        'vite.config.ts',
        'vitest.shims.d.ts',
        'vitest.workspace.ts',
      ],
    },
  },
})
