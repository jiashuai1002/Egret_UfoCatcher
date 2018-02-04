var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *
 * 舞台工具类
 *
 */
var StageUtils = (function () {
    function StageUtils() {
    }
    Object.defineProperty(StageUtils, "stage", {
        /**
         * 获取舞台
         */
        get: function () {
            return egret.MainContext.instance.stage;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StageUtils, "stageW", {
        /**
         * 舞台宽度
         */
        get: function () {
            return egret.MainContext.instance.stage.stageWidth;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StageUtils, "stageH", {
        /**
         * 舞台高度
         */
        get: function () {
            return egret.MainContext.instance.stage.stageHeight;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StageUtils, "sca", {
        get: function () {
            return egret.MainContext.instance.stage.stageWidth / 640;
        },
        enumerable: true,
        configurable: true
    });
    return StageUtils;
}());
__reflect(StageUtils.prototype, "StageUtils");
