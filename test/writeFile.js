/**
 * Created by wangqun6 on 2017/3/23.
 */
// process.env.NODE_DEBUG = 'fs';

var t = require("../tool/tool");
var fs = require("fs");
//
var t0 = Date.now();
// var src = "../logs/" + Date.now() + ".log";
var src = "e:/out.log";


var stream = fs.createWriteStream(src, {
    flags: 'a'
});

function writer(src) {
    // 仅处理utf-8的字符串
    var stream = fs.createWriteStream(src, {
        flags: 'a'
    });
    var bufferString = "";
    var status = true;
    var count = 0;
    return {
        write: function (string) {
            count++;
            var str = string + "\n";
            if (status) {
                status = stream.write(str, "utf-8");
                if (!status) {
                    // 写满了，后续内容加到bufferString中,直到drain事件被触发
                    stream.once("drain", function () {
                        status = stream.write(bufferString, "utf-8");
                        bufferString = "";
                    });
                }
            } else {
                bufferString += str;
            }
        },
        close: function () {
            stream.end();
            stream = bufferString = status = count = null;
        }
    };
}

//
var w = writer(src);
t.loop(1000000, function (i) {
    w.write("{index: " + i + ", name: 'wangqun'}");
});

// t.loop(1000000, function (i) {
//     stream.write(JSON.stringify({
//             index: i++, name: "wangqun"
//         }) + "\n");
// });

// var i = 0;
// t.timer(30 * 1000, function () {
//     stream.write(JSON.stringify({
//             index: i++
//         }) + "\n");
// }, function () {
//     console.log("write end");
// }, 2000);

console.log("code end " + (Date.now() - t0));

process.on("exit", function () {
    w.close();
    console.log(Date.now() - t0);
});


