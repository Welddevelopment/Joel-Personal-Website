import {resolve} from 'node:path';
import {defineConfig} from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        raehyeon: resolve(import.meta.dirname, 'raehyeon/index.html')
      }
    }
  }
});
