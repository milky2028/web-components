import { Config } from '@stencil/core';

export const config: Config = {
  namespace: 'stencil',
  taskQueue: 'async',
  buildEs5: false,
  hashFileNames: false,
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader'
    },
    {
      type: 'www',
      dir: '../public/stencil',
      serviceWorker: null // disable service workers
    }
  ]
};
