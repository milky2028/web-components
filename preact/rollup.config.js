import rimraf from 'rimraf';
import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import babel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser';

rimraf.sync('../public/preact');

export default ({ watch }) => {
  const extensions = ['.js', '.jsx', '.ts', '.tsx'];
  const plugins = [
    resolve({ extensions }),
    commonjs(),
    typescript(),
    babel({
      extensions,
      exclude: ['node_modules/**'],
      plugins: [
        [
          '@babel/plugin-transform-react-jsx',
          { pragma: 'h', pragmaFrag: 'Fragment' }
        ]
      ],
      runtimeHelpers: true
    })
  ];

  if (watch) {
    plugins.unshift(
      replace({
        [`// __preactDebug__`]: `import 'preact/debug';`,
        ['process.env.NODE_ENV']: `'development'`,
        delimiters: ['', '']
      })
    );
  } else {
    plugins.unshift(
      replace({
        [`// __preactDebug__`]: '',
        ['process.env.NODE_ENV']: `'production'`,
        delimiters: ['', '']
      })
    );

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
        index: 'src/index.ts'
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
