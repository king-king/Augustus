/**
 * Created by wangqun6 on 2017/4/6.
 */

var http = require("http");
function c(task, callback) {
    var index = 0;
    var len = task.length;
    for (var i = 0; i < len; i++) {
        task[i](function () {
            if (++index === len) {
                callback();
            }
        });
    }
}
function getUMPTime() {
    // yyyyMMddHHmmssSSS
    // num，数字，count，补几位，例如append(38,3)=>"038",append(3,3)=>"003"
    // count不能比num的位数少,少的话不起作用
    function appendPrefix(num, count) {
        var str = num.toString();
        var len = str.length;
        var n = count - len;
        var prefix = ["", "0", "00", "000", "0000", "00000"];
        if (len < count) {
            // 很难超出长度大于6的情况，就不要再拼接了，频繁写的情况还是能节约时间的
            if (n < 6) {
                str = prefix[n] + str;
            } else {
                for (var i = 0; i < n; i++) {
                    str = "0" + str;
                }
            }
        }
        return str;
    }

    var t = new Date(),
        year = t.getFullYear(),
        month = appendPrefix(t.getMonth() + 1, 2),
        date = appendPrefix(t.getDate(), 2),
        hour = appendPrefix(t.getHours(), 2),
        minutes = appendPrefix(t.getMinutes(), 2),
        second = appendPrefix(t.getSeconds(), 2),
        millSecond = appendPrefix(t.getMilliseconds(), 3);
    return "" + year + month + date + hour + minutes + second + millSecond;
}

function loop(n, func) {
    for (var i = 0; i < n; i++) {
        func(i);
    }
}
var task = [];
var num = 2000;

loop(num, function (i) {
    task.push(function (done) {
        http.get("http://127.0.0.1/paintTime.jpg?firstPaintTime=" + i +
            "&allPaintTime=" + i + "&time=" + getUMPTime(), function (res) {
            res.resume();
            done();
        });
    });
});

var unsolve = [];

function test() {
    unsolve.push(1);
    var t = Date.now();
    c(task, function () {
        console.log("个请求全部执行完毕共耗时：" + (Date.now() - t) + "ms" + " 平均耗时：" + (Date.now() - t) / num + "ms");
        unsolve.pop();
        if (unsolve.length) {
            console.log("目前还有" + unsolve.length * num + "项请求服务器没有返回")
        }
        test();
        // setTimeout(test, 500);
    });
}
test();