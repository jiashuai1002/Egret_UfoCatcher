var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var MathUtils = (function () {
    function MathUtils() {
    }
    /**
     * 计算距离
     */
    MathUtils.cacuDistance = function (x1, y1, x2, y2) {
        return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    };
    /**
     * 判断线段与矩形是否相交
     */
    MathUtils.lineRectIntersection = function (start, end, rect) {
        var a = start.y - end.y;
        var b = end.x - start.x;
        var c = start.x * end.y - end.x * start.y;
        var left = rect.x;
        var top = rect.y;
        var right = rect.x + rect.width;
        var bottom = rect.y + rect.height;
        if (this.pointInRect(start, rect) || this.pointInRect(end, rect)) {
            return true;
        }
        if ((a * left + b * top + c >= 0 && a * right + b * bottom + c <= 0) ||
            (a * left + b * top + c <= 0 && a * right + b * bottom + c >= 0) ||
            (a * left + b * bottom + c >= 0 && a * right + b * top + c <= 0) ||
            (a * left + b * bottom + c >= 0 && a * right + b * top + c <= 0)) {
            if ((start.x < left && end.x < left) ||
                (start.x > right && end.x < left) ||
                (start.y > top && end.y > top) ||
                (start.y < bottom && end.y < bottom)) {
                return false;
            }
            else {
                return true;
            }
        }
        else {
            return false;
        }
    };
    /**
     * 检测点在矩形中
     */
    MathUtils.pointInRect = function (point, rect) {
        return point.x >= rect.x && point.x <= rect.x + rect.width &&
            point.y >= rect.y && point.y <= rect.y + rect.height;
    };
    /**
     * 获取一个区间的随机数
     */
    MathUtils.random = function ($from, $end) {
        $from = Math.min($from, $end);
        $end = Math.max($from, $end);
        var range = $end - $from;
        return $from + Math.random() * range;
    };
    /**
     * 获取一个区间的随机数(整数)
     */
    MathUtils.randomInt = function ($from, $end) {
        return Math.floor(this.random($from, $end + 1));
    };
    /**
     * 检测手机号
     */
    MathUtils.checkMobile = function (mobile) {
        return mobile && mobile.match("^1[3|4|5|7|8][0-9]\\d{8}$") != null;
    };
    /**
     * 检查姓名
     */
    MathUtils.checkName = function (name) {
        return name && name.match("^[\u4e00-\u9fa5]{2,7}$") != null;
    };
    /**
     * 边界判断
     */
    MathUtils.between = function (value, min, max) {
        return Math.min(Math.max(min, value), max);
    };
    return MathUtils;
}());
__reflect(MathUtils.prototype, "MathUtils");
