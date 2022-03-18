window.addEventListener("load", function () {
    var arrow_l = document.querySelector(".arrow_l");
    var arrow_r = document.querySelector(".arrow_r");
    var focus = document.querySelector(".focus");
    var focusWidth = focusWidth = focus.offsetWidth;;
    // var arrow_l=document.querySelector('.arrow_l');
    // 1. 鼠标经过显示箭头
    focus.addEventListener("mouseenter", function () {
        arrow_l.style.display = "block";
        arrow_r.style.display = "block";
        clearInterval(timer);
        timer = null; // 清除定时器
    });
    // 2. 鼠标离开隐藏箭头
    focus.addEventListener("mouseleave", function () {
        arrow_l.style.display = "none";
        arrow_r.style.display = "none";
        timer = setInterval(function () {
            // 手动调用点击事件
            arrow_r.click();
        }, 3000);
    });
    // 3. 有几图,有几圈
    var ul = focus.querySelector("ul");
    var ol = focus.querySelector(".circle");
    for (let index = 0; index < ul.children.length; index++) {
        // 创建li
        var li = document.createElement("li");
        // 给li加一个自定义参数index存放索引号
        li.setAttribute('index', index);
        ol.appendChild(li);
        // 给每一个li绑定点击事件
        li.addEventListener('click', function () {
            // 排他
            for (let index = 0; index < ol.children.length; index++) {
                ol.children[index].className = "";
            }
            // this 当前的这个li
            this.className = "current";
            // 5. 点击圈圈,移动ul
            // ul 移动的距离等于index*图片宽度
            // 点击哪个li得到其索引值
            var index = this.getAttribute('index');
            // 8. 与 5. 联调解决bug 
            num = index;
            circle = index;
            // 图片的宽度
            // focusWidth = focus.offsetWidth;
            animate(ul, -(index * focusWidth));
        })
    }
    // 4. 选中的 ol>li 为白色
    ol.children[0].className = "current";
    // 6. 复制第一张图片,准备做无缝图
    var first = ul.children[0].cloneNode('true');
    ul.appendChild(first);

    var num = 0;
    // 8. circle 控制小圆圈的播放
    var circle = 0;
    // flag 及节流阀
    var flag = true;

    // 7. 点击箭头,跳图片
    arrow_r.addEventListener('click', function () {
        if (flag) {
            flag = false; // 节流阀
            if (num == ul.children.length - 1) {
                ul.style.left = 0;
                num = 0;
            }
            num++;
            animate(ul, -num * focusWidth, function () {
                flag = true; // 节流阀
            });
            // 8. 
            circle++;
            circle = circle == ol.children.length ? 0 : circle;
            // 排他
            circleChange();

        }

    })
    // 9. 左侧点击
    arrow_l.addEventListener('click', function () {
        if (flag) {
            flag = false; if (num == 0) {
                num = ul.children.length - 1;
                ul.style.left = -num * focusWidth + 'px';
                // 跳到最后一张

            }
            num--;
            animate(ul, -num * focusWidth, function () {
                flag = true;
            });
            // 8. 
            circle--;
            circle = circle < 0 ? ol.children.length - 1 : circle;
            // 排他
            circleChange();

        }

    })
    function circleChange() {
        for (let index = 0; index < ol.children.length; index++) {
            ol.children[index].className = '';
        }
        ol.children[circle].className = 'current';
    }
    // 10. 轮播图自动播放
    var timer = setInterval(function () {
        // 手动调用点击事件
        arrow_r.click();
    }, 3000);

});
