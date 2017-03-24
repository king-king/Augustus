/**
 * Created by wangqun6 on 2017/3/23.
 */
// process.env.NODE_DEBUG = 'fs';

var t = require("../lib/tool");
var fs = require("fs");
var writer = require("../lib/file");
var t0 = Date.now();
// var src = "../logs/" + Date.now() + ".log";
var src = "e:/out.log";


var w = writer.writer(src);
t.loop(20, function (i) {
    w.write("{index: " + i + ", name: 'wangqun'}");
});

console.log("code end " + (Date.now() - t0));

process.on("exit", function () {
    w.close();
    console.log(Date.now() - t0);
});


