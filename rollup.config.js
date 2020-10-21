import { terser } from 'rollup-plugin-terser';

export default {
    input: 'src/main.js',
    output: [{
        file: './dist/bundle.umd.js',
        format: 'umd',
        name: 'sayHello'
    }, {
        file: './dist/bundle.umd.min.js',
        format: 'umd',
        name: 'sayHello',
        plugins: [
            terser()
        ]
    }, {
        file: './dist/bundle.esm.js',
        format: 'esm'
    }, {
        file: './dist/bundle.esm.min.js',
        format: 'esm',
        plugins: [
            terser()
        ]
    }]
};