import { terser } from 'rollup-plugin-terser';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';



export default {
    input: 'src/main.js',
    output: [{
        file: './dist/bundle.umd.js',
        format: 'umd',
        name: 'sayHello',
        globals: {
            'lodash-es': '_'
        }
    }, {
        file: './dist/bundle.umd.min.js',
        format: 'umd',
        name: 'sayHello',
        plugins: [
            terser()
        ],
        globals: {
            'lodash-es': '_'
        }
    }, {
        file: './dist/bundle.esm.js',
        format: 'esm'
    }, {
        file: './dist/bundle.esm.min.js',
        format: 'esm',
        plugins: [
            terser()
        ]
    }],
    plugins: [
        nodeResolve(),
        babel({
            babelHelpers: 'bundled',
            exclude: 'node_modules/**', // 只编译我们的源代码
        })
    ],
    external: ['lodash-es']
};