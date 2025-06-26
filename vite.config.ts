import { defineConfig, Plugin, ResolvedConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// 处理微应用环境
function handleMicroApp(): Plugin {
  let isMicro = false
  return {
    name: 'micro-app-config',
    enforce: 'pre',
    configResolved(config: ResolvedConfig) {
      isMicro = config.mode === 'development'
    },
    transformIndexHtml(html: string) {
      if (isMicro) {
        return {
          html,
          tags: [
            {
              tag: 'script',
              injectTo: 'body-prepend',
              children: `window.__MICRO_APP_ENVIRONMENT__ = true`
            }
          ]
        }
      }
      return html
    }
  }
}

export default defineConfig({
  plugins: [vue(), handleMicroApp()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  server: {
    port: 5173,
    cors: true,
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  }
})
