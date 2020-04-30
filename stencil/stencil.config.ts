import { Config } from '@stencil/core';

export const config: Config = {
  namespace: 'stencil',
  taskQueue: 'async',
  buildEs5: false,
  hashFileNames: false,
  globalStyle: 'src/global.css',
  outputTargets: [
    {
      type: 'www',
      dir: '../public/stencil',
      serviceWorker: null // disable service workers
    }
  ]
};
