import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'node:path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:2048",
        changeOrigin: true,
        // ref: https://github.com/vitejs/vite/discussions/6469#discussioncomment-4593041
        configure: (proxy, _options) => {
          proxy.on("error", (err, _req, _res) => {
            console.log("proxy error", err);
          });
          proxy.on("proxyReq", (proxyReq, req, _res) => {
            console.log(
              proxyReq.method,
              `${proxyReq.protocol}://${proxyReq.host}${proxyReq.path}`
              // JSON.stringify(proxyReq.getHeaders()),
            );
          });
          proxy.on("proxyRes", (proxyRes, req, _res) => {
            console.log(
              proxyRes.statusCode,
              req.url,
            );
          });
        },
      }
    },
    port: 8402
  },
  resolve: {
    // see: https://dev.to/tilly/aliasing-in-vite-w-typescript-1lfo
    alias: {
      '@': path.resolve(__dirname, "./src")
    }
  }
})
