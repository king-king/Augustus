var http = require('http');
var url = require("url");
var fs = require("fs");
var ump = require("../lib/ump_log_writer");
var umpConfig = require("../config/ump.properties");

var hostname = '127.0.0.1';
var port = 80;
var file = fs.readFileSync("../public/images/result.jpg");
var tp = ump.tp();
var warn = ump.warn();

function processSearch(search) {
    var result = {};
    var arr = decodeURIComponent(search).slice(1).split("&");
    var len = arr.length;
    for (var i = 0; i < len; i++) {
        var item = arr[i].split("=");
        result[item[0]] = item[1];
    }
    return result;
}

var server = http.createServer(function (req, res) {
    var urlObj = url.parse(req.url);
    var pathname = urlObj.pathname;
    var search = urlObj.search;
    console.log(pathname, search);
    switch (pathname) {
        case "/tp.jpg":
            /**
             *  记录白屏和首屏时间url的格式是：
             *  /tp.jpg?firstPaintTime=32132&allPaintTime=43243&time=yyyyMMddHHmmssSSS
             *  /\?firstPaintTime=\d+&allPaintTime=\d+&time=\d{17}$/
             */
            if (( /\?firstPaintTime=\d+&allPaintTime=\d+&time=\d{17}$/).test(search)) {
                // 只有search部分匹配了才做进一步的处理
                var obj = processSearch(search);
                // 写入白屏数据
                tp.write(umpConfig.firstPaintKey, obj.firstPaintTime, obj.time);
                // 写入首屏数据
                tp.write(umpConfig.allPaintKey, obj.allPaintTime, obj.time);
            }
            break;
        case "/warn.jpg":
            break;
    }
    res.statusCode = 200;
    res.setHeader('Content-Type', 'image/jpeg');
    res.write("0");
    res.end();
});

server.listen(port, hostname, function () {
    console.log("Server running");
});