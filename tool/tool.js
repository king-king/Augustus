/**
 * Created by wangqun6 on 2017/3/23.
 */
var fs = require("fs");

function loop(n, func) {
    for (var i = 0; i < n; i++) {
        func(i);
    }
}
function loopArray(arr, callback) {
    var len = arr.length;
    for (var i = 0; i < len; i++) {
        callback(arr[i], i);
    }
}

function queue(task, callback) {
    var index = 0;
    var len = task.length;
    if (len === 0) {
        callback();
    } else {
        task[index](function () {
            if (++index === len) {
                callback();
            } else {
                try {
                    task[index](arguments.callee);
                } catch (e) {
                    console.log(e)
                }
            }
        });
    }
}

function write(src, content, callback) {
    fs.writeFile(src, JSON.stringify(content) + "\n", {flag: "a"}, callback);
}
module.exports.loop = loop;
module.exports.loopArray = loopArray;
module.exports.queue = queue;
module.exports.write = write;
