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
var LuckyHint = (function (_super) {
    __extends(LuckyHint, _super);
    function LuckyHint() {
        return _super.call(this) || this;
    }
    LuckyHint.prototype.show = function (full, add) {
        var _this = this;
        this.luckyFull.visible = full;
        this.luckyAdd.visible = !full;
        var str = "+" + add;
        this.luckyAdd.text = str;
        this.visible = true;
        this.scaleX = this.scaleY = 0.01;
        this.alpha = 1;
        egret.Tween.removeTweens(this);
        egret.Tween.get(this).to({ scaleX: 1, scaleY: 1 }, 300).wait(2500)
            .to({ alpha: 0 }, 200).call(function () {
            _this.visible = false;
        });
    };
    return LuckyHint;
}(UIComponent));
__reflect(LuckyHint.prototype, "LuckyHint");
//# sourceMappingURL=LuckyHint.js.map