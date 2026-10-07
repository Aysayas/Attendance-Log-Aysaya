import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // GitHub Pages serves the site from /<repo-name>/
  base: '/Attendance-Log-Aysaya/',
  plugins: [react()],
})
