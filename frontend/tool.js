/**
 * Created by wangqun6 on 2017/3/27.
 */

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

var log = {
    // /tp.jpg?firstPaintTime=32132&allPaintTime=43243&time=yyyyMMddHHmmssSSS
    time: function (ft, at) {
        var img = new Image();
        img.src = "http://127.0.0.1/paintTime.jpg?firstPaintTime=" + ft +
            "&allPaintTime=" + at + "&time=" + getUMPTime();
    },
    // /?url={ajax-url}&time=yyyyMMddHHmmssSSS&detail={detail}
    ajax: function (url, detail) {
        var img = new Image();
        img.src = "http://127.0.0.1/paintTime.jpg?url=" + encodeURIComponent(url) +
            "&time=" + getUMPTime() + "&detail=" + encodeURIComponent(detail);
    }
};

