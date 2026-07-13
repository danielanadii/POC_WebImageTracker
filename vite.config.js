import {cp, mkdir} from 'node:fs/promises'
import {resolve} from 'node:path'
import {defineConfig} from 'vite'

export default defineConfig({
  base: process.env.BASE_PATH || '/',
  publicDir: 'public',
  plugins: [{
    name: 'copy-image-targets',
    async closeBundle() {
      await mkdir(resolve('dist/image-targets'), {recursive: true})
      await cp(resolve('image-targets'), resolve('dist/image-targets'), {recursive: true})
    },
  }],
})
