/**
 * Created by wangqun6 on 2017/3/27.
 */
var os = require("os");
var writer = require("./file_writer").writer;
var umpConfig = require("../config/ump.properties");

// 只要引入了这个文件，删除过期/过大文件是自动做的

var hostname = os.userInfo().hostname || "";
function tp(key) {
    // time,hostname,processState,key,elapsedTime,[count]
    // 3s,100条
    var buffer = "";
    var count = 0;
    return {
        writer: function (key, elapsedTime) {
            if (count > 0) {

            }
        }
    };
}

console.log(umpConfig.fileLife);