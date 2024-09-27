import { defineConfig } from 'vite'
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill'
// ...
export default defineConfig({
  // ...
  define: {
    'process.env': {},
     global: 'globalThis'
  },
   plugins: [
                NodeGlobalsPolyfillPlugin({
                    buffer: true
                })
            ]
})
