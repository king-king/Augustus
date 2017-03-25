/**
 * Created by wangqun6 on 2017/3/23.
 */
// process.env.NODE_DEBUG = 'fs';

var t = require("../lib/tool");
var fs = require("fs");
var writer = require("../lib/file");
var t0 = Date.now();
// var src = "../logs/" + Date.now() + ".log";
var src = "e:/LOGS/out.log";

var stream = fs.createWriteStream(src, {flags: 'a'});

stream.on("open", function () {
    console.log("open " + stream.bytesWritten)
});
t.loop(1, function (i) {
    stream.write("{\"index\":" + i + "}" + "\r\n");
});

console.log(Buffer.from("{\"index\":" + 0 + "}" + "\r\n", "utf-8"));

process.on("exit", function () {
    stream.end();
    console.log("spend " + Date.now() - t0 + " ms");
});


