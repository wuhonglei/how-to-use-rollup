import { terser } from 'rollup-plugin-terser';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { getBabelOutputPlugin } from '@rollup/plugin-babel';
const path = require('path');

const babelPluginForUmd = getBabelOutputPlugin({
    configFile: path.resolve(__dirname, './src/.babelrc.umd.json'),
    allowAllFormats: true
});

const babelPluginForEsm = getBabelOutputPlugin({
    configFile: path.resolve(__dirname, './src/.babelrc.esm.json'),
    allowAllFormats: true
});

export default {
    input: 'src/main.js',
    output: [{
        file: './dist/bundle.umd.js',
        format: 'umd',
        name: 'sayHello',
        plugins: [
            babelPluginForUmd
        ],
        globals: {
            'lodash-es': '_'
        }
    }, {
        file: './dist/bundle.umd.min.js',
        format: 'umd',
        name: 'sayHello',
        plugins: [
            babelPluginForUmd,
            terser()
        ],
        globals: {
            'lodash-es': '_'
        }
    }, {
        file: './dist/bundle.esm.js',
        format: 'esm',
        plugins: [
            babelPluginForEsm,
        ]
    }, {
        file: './dist/bundle.esm.min.js',
        format: 'esm',
        plugins: [
            babelPluginForEsm,
            terser(),
        ]
    }],
    plugins: [
        nodeResolve(),
    ],
    external: ['lodash-es', /core-js/]
};