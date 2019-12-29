var socket = io();
var photos = $("#photos");
var browse = $("#browse");
var nav1 = $("#nav1");
var nav2 = $("#nav2");

var data = {};

$.ajax({
    url: "/library/washington_dc/map.json",
    success: function (map) {
        console.log(map);
        data = map;
        renred_nav(data);
        render(1, 10);
    }
});

function renred_nav(data = data) {
    console.log(data);
    var amount = Number(data.number);
    console.log(amount);
    var number = Math.floor(amount / 10) + 1;
    console.log(number);

    var nav = ``;
    var nav1_el = `<select id="nav1_selector" onchange="pre_render(this);">`;
    var nav2_el = `<select id="nav2_selector" onchange="pre_render(this);">`;
    for (var i = 1; i <= number; i++) {
        var start = (Number((i - 1) * 10) + Number(1));
        var end = (i * 10 <= data.number) ? i * 10 : data.number;
        nav += `<option value="` + start + `_` + end + `">` + start + `-` + end + `</a>`
    }
    nav += `</select>`;

    nav1_el += nav;
    nav2_el += nav;

    nav1.append(nav1_el);
    nav2.append(nav2_el);
}

function pre_render(element) {
    var value = element.value;
    var range = value.split("_");
    var start = Number(range[0]);
    var end = Number(range[1]);

    $("#nav1_selector").val(value);
    $("#nav2_selector").val(value);

    render(start, end);
}

function render(start, end) {
    photos.empty();
    window.scrollTo(0, 0)
    for (var i = start; i <= end; i++) {
        var pre_name = "00000000" + i;
        var name = pre_name.slice(pre_name.length - data.length);

        photos.append(
            `<div class="image-post">
                <img src="/library/washington_dc/shrinked/` + name + `.jpg">
                <div class="action-buttons">
                    <button>💔</button>
                    <button onclick="download('/library/washington_dc/reg/` + name + `.jpg', '` + name + `.jpg')">Download 🤑</button>
                    <button>❤️</button>
                </div>
            </div>`
        )
    }

}

function download(uri, name) {
    var link = document.createElement("a");
    link.download = name;
    link.href = uri;
    link.click();
}