/**
 * Created by wangqun6 on 2017/3/27.
 */



function test() {
    var d = Date.now();
    for (var i = 0; i < 3000000; i++) {
        // var str = i.toString();
        var str = i + "";
    }
    console.log(Date.now() - d);
}
var count = 50;
var t1 = Date.now();
for (var i = 0; i < count; i++) {
    test();
}
console.log("end :" + (Date.now() - t1));