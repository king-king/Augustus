/**
 * Created by wangqun6 on 2017/3/27.
 */

// var os = require("os");
// console.log(JSON.stringify(os.userInfo()));
function timer(func, delay) {
    var id;

    function d() {
        clearTimeout(id);
        func();
        id = setTimeout(d, delay);
    }

    return {
        start: d,
        stop: function () {
            clearTimeout(id);
        }
    };
}

var i = 0;
var t = timer(function () {
    var str = "";
    for (var n = 0; n < 10; n++) {
        str += n;
    }
    str = null;
    console.log(i++)
}, 0);

try {
    t.start();
} catch (e) {
    console.log(e);
}

process.on('exit', function (code) {
    console.log("About to exit with code:" + code);
});