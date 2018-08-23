var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

users = [];
connections = [];

server.listen(process.env.PORT || 3100);
console.log('Server is Running...')

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})

io.sockets.on('connection', (socket) => {
    connections.push(socket);
    console.log('Connection: %s sockets connected', connections.length);

    // Disconnect
    socket.on('disconnect', (data) => {
        connections.splice(connections.indexOf(socket), 1);
        console.log('Disconnected: %s sockets connected', connections.length)
    })
})