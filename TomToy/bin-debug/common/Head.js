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
var Head = (function (_super) {
    __extends(Head, _super);
    function Head() {
        var _this = _super.call(this) || this;
        _this.once(egret.Event.ADDED_TO_STAGE, _this.init, _this);
        return _this;
    }
    Head.prototype.init = function () {
        var mask = new egret.Shape;
        this.parent.addChild(mask);
        mask.x = this.x;
        mask.y = this.y;
        var g = mask.graphics;
        g.beginFill(0);
        g.drawRoundRect(0, 0, this.width, this.height, this.width / 3, this.width / 3);
        g.endFill();
        this.mask = mask;
    };
    Head.prototype.setImage = function (img) {
        if (img == null || img == "") {
            this.source = "game_json.head";
        }
        else {
            this.source = img;
        }
    };
    return Head;
}(eui.Image));
__reflect(Head.prototype, "Head");
