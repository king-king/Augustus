/**
 * Created by wangqun6 on 2017/3/23.
 */
// process.env.NODE_DEBUG = 'fs';

var t = require("../tool/tool");
var fs = require("fs");
//
var t0 = Date.now();
// var src = "../logs/" + Date.now() + ".log";
var src = "../logs/out.log";


var stream = fs.createWriteStream(src, {
    flags: 'a'
});
//
t.loop(1000000, function (i) {
    setTimeout(function () {
        if (i % 1000 === 0) {
            stream.uncork();
        }
        stream.write(JSON.stringify({
                index: i
            }) + "\n", "utf-8", function () {
        });
    }, 0);
});

// var i = 0;
// t.timer(20 * 1000, function () {
//     stream.write(JSON.stringify({
//             index: i++
//         }) + "\n");
// }, function () {
//     console.log("write end");
// }, 1000);

console.log("code end " + (Date.now() - t0));

process.on("exit", function () {
    console.log(Date.now() - t0);
});


