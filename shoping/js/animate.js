function animate(obj, target, callback) {
    // 多次点击会开启多个定时器,会叠加状态
    // 解决方案,让元素只能开启一个定时器
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        // 缓动动画,步长,越来越小,步长公式: (目标值-现在的位置)/10
        //------------------------------------
        // var step = (target - obj.offsetLeft) / 10; 这句话有bug
        // 修改为var step =Math.ceil((target - obj.offsetLeft) / 10) ;
        // 向上取整
        //----------------------------------------
        //万一step是负呢? 所以要判断一下

        var step = (target - obj.offsetLeft) / 15;
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        obj.style.left = obj.offsetLeft + step + "px";
        if (obj.offsetLeft == target) {
            clearInterval(obj.timer);
            // if (callback) {
            //     callback();
            // }
            callback && callback();
        }
    }, 15);
}