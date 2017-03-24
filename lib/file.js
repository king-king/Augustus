/**
 * Created by wangqun6 on 2017/3/24.
 */

var os = require("os"),
    fs = require("fs");

var enter_char = os.EOL;

function writer(src) {
    // 仅处理utf-8的字符串
    var stream = fs.createWriteStream(src, {
        flags: 'a'
    });
    var bufferString = "";
    var status = true;
    var count = 0;
    var onEnd = function () {
    };
    var isClose = false;

    function writeTosStream(str) {
        if (!isClose) {
            status = stream.write(str, "utf-8");
            // 写满了，后续内容加到bufferString中,直到drain事件被触发
            !status && stream.once("drain", function () {
                bufferString = "";
                // 有可能写了之后继续超过buffer
                writeTosStream(bufferString);
            });
        }
    }

    function writeToBuffer(str) {
        bufferString += str;
    }

    return {
        write: function (string) {
            if (!isClose) {
                var str = count++ ? enter_char + string : string;
                if (status) {
                    writeTosStream(str);
                } else {
                    writeToBuffer(str);
                }
            }
        },
        close: function () {
            stream.end(bufferString);
            isClose = true;
        }
    };
}

module.exports.writer = writer;