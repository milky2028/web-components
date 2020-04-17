import rimraf from 'rimraf';
import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';

rimraf.sync('../public/preact');

export default ({ watch }) => {
  const extensions = ['.ts', '.tsx'];
  const plugins = [resolve({ extensions }), commonjs(), typescript()];

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
        dir: '../public/preact',
        format: 'esm',
        chunkFileNames: '[name].js'
      },
      plugins
    }
  ];
};
