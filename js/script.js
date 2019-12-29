var socket = io();

function download(url) {
    var name = "kek";
    var uri = "/library/washington_dc/shrinked/0001.jpg";
    var link = document.createElement("a");
    link.download = name;
    link.href = uri;
    link.click();
}