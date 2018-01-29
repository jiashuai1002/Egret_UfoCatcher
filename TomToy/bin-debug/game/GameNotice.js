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
var GameNotice = (function (_super) {
    __extends(GameNotice, _super);
    function GameNotice() {
        var _this = _super.call(this) || this;
        _this.skinName = skins.GameNotice;
        return _this;
    }
    GameNotice.prototype.show = function (head, textFlow) {
        var _this = this;
        this.visible = true;
        egret.Tween.removeTweens(this.bg);
        this.head.setImage(head);
        this.head.visible = false;
        this.content.textFlow = textFlow;
        this.content.visible = false;
        this.bg.width = 0;
        egret.Tween.get(this.bg).to({ width: 508 }, 300).call(function () {
            _this.content.visible = true;
            _this.head.visible = true;
        }).wait(5000).call(function () {
            _this.visible = false;
        });
    };
    return GameNotice;
}(UIComponent));
__reflect(GameNotice.prototype, "GameNotice");
//# sourceMappingURL=GameNotice.js.map