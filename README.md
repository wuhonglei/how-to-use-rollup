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
对于 CommonJS 环境和 Webpack 项目，这并不会产生问题，因为项目中使用该 npm 模块时，会自动安装项目的 `dependencies`。
这个点可以从打包生成的文件看出，模块中会直接 require 第三方模块。
```
// bundle.esm.js
import { isString } from 'lodash-es';

function print(name) {
    return name;
}

...
```

```js
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('lodash-es')) :
    typeof define === 'function' && define.amd ? define(['exports', 'lodash-es'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.sayHello = {}, global.lodashEs));
}(this, (function (exports, lodashEs) { 'use strict';
...
```

但如果在浏览器引入该模块，则需要将第三方模块打入 bundle 内容，使用 `@rollup/plugin-node-resolve
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
按照案例二，打包后的文件会包含所有第三方模块，但这并不利于代码体积优化，对于常用的工具库，例如 `lodash-es`，应用项目通常也会引入，因此重复打包将会增大代码体积。此时可以使用 `external: ['module-name']` 来指明不需要打包的外部模块。

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
    ],
    external: ['lodash-es']
};
```

对于不需要打包的模块，你需要告诉模块如何在全局环境中引用对应的模块，否则执行 `npm run build` 时会报如下错误：
```bash

> how-to-use-rollup@1.0.1 build /Users/wuhonglei/Desktop/JS/how-to-use-rollup
> rollup -c ./rollup.config.js


src/main.js → ./dist/bundle.umd.js, ./dist/bundle.umd.min.js, ./dist/bundle.esm.js, ./dist/bundle.esm.min.js...
(!) Missing global variable names
Use output.globals to specify browser global variable names corresponding to external modules
lodash-es (guessing 'lodashEs')
lodash-es (guessing 'lodashEs')
created ./dist/bundle.umd.js, ./dist/bundle.umd.min.js, ./dist/bundle.esm.js, ./dist/bundle.esm.min.js in 1.1s
```

此时还需要将 `lodash-es` 与全局变量进行绑定：

```js
import { terser } from 'rollup-plugin-terser';
import { nodeResolve } from '@rollup/plugin-node-resolve';

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
        nodeResolve()
    ],
    external: ['lodash-es']
};
```

### 四、如何使用 rollup 结合 babel transform 转换 ES6 代码