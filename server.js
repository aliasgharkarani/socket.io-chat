var express = require('express');
const bodyParser = require('body-parser');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
const redis = require("redis");
var redisSession = require('node-redis-session');
var session = require('express-session')
 
var sessionstorage = require('sessionstorage');
var cookieParser = require('cookie-parser');
// Redis Session
app.use(cookieParser());
app.use(redisSession());
a = new redisSession(); 
// rsapp = "myapp";
// Create Redis Client
let client = redis.createClient();

client.on('connect', function(){
    console.log('Redis Connected')
})

app.use(bodyParser.json());

users = [];
connections = [];

server.listen(process.env.PORT || 3100);
console.log('Server is Running...')
// api for redis
app.get('/user',function(req,res,next){
    res.send("hello")
})

app.post('/search',function(req,res,send){
    // res.send("HELLo")
    let data = req.body.data
   var e = sessionstorage.setItem('001',data);
    console.log("this is id",data)
  var b =  sessionstorage.getItem('001')
console.log('get items',b)    
    
})
//
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})

app.get('/smoothflow', (req, res) => {
    res.sendFile(__dirname + '/client.js');
})

app.post('/reply', (req, res) => {
    io.sockets.emit('new message', req.body)
    res.send(req.body)
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