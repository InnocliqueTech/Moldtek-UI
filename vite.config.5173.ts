import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'



export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  assetsInclude: ['**/*.xlsx'],
  server: {
    host: '0.0.0.0',     // Allows access via LAN IP
    port: 5173,          // Or any other port you prefer
    strictPort: true     // Fails if port is already taken
  }
})
