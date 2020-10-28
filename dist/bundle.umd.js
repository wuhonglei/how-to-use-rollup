(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('lodash')) : typeof define === 'function' && define.amd ? define(['exports', 'lodash'], factory) : (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.sayHello = {}, global._));
})(this, function (exports, _) {
  'use strict';

  function _interopDefaultLegacy(e) {
    return e && typeof e === 'object' && 'default' in e ? e : {
      'default': e
    };
  }

  var ___default = /*#__PURE__*/_interopDefaultLegacy(_);

  function print(name) {
    return name;
  }

  function sayHello(name) {
    if (___default['default'].isString(name) && name.startsWith('wu')) {
      console.info(`hello ${print === null || print === void 0 ? void 0 : print(name)}`);
    }
  }

  exports.sayHello = sayHello;
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
});
