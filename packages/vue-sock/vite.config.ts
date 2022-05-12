/// <reference types="vitest" />

import path from 'path'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'

const resolvePath = (str: string) => path.resolve(__dirname, str)

export default defineConfig({
  resolve: {
    alias: {
      '@/': resolvePath('src'),
    },
  },
  plugins: [
    Vue(),
    // typescript({
    //   'target': 'es2020',
    //   'rootDir': resolvePath('./src'),
    //   'declaration': true,
    //   'declarationDir': resolvePath('./dist'),
    //   exclude: resolvePath('./node_modules/**'),
    //   allowSyntheticDefaultImports: true,
    //   tsconfig: resolvePath('./tsconfig.json'),
    // })
    dts()
  ],

  // https://github.com/vitest-dev/vitest
  test: {
    globals: true,
    environment: 'happy-dom',
  },
  build: {
    sourcemap: true,
    lib: {
      entry: resolvePath('./src/index.ts'),
      name: 'VueSock',
      fileName: (format) => `vue-sock.${format}.js`
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['vue', 'gsap'],
      treeshake: true,
      output: {
        exports: 'named',
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: 'Vue'
        }
      }
    }
  },
})
