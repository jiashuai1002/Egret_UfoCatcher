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
var AwardShow = (function (_super) {
    __extends(AwardShow, _super);
    function AwardShow() {
        var _this = _super.call(this) || this;
        _this.skinName = skins.AwardShow;
        return _this;
    }
    AwardShow.prototype.show = function (toyId, desc, qrcode) {
        var toyData = DataManager.getToy(toyId);
        this.image.source = toyData.icon;
        // console.log('wawawawawawa')
        // console.log(toyData.icon)
        this.toy.text = toyData.name;
        // this.head.setImage(PlayerDataManager.get(PlayerDataKey.HEAD));
        // console.log('wawawaw111awawa')
        // console.log(PlayerDataManager.get(PlayerDataKey.HEAD))
        this.nickname.text = PlayerDataManager.get(PlayerDataKey.NAME);
        this.desc.text = desc;
        this.qrcode.texture = qrcode;
    };
    return AwardShow;
}(eui.Component));
__reflect(AwardShow.prototype, "AwardShow");
//# sourceMappingURL=AwardShow.js.map