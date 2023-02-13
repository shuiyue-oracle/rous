import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs'
import typescript from 'rollup-plugin-typescript2';
import nodeResolve from '@rollup/plugin-node-resolve';
import globals from 'rollup-plugin-node-globals'
import json from '@rollup/plugin-json';
import nodePolyfills from 'rollup-plugin-polyfill-node';
import path from 'path';

const resolve = (relPath) => path.resolve('./', relPath);

const extensions = ['.js', '.ts', '.jsx', '.tsx']
export default {
  input: resolve('src/index.ts'),
  output: [
    {
      file: './dist/umd/index.js',
      format: 'umd',
      name: 'axios',
      exports: 'named'  
    },
    {
      file: './dist/es/index.js',
      format: 'es',
      exports: 'named'
    },
    {
      file: './dist/amd/index.js',
      format: 'amd',
      exports: 'named'
    },
    {
      file: './dist/cjs/index.js',
      format: 'cjs',
      exports: 'named'
    },
    {
      file: './dist/iife/index.js',
      name: 'axios',
      format: 'iife',
      exports: 'named'
    }
  ],
  plugins: [
    nodeResolve({
      extensions,
      modulesOnly: true,
      preferBuiltins: true,
      browser: true
    }),
    commonjs(),
    nodePolyfills(),
    globals(),
    typescript({
      tsconfig: 'tsconfig.json',
      useTsconfigDeclarationDir: true
    }),
    babel({
      exclude: 'node_modules/**',
      extensions,
      babelHelpers: 'bundled'
    }),
    json()
  ]
}