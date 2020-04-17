import rimraf from 'rimraf';
import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';

rimraf.sync('../public/vanilla');

export default ({ watch }) => {
  const plugins = [typescript()];

  if (!watch) {
    plugins.push(
      terser({
        output: {
          comments: false
        }
      })
    );
  }

  return [
    {
      input: {
        main: 'src/index.ts'
      },
      output: {
        dir: '../public/vanilla',
        format: 'esm',
        chunkFileNames: '[name].js'
      },
      plugins
    }
  ];
};
