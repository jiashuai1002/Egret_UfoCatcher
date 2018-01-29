var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *
 * 绘图工具类
 *
 */
var DrawUtils = (function () {
    function DrawUtils() {
    }
    /**
     * 绘制圆角六边形
     */
    DrawUtils.drawRoundHexagon = function (sprite, r, e, color) {
        var graphics = sprite.graphics;
        graphics.clear();
        graphics.lineStyle(e, color);
        graphics.beginFill(color);
        r -= Math.ceil(e / 2);
        graphics.moveTo(-r / 2, -r * Math.sqrt(3) / 2);
        graphics.lineTo(r / 2, -r * Math.sqrt(3) / 2);
        graphics.lineTo(r, 0);
        graphics.lineTo(r / 2, r * Math.sqrt(3) / 2);
        graphics.lineTo(-r / 2, r * Math.sqrt(3) / 2);
        graphics.lineTo(-r, 0);
        graphics.lineTo(-r / 2, -r * Math.sqrt(3) / 2);
        graphics.endFill();
    };
    /**
     * 绘制矩形
     */
    DrawUtils.drawRect = function (sprite, w, h, color, ew, eh) {
        if (ew === void 0) { ew = 0; }
        if (eh === void 0) { eh = 0; }
        var graphics = sprite.graphics;
        graphics.clear();
        graphics.beginFill(color);
        graphics.drawRoundRect(0, 0, w, h, ew, eh);
        graphics.endFill();
    };
    /**
     * 绘制扇形
     */
    DrawUtils.drawArc = function (sprite, angle, color) {
        var graphics = sprite.graphics;
        graphics.clear();
        graphics.beginFill(color);
        graphics.lineTo(200, 0); //画线到弧的起始点
        graphics.drawArc(0, 0, 200, -198 * Math.PI / 180, angle * Math.PI / 180, true); //从起始点顺时针画弧到终点
        graphics.lineTo(0, 0); //从终点画线到圆形。到此扇形的封闭区域形成
        graphics.endFill();
    };
    /**
     * 绘制矩形
     */
    DrawUtils.drawRectPos = function (sprite, x, y, w, h, color, alpha) {
        var graphics = sprite.graphics;
        graphics.beginFill(color, alpha);
        graphics.drawRect(x, y, w, h);
        graphics.endFill();
    };
    /**
     * 绘制圆矩形
     */
    DrawUtils.drawRoundRect = function (sprite, w, h, xel, yel, color) {
        var graphics = sprite.graphics;
        graphics.clear();
        graphics.beginFill(color);
        graphics.drawRoundRect(0, 0, w, h, xel, yel);
        graphics.endFill();
    };
    /**
     * 绘制圆矩形
     */
    DrawUtils.drawRoundRectContinue = function (sprite, x, y, w, h, xel, yel, color) {
        var graphics = sprite.graphics;
        graphics.beginFill(color);
        graphics.drawRoundRect(x, y, w, h, xel, yel);
        graphics.endFill();
    };
    /**
     * 绘制空心矩形
     */
    DrawUtils.drawHollowRect = function (sprite, w, h, thickness, color) {
        var graphics = sprite.graphics;
        graphics.clear();
        graphics.lineStyle(thickness, color);
        graphics.moveTo(thickness / 2, thickness / 2);
        graphics.lineTo(w + thickness / 2, thickness / 2);
        graphics.lineTo(w + thickness / 2, h + thickness / 2);
        graphics.lineTo(thickness / 2, h + thickness / 2);
        graphics.lineTo(thickness / 2, thickness / 2);
    };
    /**
     * 绘制三角形
     */
    DrawUtils.drawTriangle = function (sprite, r, thickness, color) {
        var graphics = sprite.graphics;
        graphics.clear();
        graphics.lineStyle(thickness, color);
        var x = function (i) {
            return r * Math.cos((60 * i + 30) / 180 * Math.PI);
        };
        var y = function (i) {
            return r * Math.sin((60 * i + 30) / 180 * Math.PI);
        };
        graphics.moveTo(x(0), y(0));
        graphics.lineTo(x(2), y(2));
        graphics.lineTo(x(4), y(4));
        graphics.lineTo(x(0), y(0));
    };
    /**
     * 绘制五角星
     */
    DrawUtils.drawStar = function (sprite, r, thickness, color) {
        var graphics = sprite.graphics;
        graphics.clear();
        graphics.lineStyle(thickness, color);
        var x = function (i) {
            return r * Math.cos((72 * i - 18) / 180 * Math.PI);
        };
        var y = function (i) {
            return r * Math.sin((72 * i - 18) / 180 * Math.PI);
        };
        graphics.moveTo(x(0), y(0));
        graphics.lineTo(x(2), y(2));
        graphics.lineTo(x(4), y(4));
        graphics.lineTo(x(1), y(1));
        graphics.lineTo(x(3), y(3));
        graphics.lineTo(x(0), y(0));
    };
    /**
     * 绘制十字
     */
    DrawUtils.drawCross = function (sprite, length, thickness, color) {
        var graphics = sprite.graphics;
        graphics.clear();
        graphics.lineStyle(thickness, color);
        graphics.moveTo(-length / 2, 0);
        graphics.lineTo(length / 2, 0);
        graphics.moveTo(0, -length / 2);
        graphics.lineTo(0, length / 2);
    };
    /**
     * 绘制米形
     */
    DrawUtils.drawMi = function (sprite, length, thickness, color) {
        var graphics = sprite.graphics;
        graphics.clear();
        graphics.lineStyle(thickness, color);
        graphics.moveTo(-length / 2, 0);
        graphics.lineTo(length / 2, 0);
        graphics.moveTo(0, -length / 2);
        graphics.lineTo(0, length / 2);
        var a = Math.sin(Math.PI / 4);
        graphics.moveTo(length / 2 * (-a), length / 2 * (-a));
        graphics.lineTo(length / 2 * (a), length / 2 * (a));
        graphics.moveTo(length / 2 * (-a), length / 2 * (a));
        graphics.lineTo(length / 2 * (a), length / 2 * (-a));
    };
    /**
     * 绘制圆形
     */
    DrawUtils.drawCircle = function (sprite, r, color) {
        var graphics = sprite.graphics;
        graphics.clear();
        graphics.beginFill(color);
        graphics.drawCircle(0, 0, r);
        graphics.endFill();
    };
    /**
     * 绘制直线
     */
    DrawUtils.drawLine = function (sprite, src, dest, thickness, color) {
        var graphics = sprite.graphics;
        graphics.clear();
        graphics.lineStyle(thickness, color);
        graphics.moveTo(src.x, src.y);
        graphics.lineTo(dest.x, dest.y);
        sprite.graphics.endFill();
    };
    /**
     * 绘制直线
     */
    DrawUtils.drawLineContinue = function (sprite, src, dest, thickness, color) {
        var graphics = sprite.graphics;
        graphics.lineStyle(thickness, color);
        graphics.moveTo(src.x, src.y);
        graphics.lineTo(dest.x, dest.y);
        sprite.graphics.endFill();
    };
    return DrawUtils;
}());
__reflect(DrawUtils.prototype, "DrawUtils");
//# sourceMappingURL=DrawUtils.js.map