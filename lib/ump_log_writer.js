/**
 * Created by wangqun6 on 2017/3/27.
 */
var os = require("os");
var writer = require("./file_writer").writer;
var umpConfig = require("../config/ump.properties");
var time = require("../lib/time");
var tool = require("../lib/tool");
var eol = os.EOL;

var hostname = os.hostname() || "";

/**
 * time.getUMPtime()是一个非常耗时的方法，但是每条数据都要有这个字段，
 * 不建议在后端计算，建议前端采集数据的时候包含这条数据
 * @param key
 * @returns {{write: write, close: close}}
 * 这个接口会负责写文件，而且会负责维护文件写条数溢出自动切换新文件
 *
 *
 */

var writeQueue = [];// 每隔3s清理一次未写入的内容
setInterval(function () {
    tool.loopArray(writeQueue, function (write) {
        write();
    })
}, 2000);

function tp(key, maxLineNum) {
    // time,hostname,processState,key,elapsedTime,[count]
    var file = writer(newName());
    var content = "";
    var fileLineNum = 0;
    var threshold = 0;// 满1000条写入

    // 生成一个新的文件名
    function newName() {
        return umpConfig.outDir + time.getUMPtime() + "_" + process.pid + "_tp.log"
    }

    function writeAll() {
        console.log(fileLineNum);
        content && file.write(content);
        content = "";
        threshold = 0;
        if (fileLineNum > maxLineNum) {
            file.close();
            file = writer(newName());
            fileLineNum = 0;
            threshold = 0;
        }
    }

    writeQueue.push(writeAll);

    return {
        write: function (elapsedTime, curTime) {
            /** 现在的数据，暂时先不压缩，因为统计时间的话，压缩会把极值给磨平
             为了节约时间，不用JSON.stringify，而是直接拼字符串
             会采取优化措施：积攒到1000条或3s，一次写入
             */
            var ct = curTime ? curTime : time.getUMPtime();
            var str = "{\"time\":\"" + ct + "\",\"key\":\"" + key + "\",\"hostname\":\"" + hostname + "\",\"processState\":\"0\",\"elapsedTime\":\"" + elapsedTime + "\"}";
            content += (threshold ? eol + str : str);
            threshold++;
            fileLineNum++;
            if (threshold > 1000) {
                writeAll(content);
            }
        },
        close: function () {
            file.close();
        }
    };
}

module.exports.tp = tp;