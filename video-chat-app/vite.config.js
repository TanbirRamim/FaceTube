import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          'zego-ui': ['@zegocloud/zego-uikit-prebuilt'],
          'vendor': ['react', 'react-dom', 'react-router-dom']
        }
      }
    }
  }
})
