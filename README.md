## 项目介绍
该项目用于介绍如何使用 `rollup` 打包 library，涉及代码压缩、babel、external、3rd-npm 的打包。

### 一、如何使用 rollup 输出 UMD、ESM 的压缩和未压缩代码
```js
// rollup.config.js
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
```

### 二、如何使用 rollup 引入第三方模块 bundle 整个输出
> 参考：https://www.rollupjs.com/guide/tools/

rollup 打包时，默认不会处理第三方模块的代码，即 bundle 文件中不会引入第三方模块的源码。
如果需要将第三方模块打入 bundle 内容，需要使用 `@rollup/plugin-node-resolve
`

```js
import { terser } from 'rollup-plugin-terser';
import { nodeResolve } from '@rollup/plugin-node-resolve';

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
    }],
    plugins: [
        nodeResolve()
    ]
};
```


### 三、如何使用 rollup 引入第三方模块并定义 external 库

### 四、如何使用 rollup 结合 babel transform 转换 ES6 代码