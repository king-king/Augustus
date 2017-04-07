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
console.log("pid：" + process.pid);

function processSearch(search) {
    var result = {};
    var arr = search.slice(1).split("&");
    var len = arr.length;
    for (var i = 0; i < len; i++) {
        var item = arr[i].split("=");
        result[item[0]] = decodeURIComponent(item[1]);
    }
    return result;
}
var index = 0;
var server = http.createServer(function (req, res) {
    var urlObj = url.parse(req.url);
    var pathname = urlObj.pathname;
    var search = urlObj.search;
    // console.log(pathname, search);
    switch (pathname) {
        case "/paintTime.jpg":
            /**
             *  记录白屏和首屏时间url的格式是：
             *  /paintTime.jpg?firstPaintTime=32132&allPaintTime=43243&time=yyyyMMddHHmmssSSS
             *  /\?firstPaintTime=\d+&allPaintTime=\d+&time=\d{17}$/
             */
            if (( /\?firstPaintTime=\d+&allPaintTime=\d+&time=\d{17}$/).test(search)) {
                console.log(index++);
                // 只有search部分匹配了才做进一步的处理
                var obj = processSearch(search);
                // 写入白屏数据
                tp.write(umpConfig.firstPaintKey, obj.firstPaintTime, obj.time);
                // 写入首屏数据
                tp.write(umpConfig.allPaintKey, obj.allPaintTime, obj.time);
            }
            break;
        case "/ajax_warn.jpg":
            /**
             * 记录ajax出错的url格式：
             * /?url={ajax-url}&time=yyyyMMddHHmmssSSS&detail={detail}
             * */
            var searchObj = processSearch(search);
            if (searchObj.url && searchObj.time && searchObj.detail) {
                warn.write(umpConfig.ajaxWarnKey, "url:" + searchObj.url + ";detail:" + searchObj.detail, searchObj.time);
            }
            break;
    }
    res.statusCode = 200;
    res.setHeader('Content-Type', 'image/jpeg');
    // res.write("0");
    res.end();
});

server.listen(port, hostname, function () {
    console.log("Server running");
});