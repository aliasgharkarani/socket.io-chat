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
        // if (!socket.username) return;
        users.splice(users.indexOf(socket.username, 1));
        updateUsernames();
        connections.splice(connections.indexOf(socket), 1);
        console.log('Disconnected: %s sockets connected', connections.length)
    })

    // Send Message
    socket.on('send message', (data) => {
        console.log('dataaaaa', data)
        io.sockets.emit('new message', { msg: data, username: socket.username })
    });

    // New User
    socket.on('new user', (data, cb) => {
        cb(true);
        socket.username = data;
        users.push(socket.username);
        updateUsernames();
    })

    function updateUsernames() {
        io.sockets.emit('get users', users)
    }
})