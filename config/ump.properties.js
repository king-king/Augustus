// ump的配置
module.exports = {
    "outDir": "E:/LOGS/",
    hostname: "",
    tp: {
        maxLineNum: 500000
    },
    business: {
        maxLineNum: 500000
    },
    firstPaintKey: "com.jd.zs.firstpaint",// 监控白屏时间的key
    allPaintKey: "com.jd.zs.allpaint"// 监控首屏时间的key

};