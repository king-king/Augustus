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

t.loop(5000000, function (i) {
    stream.write(JSON.stringify({
            index: i
        }) + "\n");
});


process.on("exit", function () {
    console.log(Date.now() - t0);
});


