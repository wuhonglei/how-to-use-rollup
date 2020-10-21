import { print } from './helper.js';
import { isString } from 'lodash-es';

export function sayHello(name) {
    if (isString(name) && name.startsWith('wu')) {
        console.info(`hello ${print?.(name)}`);
    }
}