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
    var isClose = false;

    function writeTosStream(str) {
        if (!isClose) {
            status = stream.write(str, "utf-8");
            function process() {
                // 写满了，后续内容加到bufferString中,直到drain事件被触发
                !status && stream.once("drain", function () {
                    // 此时可能已经调用end事件
                    if (!isClose) {
                        status = stream.write(bufferString);
                        bufferString = "";
                        !status && process();
                    }
                });
            }

            process();
        }
    }

    function writeToBuffer(str) {
        bufferString += str;
    }

    return {
        write: function (string) {
            if (!isClose) {
                var str = string + enter_char;
                if (status) {
                    writeTosStream(str);
                } else {
                    writeToBuffer(str);
                }
            }
        },
        close: function () {
            bufferString && stream.end(bufferString);
            isClose = true;
        }
    };
}

module.exports.writer = writer;