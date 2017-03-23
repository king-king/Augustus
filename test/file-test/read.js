/**
 * Created by wangqun6 on 2017/3/18.
 */

var fs = require("fs");

function read(fd) {
    var buf = new Buffer(10000);
    var bytesRead = fs.readSync(fd, buf, 0, 10000, null);
    return buf.slice(0, bytesRead).toString("utf-8");
}

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


fs.open("./target.txt", "a+", function (err, fd) {
    if (!err) {
        setTimeout(function () {
            console.log("B: " + read(fd));
            fs.closeSync(fd);
        }, 2000);
    }
    else {
        console.log(err)
    }
});