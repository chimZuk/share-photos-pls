var socket = io();
var photos = $("#photos");
var browse = $("#browse");
var nav1 = $("#nav1");
var nav2 = $("#nav2");

var data = {};
var current_range = "1_10";

$.ajax({
    url: "/library/wedding/map.json",
    success: function (map) {
        data = map;
        renred_nav(data);

        var value = localStorage.getItem("range");
        if (value) {
            var range = value.split("_");
            var start = Number(range[0]);
            var end = Number(range[1]);
            if (end <= Number(data.number)) {
                $("#nav1_selector").val(value);
                $("#nav2_selector").val(value);
                current_range = value;
                render(start, end);
            } else {
                current_range = "1_10";
                render(1, 10);
            }
        } else {
            current_range = "1_10";
            render(1, 10);
        }
    }
});

function renred_nav(data = data) {
    var amount = Number(data.number);
    var number = Math.floor(amount / 10) + 1;

    var nav = ``;
    var nav1_el = `
        <a onclick="pre_render_next(-1)" class="next-link">Previous</a>
        <select id="nav1_selector" onchange="pre_render(this);">`;
    var nav2_el = `
        <a onclick="pre_render_next(-1)" class="next-link">Previous</a>
        <select id="nav2_selector" onchange="pre_render(this);">`;
    for (var i = 1; i <= number; i++) {
        var start = (Number((i - 1) * 10) + Number(1));
        var end = (i * 10 <= data.number) ? i * 10 : data.number;
        nav += `<option value="` + start + `_` + end + `">` + start + `-` + end + `</a>`
    }
    nav += `</select>
        <a onclick="pre_render_next(1)" class="next-link">Next</a>`;

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

    current_range = value;
    localStorage.setItem("range", current_range);

    render(start, end);
}

function pre_render_next(sign) {
    var value = current_range;
    var range = value.split("_");
    var start = Number(range[0]) + (10 * sign);
    var end = Number(range[0]) + 10 + (10 * sign) - 1;

    if (start > 0 && end < Number(data.number)) {
        $("#nav1_selector").val(start + "_" + end);
        $("#nav2_selector").val(start + "_" + end);
        current_range = start + "_" + end;
        localStorage.setItem("range", current_range);
        render(start, end);
    } else {
        if (start > 0 && start <= Number(data.number)) {
            end = Number(data.number);
            $("#nav1_selector").val(start + "_" + end);
            $("#nav2_selector").val(start + "_" + end);
            current_range = start + "_" + end;
            localStorage.setItem("range", current_range);
            render(start, end);
        }
    }
}

function render(start, end) {
    photos.empty();
    window.scrollTo(0, 0)
    for (var i = start; i <= end; i++) {
        var pre_name = "00000000" + i;
        var name = pre_name.slice(pre_name.length - data.length);

        photos.append(
            `<div class="image-post">
                <img src="/library/wedding/shrinked/` + name + `.jpg">
                <h4 style="margin: 5px;">` + name + `.jpg</h4>
                <div class="action-buttons">
                    <button onclick="download_iphone('/library/wedding/reg/` + name + `.jpg', '` + name + `.jpg')">Open full-size 🍎</button>
                    <button onclick="download('/library/wedding/reg/` + name + `.jpg', '` + name + `.jpg')">Regular Download 🤑</button>
                </div>
            </div>`
        )
    }

}

function download_iphone(uri, name) {
    var win = window.open(uri, '_blank');
    win.focus();
}

function download(uri, name) {
    var link = document.createElement("a");
    link.download = name;
    link.href = uri;
    link.click();
}