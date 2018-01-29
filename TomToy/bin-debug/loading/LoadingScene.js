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
/**
 * 加载界面
 */
var LoadingScene = (function (_super) {
    __extends(LoadingScene, _super);
    function LoadingScene() {
        var _this = _super.call(this) || this;
        _this.skinName = skins.LoadingScene;
        return _this;
    }
    LoadingScene.prototype.init = function () {
        this.addChild(this.barMask = new egret.Shape);
        var g = this.barMask.graphics;
        g.beginFill(0);
        g.drawRect(0, -10, this.bar.width, this.bar.height + 20);
        g.endFill();
        this.barMask.y = this.bar.y;
        this.barMask.x = this.bar.x - this.bar.width;
        this.bar.mask = this.barMask;
        this._per = 0;
    };
    LoadingScene.prototype.setProgress = function (value) {
        var duration = 500;
        egret.Tween.removeTweens(this);
        egret.Tween.get(this).to({ per: value }, duration);
    };
    Object.defineProperty(LoadingScene.prototype, "per", {
        get: function () {
            return this._per;
        },
        set: function (value) {
            this._per = value;
            this.progress.text = Math.floor(value * 100) + "%";
            this.barMask.x = this.bar.x + this.bar.width * (value - 1);
        },
        enumerable: true,
        configurable: true
    });
    return LoadingScene;
}(Scene));
__reflect(LoadingScene.prototype, "LoadingScene");
//# sourceMappingURL=LoadingScene.js.map