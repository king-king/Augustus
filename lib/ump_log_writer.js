/**
 * Created by wangqun6 on 2017/3/27.
 */
var os = require("os");
var writer = require("./file_writer").writer;
var umpConfig = require("../config/ump.properties");
var time = require("../lib/time");
var tool = require("../lib/tool");

var hostname = umpConfig.hostname;

/**
 * time.getUMPtime()是一个非常耗时的方法，但是每条数据都要有这个字段，
 * 不建议在后端计算，建议前端采集数据的时候包含这条数据
 * @returns {{write: write, close: close}}
 * 这个接口会负责写文件，而且会负责维护文件写条数溢出自动切换新文件
 *
 *
 */

function tp() {
    // time,hostname,processState,key,elapsedTime,[count]
    var file = writer(newName());
    var fileLineNum = 1;
    var maxLineNum = umpConfig.tp.maxLineNum;
    // 生成一个新的文件名
    function newName() {
        return umpConfig.outDir + time.getUMPtime() + "_" + process.pid + "_tp.log"
    }

    return {
        write: function (key, elapsedTime, curTime) {
            /** 现在的数据，暂时先不压缩，因为统计时间的话，压缩会把极值给磨平
             为了节约时间，不用JSON.stringify，而是直接拼字符串
             试验过积累3s、1000条一次性写入，结果性能反而降低
             */
            var ct = curTime ? curTime : time.getUMPtime();
            var str = "{\"time\":\"" + ct + "\",\"key\":\"" + key + "\",\"hostname\":\""
                + hostname + "\",\"processState\":\"0\",\"elapsedTime\":\"" + elapsedTime + "\"}";
            fileLineNum++;
            file.write(str);
            if (fileLineNum > maxLineNum) {
                file.close();
                file = writer(newName());
                fileLineNum = 1;
            }
        },
        close: function () {
            file.close();
        }
    };
}

/** {
* "time":"20130531192148867",
* "key":"ump.direct.alarm",
* "hostname":" YPT-Wangyuan",
* "type":"0",
* "value":"0",
* "detail":" good luck!"}
 */
function warn() {
    var file = writer(newName());
    var fileLineNum = 1;
    var maxLineNum = umpConfig.business.maxLineNum;

    // 生成一个新的文件名
    function newName() {
        return umpConfig.outDir + time.getUMPtime() + "_" + process.pid + "_business.log"
    }

    return {
        write: function (key, detail, curTime) {
            /** 现在的数据，暂时先不压缩，因为统计时间的话，压缩会把极值给磨平
             为了节约时间，不用JSON.stringify，而是直接拼字符串
             试验过积累3s、1000条一次性写入，结果性能反而降低
             */
            var ct = curTime ? curTime : time.getUMPtime();
            var str = "{\"time\":\"" + ct + "\",\"key\":\"" + key + "\",\"hostname\":\"" + hostname
                + "\",\"type\":\"0\",\"value\":\"0\",\"detail\":\"" + detail + "\"}";
            fileLineNum++;
            file.write(str);
            if (fileLineNum > maxLineNum) {
                file.close();
                file = writer(newName());
                fileLineNum = 1;
            }
        },
        close: function () {
            file.close();
        }
    };
}

module.exports.tp = tp;
module.exports.warn = warn;