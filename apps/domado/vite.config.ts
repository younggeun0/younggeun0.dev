/// <reference types="vitest" />
/// <reference types="vite/client" />

import path from 'path'

import tanstackRouter from '@tanstack/router-plugin/vite'
import react from '@vitejs/plugin-react'
import { defineConfig, PluginOption } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react() as unknown as PluginOption,
    tanstackRouter() as unknown as PluginOption,
  ],
  resolve: {
    alias: {
      assets: path.resolve(__dirname, './assets'),
    },
  },
  assetsInclude: ['**/*.obj', '**/*.mtl'],
})
