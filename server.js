var express = require('express');
var app = express();
var pre_http = require('http');
var http = pre_http.createServer(app);
var io = require('socket.io')(http);

//var photos_library = '/media/pi/Drive/photo_library';
var photos_library = '/home/pi/Documents/';

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

http.listen(8080, function () {
    console.log('Listening on the port 80.');
});