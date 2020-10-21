import { isString } from 'lodash-es';

function print(name) {
    return name;
}

function sayHello(name) {
    if (isString(name)) {
        console.info(`hello ${print(name)}`);
    }
}

export { sayHello };
