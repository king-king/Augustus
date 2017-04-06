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
    firstPaintKey: "com.jd.zs.frontend.firstpaint",// 监控白屏时间的key
    allPaintKey: "com.jd.zs.frontend.allpaint",// 监控首屏时间的key
    ajaxWarnKey: "com.jd.zs.frontend.warn"// 记录ajax自定义报警的key
};