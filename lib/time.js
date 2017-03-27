/**
 * Created by wangqun6 on 2017/3/27.
 */
function timer(delay, func) {
    var id;

    function d() {
        clearTimeout(id);
        func();
        id = setTimeout(d, delay);
    }

    return {
        start: d,
        stop: function () {
            clearTimeout(id);
        }
    };
}

module.exports.timer = timer;