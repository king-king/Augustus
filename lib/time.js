/**
 * Created by wangqun6 on 2017/3/27.
 */
// 针对异步任务的定时器，每次任务执行完后func都要调用回调，才能继续触发
function timer(delay, func) {
    func(function () {
        setTimeout(function () {
            timer(delay, func);
        }, delay);
    });
}

module.exports.timer = timer;