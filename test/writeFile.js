/**
 * Created by wangqun6 on 2017/3/23.
 */


var tool = require("../tool/tool");

//
var t0 = Date.now();
var src = "../logs/" + Date.now() + ".log";
var task = [];
tool.loop(10000, function (i) {
    task.push(function (done) {
        tool.write(src, {
            in: i
        }, setTimeout(done,0));
    });
});

tool.queue(task, function () {
    console.log("write end: " + (Date.now() - t0));
});


process.on("exit", function () {
    console.log(Date.now() - t0);
});

console.log("code end ");

