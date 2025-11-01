import { fileURLToPath, URL } from 'url'
import { defineConfig, UserConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { mockPlugin } from './mock-plugin'
import { visualizer } from 'rollup-plugin-visualizer'

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  const mockEnabled = command === 'serve' && process.env.MOCK !== 'none'

  const config: UserConfig = {
    base: '/quark',
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    plugins: [
      react(),
    ],
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            react: ['react', 'react-dom', 'react-router-dom'],
            mui: ['@mui/material', '@mui/icons-material', '@mui/x-date-pickers'],
            recharts: ['recharts'],
          },
        },
      },
    },
  }

  if (mockEnabled) {
    config.plugins.push(mockPlugin())
  } else {
    config.server = {
      proxy: {
        '/api': {
          target: process.env.SERVER_URL || 'http://127.0.0.1:5000',
        },
      },
    }
  }

  if (process.env.ANALYZE === '1') {
    config.plugins.push(visualizer())
  }

  return config
})
