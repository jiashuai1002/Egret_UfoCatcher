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
var Button = (function (_super) {
    __extends(Button, _super);
    function Button() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onTap, _this);
        _this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.touchBegin, _this);
        _this.addEventListener(egret.TouchEvent.TOUCH_END, _this.touchEnd, _this);
        _this.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, _this.touchEnd, _this);
        _this.touchEnabled = true;
        _this.terms = [];
        _this.callBack = null;
        _this.canTouch = true;
        return _this;
    }
    Button.prototype.touchBegin = function () {
        egret.Tween.get(this).to({ scaleX: 0.9, scaleY: 0.9 }, 80, egret.Ease.quadOut);
    };
    Button.prototype.touchEnd = function () {
        var _this = this;
        egret.Tween.get(this).to({ scaleX: 1, scaleY: 1 }, 80, egret.Ease.quadOut)
            .call(function () {
            _this.canTouch = true;
        });
    };
    Button.prototype.onTap = function (e) {
        if (!this.canTouch)
            return;
        this.canTouch = false;
        for (var i = 0; i < this.terms.length; i++) {
            if (!this.terms[i]) {
                return;
            }
        }
        if (this.callBack) {
            this.callBack(e);
        }
    };
    Button.prototype.addTerm = function (func) {
        this.terms.push(func);
    };
    Button.prototype.setOnTap = function (callBack) {
        this.callBack = callBack;
    };
    return Button;
}(eui.Button));
__reflect(Button.prototype, "Button");
