import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

import path from 'path'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // css: {
  //   postcss: {
  //     plugins: [tailwindcss, autoprefixer],
  //   },
  // },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 5173,  
    hmr: {
      protocol: 'ws',    
      host: 'localhost',
      port: 5173,       
      clientPort: 5173, 
    },
  },
})
