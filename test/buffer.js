/**
 * Created by wangqun6 on 2017/3/25.
 */

var fs = require("fs");
var buffer = Buffer.from([0x7b, 0x22, 0x69, 0x6e, 0x64, 0x65, 0x78, 0x22, 0x3a, 0x30, 0x7d, 0x0d, 0x0a]);
var s = fs.createWriteStream("./out.txt", {flag: "a"});
s.write(buffer);
s.end();
