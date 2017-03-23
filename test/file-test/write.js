/**
 * Created by wangqun6 on 2017/3/18.
 */
var fs = require("fs");
var start = Date.now(); // 写一分钟

function write(fd, str) {
    var buff = new Buffer(str);
    fs.writeSync(fd, buff, 0, buff.byteLength, null);
}


fs.open("./target.txt", "a+", function (err, fd) {
    if (!err) {
        console.log("A: " + read(fd));
        write(fd, "\nim from china");
        setTimeout(function () {
            fs.closeSync(fd);
        }, 3000);
    }
    else {
        console.log(err)
    }
});