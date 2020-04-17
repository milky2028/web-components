import rimraf from 'rimraf';
import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';

rimraf.sync('../public/preact');

const extensions = ['.ts', '.tsx'];
const plugins = [
  resolve({ extensions }),
  commonjs(),
  typescript(),
  // babel({
  //   extensions,
  //   exclude: ['node_modules/**'],
  //   plugins: [
  //     [
  //       '@babel/plugin-transform-react-jsx',
  //       { pragma: 'h', pragmaFrag: 'Fragment' }
  //     ]
  //   ],
  //   runtimeHelpers: true
  // }),
  terser({
    output: {
      comments: false
    }
  })
];

export default [
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
