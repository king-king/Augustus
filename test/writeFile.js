/**
 * Created by wangqun6 on 2017/3/23.
 */
// process.env.NODE_DEBUG = 'fs';

var t = require("../lib/tool");
var fs = require("fs");
var writer = require("../lib/file").writer;

var t0 = Date.now();
// var src = "../logs/" + Date.now() + ".log";
var src = "e:/LOGS/out.log";

var stream = fs.createWriteStream(src, {flags: 'a'});

t.loop(1000000, function (i) {
    stream.write("{\"index\":" + i + "}" + "\r\n");
});
// fs.unlink(src, function () {
//     console.log("删除");
// })
process.on("exit", function () {
    stream.end();
    console.log("spend " + (Date.now() - t0) + " ms");
});


