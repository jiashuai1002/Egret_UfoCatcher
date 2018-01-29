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
var FailHint = (function (_super) {
    __extends(FailHint, _super);
    function FailHint() {
        var _this = _super.call(this) || this;
        _this.once(egret.Event.ADDED_TO_STAGE, _this.init, _this);
        return _this;
    }
    FailHint.prototype.init = function () {
        this.pos = this.y;
    };
    FailHint.prototype.show = function () {
        var _this = this;
        this.source = "wordart_json.fail_hint" + MathUtils.randomInt(1, 10);
        this.visible = true;
        this.y = this.pos + 200;
        this.alpha = 0.3;
        egret.Tween.removeTweens(this);
        egret.Tween.get(this).to({ y: this.pos, alpha: 1 }, 500).wait(2500)
            .to({ alpha: 0 }, 200).call(function () {
            _this.visible = false;
        });
    };
    return FailHint;
}(eui.Image));
__reflect(FailHint.prototype, "FailHint");
//# sourceMappingURL=FailHint.js.map