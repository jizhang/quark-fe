import { defineConfig, UserConfig, splitVendorChunkPlugin } from 'vite'
import react from '@vitejs/plugin-react'
import { viteMockServe } from 'vite-plugin-mock'
import { fileURLToPath, URL } from 'url'

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  const mockEnabled = command === 'serve' && process.env.MOCK !== 'none'

  const config: UserConfig = {
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    plugins: [
      react(),
      // splitVendorChunkPlugin(),
      viteMockServe({
        localEnabled: mockEnabled,
        prodEnabled: false,
      }),
    ],
  }

  if (!mockEnabled) {
    config.server = {
      proxy: {
        '/api': {
          target: process.env.SERVER_URL || 'http://127.0.0.1:5000',
        },
      },
    }
  }

  return config
})
