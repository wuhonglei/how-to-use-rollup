(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('lodash-es')) : typeof define === 'function' && define.amd ? define(['exports', 'lodash-es'], factory) : (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.sayHello = {}, global._));
})(this, function (exports, lodashEs) {
  'use strict';

  function print(name) {
    return name;
  }

  function sayHello(name) {
    if (lodashEs.isString(name) && name.startsWith('wu')) {
      console.info(`hello ${print === null || print === void 0 ? void 0 : print(name)}`);
    }
  }

  exports.sayHello = sayHello;
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
});
