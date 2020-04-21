import rimraf from 'rimraf';
import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import babel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser';

import * as react from 'react';
import * as reactDom from 'react-dom';
import * as reactIs from 'react-is';
import * as propTypes from 'prop-types';

rimraf.sync('../public/react');

export default ({ watch }) => {
  const extensions = ['.js', '.jsx', '.ts', '.tsx'];
  const plugins = [
    resolve({ extensions, browser: true }),
    commonjs({
      namedExports: {
        react: Object.keys(react),
        'react-dom': Object.keys(reactDom),
        'react-is': Object.keys(reactIs),
        'prop-types': Object.keys(propTypes)
      }
    }),
    typescript(),
    babel({
      babelrc: false,
      configFile: false,
      extensions,
      exclude: ['node_modules/**'],
      plugins: [
        ['@babel/plugin-transform-react-jsx'],
        ['@babel/plugin-proposal-nullish-coalescing-operator'],
        ['@babel/plugin-proposal-optional-chaining'],
        ['emotion']
      ],
      runtimeHelpers: true
    })
  ];

  if (watch) {
    plugins.unshift(
      replace({
        ['process.env.NODE_ENV']: `'development'`,
        delimiters: ['', '']
      })
    );
  } else {
    plugins.unshift(
      replace({
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
        dir: '../public/react',
        format: 'esm',
        chunkFileNames: '[name].js'
      },
      plugins
    }
  ];
};
