/**
 * Created by wangqun6 on 2017/3/27.
 */
var os = require("os");
var writer = require("./file_writer").writer;
var umpConfig = require("../config/ump.properties");
var time = require("../lib/time");
var eol = os.EOL;

var hostname = os.userInfo().hostname || "";

// time.getUMPtime()是一个非常耗时的方法，但是每条数据都要有这个字段，不建议在后端计算，建议前端采集数据的时候包含这条数据
function tp(key) {
    // time,hostname,processState,key,elapsedTime,[count]
    var count = 0;
    // 生成一个新的文件名
    function newName() {
        return umpConfig.outDir + time.getUMPtime() + "_" + process.pid + "_tp.log"
    }

    var file = writer(newName());
    return {
        write: function (key, elapsedTime, curTime) {
            // 现在的数据，暂时先不压缩，因为统计时间的话，压缩会把极值给磨平
            // 为了节约时间，不用JSON.stringify，而是直接拼字符串
            var ct = curTime ? curTime : time.getUMPtime();
            var content = "{\"time\":\"" + ct + "\",\"key\":\"" + key + "\",\"hostname\":\"" + hostname + "\",\"processState\":\"0\",\"elapsedTime\":\"" + elapsedTime + "\"}";
            content = count++ ? eol + content : content;
            file.write(content);
        },
        close: function () {
            file.close();
        }
    };
}

module.exports.tp = tp;