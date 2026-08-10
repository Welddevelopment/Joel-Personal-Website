import {resolve} from 'node:path';
import {defineConfig} from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        capabilityFactory: resolve(import.meta.dirname, 'capability-factory/index.html'),
        dynamicAgentSpecialisation: resolve(import.meta.dirname, 'dynamic-agent-specialisation/index.html'),
        raehyeon: resolve(import.meta.dirname, 'raehyeon/index.html'),
        heeyoung: resolve(import.meta.dirname, 'heeyoung/index.html'),
        sean: resolve(import.meta.dirname, 'sean/index.html'),
        hyunsik: resolve(import.meta.dirname, 'hyunsik/index.html'),
        jaehoon: resolve(import.meta.dirname, 'jaehoon/index.html')
      }
    }
  }
});
