/**
 * Created by wangqun6 on 2017/3/24.
 */

var os = require("os");
var fork = require('child_process').fork;
var t0 = Date.now();
var t = require("../lib/tool");

t.loop(os.cpus().length, function () {
    var child = fork("./cluster-writeFile");
    child.on("exit", function () {
        // console.log("子进程退出了");
    });
});

process.on("exit", function () {
    console.log("父进程共耗时：" + (Date.now() - t0));
});