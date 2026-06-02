import { defineConfig } from 'vitest/config'
import path from 'path'
import { fileURLToPath } from 'url'

const dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(dirname, './src'),
      '@payload-config': path.resolve(dirname, './src/payload.config.ts'),
    },
  },
  test: {
    environment: 'node',
    setupFiles: ['./tests/vitest.setup.ts'],
    include: ['./tests/int/**/*.int.spec.ts'],
    testTimeout: 30000,
    hookTimeout: 30000,
  },
})
