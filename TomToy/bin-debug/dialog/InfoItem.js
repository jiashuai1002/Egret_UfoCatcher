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
var InfoItem = (function (_super) {
    __extends(InfoItem, _super);
    function InfoItem() {
        var _this = _super.call(this) || this;
        _this.addChild(_this.image = new eui.Image);
        _this.image.y = 2;
        return _this;
    }
    InfoItem.prototype.dataChanged = function () {
        var _this = this;
        this.image.source = this.data;
        this.image.once(egret.Event.COMPLETE, function () {
            _this.height = Math.floor(_this.image.height * _this.width / _this.image.width);
            _this.image.height = _this.height;
            _this.image.width = _this.width;
        }, this);
    };
    return InfoItem;
}(eui.ItemRenderer));
__reflect(InfoItem.prototype, "InfoItem");
//# sourceMappingURL=InfoItem.js.map