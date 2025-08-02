import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  preview: {
    allowedHosts: ['jarvis-cwa-614442955083.europe-west1.run.app'],
    host: true
  }
})
