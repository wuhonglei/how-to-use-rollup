function print(name) {
    return name;
}

function sayHello(name) {
    console.info(`hello ${print(name)}`);
}

export { sayHello };
