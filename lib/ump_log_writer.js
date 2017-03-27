/**
 * Created by wangqun6 on 2017/3/27.
 */
var os = require("os");
var writer = require("./file_writer").writer;
var umpConfig = require("../config/ump.properties");
var time = require("../lib/time");

// 只要引入了这个文件，删除过期/过大文件是自动做的

var hostname = os.userInfo().hostname || "";
function tp(key) {
    // time,hostname,processState,key,elapsedTime,[count]
    var count = 0;
    // 生成一个新的文件名
    function newName() {
        var now = Date.now();
        return umpConfig.outDir + now + "_" + process.pid + "_tp.log"
    }

    var file = writer(newName());
    return {
        writer: function (key, elapsedTime) {
            // 现在的数据，暂时先不压缩，因为统计时间的话，压缩会把极值给磨平
            // 为了节约时间，不用JSON.stringify，而是直接拼字符串
            file.write("{\"time\":\"" + time.getUMPtime() + "\",\"key\":\"" + key + "\",\"hostname\":\"" + hostname + "\",\"processState\":\"0\",\"elapsedTime\":\"" + elapsedTime + "\"}");
        },
        close: function () {
            file.close();
        }
    };
}

console.log(umpConfig.fileLife);