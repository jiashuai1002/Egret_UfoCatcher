var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var GameTimer = (function (_super) {
    __extends(GameTimer, _super);
    function GameTimer() {
        var _this = _super.call(this) || this;
        _this.cacheAsBitmap = true;
        return _this;
    }
    GameTimer.prototype.start = function (count, cb) {
        if (cb === void 0) { cb = null; }
        this.visible = true;
        TimerManager.doTimer(1000, count, this.countDown, this);
        this.setCount(count);
        this.callBack = cb;
    };
    GameTimer.prototype.stop = function () {
        this.visible = false;
        TimerManager.remove(this.countDown, this);
        this.callBack = null;
    };
    GameTimer.prototype.countDown = function () {
        this.setCount(this.count - 1);
    };
    GameTimer.prototype.setCount = function (value) {
        this.time.text = value + "";
        this.count = value;
        if (value == 0) {
            this.callBack && this.callBack();
        }
    };
    return GameTimer;
}(UIComponent));
__reflect(GameTimer.prototype, "GameTimer");
