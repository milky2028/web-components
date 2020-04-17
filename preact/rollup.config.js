import rimraf from 'rimraf';
import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import { terser } from 'rollup-plugin-terser';

rimraf.sync('../public/preact');

export default ({ watch }) => {
  const extensions = ['.js', '.jsx', '.ts', '.tsx'];
  const plugins = [resolve({ extensions }), commonjs(), typescript()];

  if (watch) {
    plugins.push(replace({ [`__preactDebug__;`]: `import 'preact/debug';` }));
  } else {
    plugins.push(replace({ [`__preactDebug__;`]: '' }));

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
