/**
 * Created by wangqun6 on 2017/3/27.
 */

function getUMPtime() {
    // yyyyMMddHHmmssSSS
    // num，数字，count，补几位，例如append(38,3)=>"038",append(3,3)=>"003"
    // count不能比num的位数少,少的话不起作用
    function appendPrefix(num, count) {
        var str = num.toString();
        var len = str.length;
        var n = count - len;
        var prefix = ["", "0", "00", "000", "0000", "00000"];
        if (len < count) {
            // n是1或2的情况特别常见，就不要再拼接了，频繁写的情况还是能节约时间的
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

module.exports.getUMPtime = getUMPtime;