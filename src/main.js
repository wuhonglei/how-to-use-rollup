import { print } from './helper.js';
import _ from 'lodash';

export function sayHello(name) {
    if (_.isString(name) && name.startsWith('wu')) {
        console.info(`hello ${print?.(name)}`);
    }
}