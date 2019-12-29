var socket = io();

socket.on('downloaded', function (msg) {
    console.log(msg);
});

function download(url) {
    socket.emit('download', url);
}