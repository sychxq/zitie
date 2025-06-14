import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';

const host = process.env.TAURI_DEV_HOST;

// https://vitejs.dev/config/
export default defineConfig(async (mode) => {
  const isProduction = mode === 'production';
  return {
    plugins: [
      vue(),
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      })],
    define: {
      __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false
    },
    // Vite options tailored for Tauri development and only applied in `tauri dev` or `tauri build`
    //
    // 1. prevent vite from obscuring rust errors
    clearScreen: false,
    // 2. tauri expects a fixed port, fail if that port is not available
    server: {
      port: 1420,
      strictPort: true,
      host: host || false,
      hmr: host
        ? {
          protocol: "ws",
          host,
          port: 1421,
        }
        : undefined,
      watch: {
        // 3. tell vite to ignore watching `src-tauri`
        ignored: ["**/src-tauri/**"],
      },
      build: {
        cacheDir: isProduction ? './.vite-cache-prod' : './.vite-cache-dev'
      }
    },
  }
});

