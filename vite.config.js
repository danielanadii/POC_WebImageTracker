import {cp, mkdir} from 'node:fs/promises'
import {resolve} from 'node:path'
import {defineConfig} from 'vite'

export default defineConfig({
  base: process.env.BASE_PATH || '/',
  publicDir: 'public',
  build: {
    rollupOptions: {
      input: {
        landing: resolve('index.html'),
        ar: resolve('ar/index.html'),
        sandbox: resolve('sandbox/index.html'),
        sandboxAr: resolve('sandbox/ar/index.html'),
        sandboxViewer: resolve('sandbox/viewer.html'),
      },
    },
  },
  plugins: [{
    name: 'copy-image-targets',
    async closeBundle() {
      await mkdir(resolve('dist/image-targets'), {recursive: true})
      await cp(resolve('image-targets'), resolve('dist/image-targets'), {recursive: true})
      await mkdir(resolve('dist/sandbox/image-targets'), {recursive: true})
      await cp(resolve('sandbox/image-targets'), resolve('dist/sandbox/image-targets'), {recursive: true})
      await cp(resolve('sandbox/space.glb'), resolve('dist/sandbox/space.glb'))
    },
  }],
})
