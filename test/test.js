/**
 * Created by wangqun6 on 2017/3/27.
 */


var time = require("../lib/time");

var ump = require("../lib/ump_log_writer");
var f = ump.tp("zs.jd.com", 3500);
var t0 = Date.now();
var t = time.getUMPtime();
for (var i = 0; i < 5000; i++) {
    f.write(i, i + 1);
}
console.log("run :" + (Date.now() - t0) + "ms");

process.on("exit", function () {
    console.log("end :" + (Date.now() - t0) + "ms");
});


// var hostname = "wangqun6";
// var count = 0;
// function test(key, st, t) {
//     var content = "{\"time\":\"" + (t ? t : time.getUMPtime()) + "\",\"key\":\"" + key + "\",\"hostname\":\"" + hostname + "\",\"processState\":\"0\",\"elapsedTime\":\"" + st + "\"}";
//     content = count++ ? eol + content : content;
// }
// var t0 = Date.now();
// for (var i = 0; i < 1000000; i++) {
//     test("zs.jd.com", "123", "20170327181119476");
// }
// console.log("end: " + (Date.now() - t0));