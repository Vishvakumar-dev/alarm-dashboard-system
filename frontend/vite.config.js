import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    allowedHosts: [
      'vishvakumarj-alarm-dashboard-system-shm7-code-redirect-3.apps.rm2.thpm.p1.openshiftapps.com'
    ]
  }
})
