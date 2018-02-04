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
var ToyItem = (function (_super) {
    __extends(ToyItem, _super);
    function ToyItem() {
        var _this = _super.call(this) || this;
        _this.skinName = skins.ToyItem;
        _this.cacheAsBitmap = true;
        return _this;
    }
    ToyItem.prototype.init = function () {
        this.icon.mask = this.iconMask;
    };
    ToyItem.prototype.show = function (data, cnt) {
        var _this = this;
        this.roomId = data.id;
        this.toy.text = data.name + " × " + cnt;
        this.icon.visible = false;
        DisplayUtils.loadImage(data.icon, function (tex) {
            _this.icon.texture = tex;
            //限制背包内娃娃ICON的尺寸
            _this.icon.width = 248;
            _this.icon.height = 194;
            _this.icon.visible = true;
        });
    };
    ToyItem.prototype.destroy = function () {
        DisplayUtils.removeFromParent(this);
        ObjectPool.push(this);
    };
    return ToyItem;
}(UIComponent));
__reflect(ToyItem.prototype, "ToyItem");
