import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'



export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  assetsInclude: ['**/*.xlsx'],
  server: {
    host: '0.0.0.0',     
    port: 5174,          
    strictPort: true     
  }
})
