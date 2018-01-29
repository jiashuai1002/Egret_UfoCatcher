var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *
 * 数组工具类
 *
 */
var ArrayUtils = (function () {
    function ArrayUtils() {
    }
    /**
     * 遍历操作
     * @param arr
     * @param func
     */
    ArrayUtils.forEach = function (arr, func, funcObj) {
        for (var i = 0, len = arr.length; i < len; i++) {
            func.apply(funcObj, [arr[i]]);
        }
    };
    /**
     * 复制数组
     */
    ArrayUtils.copyTo = function (src, dest) {
        if (src == null) {
            return;
        }
        if (dest == null) {
            dest = [];
        }
        for (var i = 0; i < src.length; i++) {
            dest.push(src[i]);
        }
    };
    /**
     * 移除元素
     */
    ArrayUtils.remove = function (arr, obj) {
        var index = arr.indexOf(obj);
        arr.splice(index, 1);
    };
    /**
     * 随机元素
     */
    ArrayUtils.random = function (arr) {
        if (arr == null || arr.length == 0)
            return null;
        var index = Math.floor(Math.random() * arr.length);
        return arr[index];
    };
    return ArrayUtils;
}());
__reflect(ArrayUtils.prototype, "ArrayUtils");
//# sourceMappingURL=ArrayUtils.js.map