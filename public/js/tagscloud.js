var radius = 95; //内容呈现圈的范围大小
var d = 200; //直径
var dr = Math.PI / 180; //1度
var mcList = [];
var lasta = 1;
var lastb = 1;
var distr = true;
var speed = 11; //速度
var size = 200; //比较数
var mouseX = 0; //x轴
var mouseY = 10; //Y轴
var howElliptical = 1; //定义椭圆
//声明对象
var aA = null;
var oDiv = null;

window.onload = function() {
    var i = 0;
    //声明对象
    var oTag = null;
    oDiv = document.getElementById('tagscloud');
    aA = oDiv.getElementsByTagName('a'); //全体a标签
    for (i = 0; i < aA.length; i++) {
        oTag = {};
        //鼠标指针移动到元素上时触发         
        aA[i].onmouseover = (function(obj) {
                return function() {
                    //支持动态元素绑定事件
                    obj.on = true;
                    this.style.zIndex = 9999;
                    this.style.color = '#fff';
                    this.style.padding = '5px 5px';
                    this.style.filter = "alpha(opacity=100)";
                    this.style.opacity = 1;
                }
            })(oTag)
            //鼠标指针离开元素时触发
        aA[i].onmouseout = (function(obj) {
            return function() {
                obj.on = false;
                this.style.zIndex = obj.zIndex;
                this.style.color = '#fff';
                this.style.padding = '5px';
                this.style.filter = "alpha(opacity=" + 100 * obj.alpha + ")";
                this.style.opacity = obj.alpha;
                this.style.zIndex = obj.zIndex;
            }
        })(oTag)
        oTag.offsetWidth = aA[i].offsetWidth; //水平
        oTag.offsetHeight = aA[i].offsetHeight; //垂直
        mcList.push(oTag); //a标签
    }
    sineCosine(0, 0, 0); //原点
    positionAll();
    (function() {
        update();
        setTimeout(arguments.callee, 40);
    })();
};

function update() {
    var a, b, c = 0;
    a = (Math.min(Math.max(-mouseY, -size), size) / radius) * speed; //Y轴上动
    b = (-Math.min(Math.max(-mouseX, -size), size) / radius) * speed; //X轴不动
    lasta = a;
    lastb = b;
    //绝对值
    if (Math.abs(a) <= 0.01 && Math.abs(b) <= 0.01) {
        return;
    }
    sineCosine(a, b, c);

    for (var i = 0; i < mcList.length; i++) {
        if (mcList[i].on) {
            continue;
        }
        var rx1 = mcList[i].cx;
        var ry1 = mcList[i].cy * ca + mcList[i].cz * (-sa);
        var rz1 = mcList[i].cy * sa + mcList[i].cz * ca;

        var rx2 = rx1 * cb + rz1 * sb;
        var ry2 = ry1;
        var rz2 = rx1 * (-sb) + rz1 * cb;

        var rx3 = rx2 * cc + ry2 * (-sc);
        var ry3 = rx2 * sc + ry2 * cc;
        var rz3 = rz2;

        mcList[i].cx = rx3;
        mcList[i].cy = ry3;
        mcList[i].cz = rz3;

        per = d / (d + rz3);

        mcList[i].x = (howElliptical * rx3 * per) - (howElliptical * 2);
        mcList[i].y = ry3 * per;
        mcList[i].scale = per;
        var alpha = per;
        alpha = (alpha - 0.6) * (10 / 6);
        mcList[i].alpha = alpha * alpha * alpha - 0.2;
        mcList[i].zIndex = Math.ceil(100 - Math.floor(mcList[i].cz));
    }
    doPosition();
}

function positionAll() {
    var phi = 0;
    var theta = 0;
    var max = mcList.length;
    for (var i = 0; i < max; i++) {
        if (distr) {
            //反余炫值
            phi = Math.acos(-1 + (2 * (i + 1) - 1) / max);
            theta = Math.sqrt(max * Math.PI) * phi;
        } else {
            phi = Math.random() * (Math.PI);
            theta = Math.random() * (2 * Math.PI);
        }
        //坐标变换
        mcList[i].cx = radius * Math.cos(theta) * Math.sin(phi);
        mcList[i].cy = radius * Math.sin(theta) * Math.sin(phi);
        mcList[i].cz = radius * Math.cos(phi);
        aA[i].style.left = mcList[i].cx + oDiv.offsetWidth / 2 - mcList[i].offsetWidth / 2 + 'px';
        aA[i].style.top = mcList[i].cy + oDiv.offsetHeight / 2 - mcList[i].offsetHeight / 2 + 'px';
    }
}

function doPosition() {
    var l = oDiv.offsetWidth / 2;
    var t = oDiv.offsetHeight / 2;
    for (var i = 0; i < mcList.length; i++) {
        if (mcList[i].on) {
            continue;
        }
        var aAs = aA[i].style;
        if (mcList[i].alpha > 0.1) {
            if (aAs.display != '')
                aAs.display = '';
        } else {
            if (aAs.display != 'none')
                aAs.display = 'none';
            continue;
        }
        aAs.left = mcList[i].cx + l - mcList[i].offsetWidth / 2 + 'px';
        aAs.top = mcList[i].cy + t - mcList[i].offsetHeight / 2 + 'px';
        aAs.filter = "alpha(opacity=" + 100 * mcList[i].alpha + ")";
        aAs.zIndex = mcList[i].zIndex;
        aAs.opacity = mcList[i].alpha;
    }
}

function sineCosine(a, b, c) {
    sa = Math.sin(a * dr);
    ca = Math.cos(a * dr);
    sb = Math.sin(b * dr);
    cb = Math.cos(b * dr);
    sc = Math.sin(c * dr);
    cc = Math.cos(c * dr);
}