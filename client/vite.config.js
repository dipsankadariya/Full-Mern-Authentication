import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api':
      {
        target: 'http://localhost:3000',
        
        secure:false
        //everytime we go to /api, we use 3000 instead of 5173
      }
    }
  }
})
