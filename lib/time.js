/**
 * Created by wangqun6 on 2017/3/27.
 */

function getUMPtime() {
    // yyyyMMddHHmmssSSS
    // num，数字，count，补几位，例如append(38,3)=>"038",append(3,3)=>"003"
    function append(num, count) {
        var str = num.toString();
        if (count === 3) {

        }
    }

    var t = new Date();
    var year = t.getFullYear();
    var month = t.getMonth() + 1;
    var date = t.getDate();
    var houer = t.getHours();
    var minutes = t.getMinutes();
    var second = t.getSeconds();
    var millSecond = t.getMilliseconds();

}

module.exports.timer = timer;