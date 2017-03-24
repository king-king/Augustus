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
    return {
        write: function (string) {
            var str = count++ ? enter_char + string : string;
            if (status) {
                status = stream.write(str, "utf-8");
                // 写满了，后续内容加到bufferString中,直到drain事件被触发
                !status && stream.once("drain", function () {
                    status = stream.write(bufferString, "utf-8");
                    bufferString = "";
                });
            } else {
                bufferString += str;
            }
        },
        close: function () {
            stream.end();
            stream = bufferString = status = count = null;
        }
    };
}

module.exports.writer = writer;