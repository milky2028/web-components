import rimraf from 'rimraf';
import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';

rimraf.sync('../public/vanilla');

const plugins = [
  typescript(),
  terser({
    output: {
      comments: false
    }
  })
];

export default [
  {
    input: {
      main: 'src/counter.ts'
    },
    output: {
      dir: '../public/vanilla',
      format: 'esm'
    },
    plugins
  }
];
