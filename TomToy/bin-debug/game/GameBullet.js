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
var GameBullet = (function (_super) {
    __extends(GameBullet, _super);
    function GameBullet() {
        var _this = _super.call(this) || this;
        _this.padding = 8;
        _this.addChild(_this.bg = new egret.Shape);
        _this.addChild(_this.content = new eui.Label);
        _this.content.x = _this.content.y = _this.padding;
        _this.content.size = 24;
        return _this;
    }
    GameBullet.prototype.start = function (text, src, dest) {
        var _this = this;
        this.content.text = text;
        var g = this.bg.graphics;
        g.clear();
        g.beginFill(0, 0.3);
        g.drawRoundRect(0, 0, this.content.width + this.padding * 2, this.content.height + this.padding * 2, 50, 50);
        g.endFill();
        this.x = src;
        var duration = 5000 + Math.random() * 2000;
        egret.Tween.get(this).to({ x: dest - this.width }, duration).call(function () {
            DisplayUtils.removeFromParent(_this);
            ObjectPool.push(_this);
        });
    };
    return GameBullet;
}(egret.DisplayObjectContainer));
__reflect(GameBullet.prototype, "GameBullet");
//# sourceMappingURL=GameBullet.js.map