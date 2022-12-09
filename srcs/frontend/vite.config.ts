import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
// https://vitejs.dev/config/

export default defineConfig({
    
 resolve : {
    alias: {
      '@components': '/src/components',
      '@views': '/src/views',
      '@utils': '/src/utils',
      '@router': '/src/Router',
      '@hooks': '/src/hooks',
      '@styles': '/src/styles',
      '@assets': '/src/assets',
      '@shared': '/src/shared',
      '@src': '/src/',

    }
  },
   server: {
	  host : true,
      proxy: {
          '/api': {
              target: 'http://localhost:3000',
              changeOrigin: true,
              rewrite: (path) => path.replace(/^\/api/, '')
          }
        }
      },
  plugins: [react(), tsconfigPaths()]
})
