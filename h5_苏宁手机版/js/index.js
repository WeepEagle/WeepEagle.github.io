window.addEventListener("load", function () {
  // 1. 获取元素
  var focus = document.querySelector(".focus");
  var ul = focus.children[0];
  var ol = focus.children[1];
  // 获取focus 的宽度
  var w = focus.offsetWidth;
  // 2. 利用定时器自动轮播图片
  var index = 0;
  var timer = setInterval(function () {
    index++;
    var translatex = -index * w;
    ul.style.transition = "all .5s";
    ul.style.transform = "translateX(" + translatex + "px)";
    // 就三张图,循环到第三张就回到第一张
    //////////////////////////////////////

    /////////////////////////////////////
  }, 2000);
  // 动画走完再做判断
  ul.addEventListener("transitionend", function () {
    // 动画做完的事件监听
    // 无缝过渡
    console.log(ul.children.length);
    if (index >= 3) {
      ////
      index = 0;
      ul.style.transition = "none";
      // 这一次没有动画的跳到第一张
      var translatex = -index * w;
      ul.style.transform = "translateX(" + translatex + "px)";
    } else if (index < 0) {
      index = 2; ////
      ul.style.transition = "none";
      // 这一次没有动画的跳到第一张
      var translatex = -index * w;
      ul.style.transform = "translateX(" + translatex + "px)";
    }
    // 3. 小圆点跟随变换
    // 把ol里面带有current的li选出来,并去掉类名
    ol.querySelector(".current").classList.remove("current");
    ol.children[index].classList.add("current");
  });

  // 4. 手指轮播图
  // 触摸元素: touchstart 获取手指的初始坐标
  var startX = 0;
  var moveX = 0;
  var flag = false;
  ul.addEventListener("touchstart", function (e) {
    startX = e.targetTouches[0].pageX;
    // 手指触摸时停止定时器
    clearInterval(timer);
  });
  // 移动手指 touchmove : 获取手指的滑动距离   并且移动盒子
  ul.addEventListener("touchmove", function (e) {
    // 计算移动距离
    moveX = e.targetTouches[0].pageX - startX;
    // 移动盒子: 盒子原来的位置 + 手指移动的距离
    var translatex = -index * w + moveX;
    // 手指拖动的时候,不需要动画,所以要去掉动画
    ul.style.transition = "none";
    ul.style.transform = "translateX(" + translatex + "px)";
    flag = true;
  });
  // 手指离开,根据拖动的距离去判断是回弹还是播放上一张图片
  ul.addEventListener("touchend", function (e) {
    // 1). 如果移动距离大于50像素我们再判断移动方向
    if (flag) {
      if (Math.abs(moveX) > 50) {
        // 如果移动方向是右滑,即moveX是正值,播放上一张
        if (moveX > 0) {
          index--;
        } else {
          // 如果移动方向是左滑,即moveX是负值,播放下一张
          index++;
        }
        var translatex = -index * w;
        ul.style.transition = "all 0.5s";
        ul.style.transform = "translateX(" + translatex + "px)";
      } else {
        var translatex = -index * w;
        ul.style.transition = "all 0.5s";
        ul.style.transform = "translateX(" + translatex + "px)";
      }
      flag = false;
    }
    clearInterval("timer");
    timer = setInterval(function () {
      index++;
      var translatex = -index * w;
      ul.style.transition = "all .5s";
      ul.style.transform = "translateX(" + translatex + "px)";
    }, 2000);
  });

  // 返回按钮
  var goBack = document.querySelector(".goBack");
  var nav = document.querySelector("nav");
  window.addEventListener("scroll", function () {
    if (window.pageYOffset >= nav.offsetTop) {
      goBack.style.display = "block";
    } else {
      goBack.style.display = "none";
    }
  });
  goBack.addEventListener("click", function () {
    // window.scroll(0, 0); // 直接到顶,无动画
    animate(window, 0);
  });

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

      var step = (target - window.pageYOffset) / 15;
      step = step > 0 ? Math.ceil(step) : Math.floor(step);
      // obj.style.left = window.pageYOffset+ step + "px";
      window.scroll(0, window.pageYOffset + step);
      if (window.pageYOffset == target) {
        clearInterval(obj.timer);
        // if (callback) {
        //     callback();
        // }
        callback && callback();
      }
    }, 15);
  }
});
