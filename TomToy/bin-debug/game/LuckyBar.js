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
var LuckyBar = (function (_super) {
    __extends(LuckyBar, _super);
    function LuckyBar() {
        return _super.call(this) || this;
    }
    LuckyBar.prototype.init = function () {
        this.bar.parent.addChild(this.barMask = new egret.Shape);
        var g = this.barMask.graphics;
        g.beginFill(0);
        g.drawRect(0, 0, this.bar.width, this.bar.height);
        g.endFill();
        this.barMask.y = this.bar.y;
        this.barMask.x = this.bar.x - this.bar.width;
        this.bar.mask = this.barMask;
    };
    LuckyBar.prototype.start = function (room) {
        var _this = this;
        this.luckyValue = 0;
        HttpManager.post(HttpCmd.LUCKY_SCORE, {
            user_id: PlayerDataManager.get(PlayerDataKey.ID),
            ufo_id: room
        }, function (ret) {
            _this.setLucky(ret.result.userLuckyScore);
        }, null, true);
    };
    LuckyBar.prototype.setLucky = function (value) {
        var duration = 500;
        egret.Tween.removeTweens(this);
        egret.Tween.get(this).to({ luckyValue: value }, duration);
    };
    Object.defineProperty(LuckyBar.prototype, "value", {
        get: function () {
            return this.luckyValue;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LuckyBar.prototype, "luckyValue", {
        get: function () {
            return this._luckyValue;
        },
        set: function (value) {
            this._luckyValue = value;
            this.lucky.text = Math.floor(value) + "";
            this.barMask.x = this.bar.x + this.bar.width * (value / 100 - 1);
        },
        enumerable: true,
        configurable: true
    });
    return LuckyBar;
}(UIComponent));
__reflect(LuckyBar.prototype, "LuckyBar");
//# sourceMappingURL=LuckyBar.js.map