var net = require('net');
const rl = require('./readl');

var puerto=7000;

var cliente = net.connect({ port: puerto }, function () {
    console.log('===Bienvenido al sistema LAB 273===');
    console.log('Ingrese usuario y contraseña (user/pass)');
});

rl.on('line', function (msg) {
    cliente.write(msg);
});

cliente.on('data', function (data) {
    console.log(data.toString());
});

cliente.on('end', function () {
    rl.close();
});