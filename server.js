var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var fs = require('fs');

var photos_library = 'E:/photo_library';
app.use('/', express.static(__dirname + '/'));
app.use('/library', express.static(photos_library + '/'));

var download = function (url, dest, cb) {
    console.log(url, dest, cb);
    var file = fs.createWriteStream(dest);
    var request = http.get(url, function (response) {
        response.pipe(file);
        file.on('finish', function () {
            file.close(cb);  // close() is async, call cb after close completes.
        });
    }).on('error', function (err) { // Handle errors
        fs.unlink(dest); // Delete the file async. (But we don't check the result)
        if (cb) cb(err.message);
    });
};


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