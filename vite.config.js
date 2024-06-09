import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/Master': {
        target: 'http://bsxpress.co',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/Master/, '')
      }
    }
  }
})
