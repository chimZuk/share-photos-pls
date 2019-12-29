var express = require('express');
var app = express();
var pre_http = require('http');
var http = pre_http.createServer(app);
var io = require('socket.io')(http);
var fs = require('fs');

var photos_library = 'E:/photo_library';
app.use('/', express.static(__dirname + '/'));
app.use('/library', express.static(photos_library + '/'));

app.get('*', (req, res) => {
    res.redirect('/');
});

io.on('connection', function (socket) {
    socket.on('download', function (msg) {
        io.emit('downloaded', msg + ' downloaded');
    });
});

http.listen(80, function () {
    console.log('listening on *:3000');
});