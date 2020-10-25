import "core-js/modules/es.string.starts-with";
import { isString } from 'lodash-es';

function print(name) {
  return name;
}

function sayHello(name) {
  if (isString(name) && name.startsWith('wu')) {
    console.info("hello ".concat(print === null || print === void 0 ? void 0 : print(name)));
  }
}

export { sayHello };
