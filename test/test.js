/**
 * Created by wangqun6 on 2017/3/27.
 */


var time = require("../lib/time");
var ump = require("../lib/ump_log_writer");
var f = ump.tp();
var t0 = Date.now();
var t = time.getUMPtime();
for (var i = 0; i < 1000000; i++) {
    f.write("zs.jd.com", "123", t);
}
console.log("run :" + (Date.now() - t0) + "ms");

process.on("exit", function () {
    console.log("end :" + (Date.now() - t0) + "ms");
});