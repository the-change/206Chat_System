//creating the express web server
var app = require('express')();
/*
Express initializes app to be a function handler 
that you can supply to an HTTP server (as seen in line 2).
*/
var http = require('http').Server(app);
/*
Add the socket.io server to integrates with
the Node.JS HTTP Server 
Initialising new instance of socket.io by passing the HTTP object 
*/
var io = require('socket.io')(http);
/*
We define a route handler / that gets called 
when we hit our website home.
*/
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});
/* Listen on the 'connection' event for incoming sockets 
if it is is connected the console will say so 
if the user disconnect the console will print a 'user disconnected'*/
io.on('connection', function(socket) {
    /*console.log('a user connected');
    socket.on('disconnect', function() {
        console.log('user disconnected');
    });*/
    /*
      We add the 'chat message event'
    */
    socket.on('chat message', function(msg) {
       // console.log('message: ' + msg);
        io.emit('chat message', msg);
    });
});

/*
we make the http server listen on port 3000
*/
http.listen(3000, function() {
    console.log('listening on *:3000');
});