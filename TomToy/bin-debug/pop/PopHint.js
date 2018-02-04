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
var PopHint = (function (_super) {
    __extends(PopHint, _super);
    function PopHint() {
        var _this = _super.call(this) || this;
        _this.skinName = skins.PopHint;
        return _this;
    }
    PopHint.prototype.preOpen = function (txt) {
        this.content.text = txt;
        _super.prototype.preOpen.call(this);
    };
    PopHint.prototype.show = function () {
        var _this = this;
        StageUtils.stage.addChild(this);
        egret.Tween.removeTweens(this.con);
        this.con.alpha = 0;
        egret.Tween.get(this.con).to({ alpha: 1 }, 200).wait(1500)
            .to({ alpha: 0 }, 200).call(function () {
            DisplayUtils.removeFromParent(_this);
        });
    };
    return PopHint;
}(PopWin));
__reflect(PopHint.prototype, "PopHint");
