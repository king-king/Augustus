/**
 * Created by wangqun6 on 2017/3/27.
 */

// var os = require("os");
// console.log(JSON.stringify(os.userInfo()));
function timer(delay, func) {
    func(function () {
        setTimeout(function () {
            timer(delay, func);
        }, delay);
    });
}

var i = 0;
try {
    timer(0, function (done) {
        console.log(i++);
        done();
    });
} catch (e) {
    console.log(e);
}