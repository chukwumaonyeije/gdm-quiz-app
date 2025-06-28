import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/postcss'

// https://vitejs.dev/config/
export default defineConfig({
  // This line is the key!
  base: '/gdm-quiz-app/', 
  plugins: [
    react(),
    tailwindcss(),
  ],
})