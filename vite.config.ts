import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import { svgrComponent } from 'vite-plugin-svgr-component';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    
    
        svgrComponent()
,react(), tsconfigPaths()]
})
