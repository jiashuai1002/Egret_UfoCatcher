var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *
 * 引擎扩展工具管理器
 *
 */
var EgretExpandManager = (function () {
    function EgretExpandManager() {
    }
    /**
     * 初始化函数
     */
    EgretExpandManager.init = function () {
        AnchorUtils.init();
        TimerManager.init();
        StageUtils.stage.addEventListener(egret.Event.ACTIVATE, function () {
            TimerManager.setTimeScale(1);
            SoundManager.I.resume();
        }, this);
        StageUtils.stage.addEventListener(egret.Event.DEACTIVATE, function () {
            TimerManager.setTimeScale(0);
            SoundManager.I.pause();
        }, this);
    };
    return EgretExpandManager;
}());
__reflect(EgretExpandManager.prototype, "EgretExpandManager");
