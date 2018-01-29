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
var HttpLoading = (function (_super) {
    __extends(HttpLoading, _super);
    function HttpLoading() {
        return _super.call(this) || this;
    }
    HttpLoading.prototype.init = function () {
        this.addChild(this.black = new egret.Shape);
        this.addChild(this.con = new egret.DisplayObjectContainer);
        this.con.addChild(this.bg = new egret.Shape);
        this.con.addChild(this.round = new egret.Shape);
        this.con.addChild(this.label = new eui.Label);
        var g2 = this.bg.graphics;
        g2.beginFill(0, 0.8);
        g2.drawRoundRect(-100, -100, 200, 200, 20);
        g2.endFill();
        var g3 = this.round.graphics;
        g3.lineStyle(12, 0xffffff);
        g3.drawArc(0, 0, 40, 0, Math.PI * 1.6);
        g3.endFill();
        this.round.y = -20;
        this.label.text = "加载中...";
        this.label.width = 200;
        this.label.anchorOffsetX = 100;
        this.label.textAlign = "center";
        this.label.y = 40;
        this.black.touchEnabled = true;
    };
    HttpLoading.prototype.show = function () {
        var _this = this;
        egret.Tween.removeTweens(this.round);
        this.round.rotation = 0;
        egret.Tween.get(this.round, { loop: true }).to({ rotation: 360 }, 1000);
        this.con.visible = false;
        egret.setTimeout(function () {
            _this.con.visible = true;
        }, this, 250);
    };
    HttpLoading.prototype.onResize = function () {
        var stage = StageUtils.stage;
        var w = stage.stageWidth;
        var h = stage.stageHeight;
        var g1 = this.black.graphics;
        g1.beginFill(0, 0.01);
        g1.drawRect(0, 0, w, h);
        g1.endFill();
        this.con.x = w / 2;
        this.con.y = h / 2 * 0.9;
    };
    HttpLoading.prototype.close = function () {
        _super.prototype.close.call(this);
        egret.Tween.removeTweens(this.round);
    };
    return HttpLoading;
}(PopWin));
__reflect(HttpLoading.prototype, "HttpLoading");
//# sourceMappingURL=HttpLoading.js.map