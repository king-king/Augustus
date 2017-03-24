/**
 * Created by wangqun6 on 2017/3/23.
 */
var fs = require("fs");

var t0 = Date.now();

function timer(duration, func, callback) {
    var delay = 100;

    function d() {
        func();
        if (Date.now() - t0 < duration) {
            return setTimeout(d, delay);
        } else {
            return callback();
        }
    }

    d();
}

// timer(1000 * 60, function () {
//     fs.readFile("../logs/out.log", {encoding: "utf-8"}, function (err, data) {
//         if (err) {
//             console.log(err);
//         } else {
//             var lineNumber = data.match(/\n/g);
//             lineNumber = (lineNumber && lineNumber.length) || 0;
//             console.log("当前文件写入了" + lineNumber + "行");
//         }
//     });
// }, function () {
//     console.log("结束读文件");
// }, 20);


fs.readFile("e:/LOGS/out.log", {encoding: "utf-8"}, function (err, data) {
    if (err) {
        console.log(err);
    } else {
        console.log(data);
        var d = JSON.parse(data.toString());
        // console.log(d.index)
    }
});


