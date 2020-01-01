'use strict';

const express = require('express');
const app = express();
const pre_http = require('http');
const http = pre_http.createServer(app);
const io = require('socket.io')(http);
const API = require('./server/api');




API.readDialog("Lol");

















var photos_library = '/media/pi/Drive/photo_library';
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

http.listen(4000, function () {
    console.log('Listening on the port 4000.');
});