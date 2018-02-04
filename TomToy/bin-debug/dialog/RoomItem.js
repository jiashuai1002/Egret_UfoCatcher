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
var RoomItem = (function (_super) {
    __extends(RoomItem, _super);
    function RoomItem() {
        var _this = _super.call(this) || this;
        _this.skinName = skins.RoomItem;
        _this.cacheAsBitmap = true;
        return _this;
    }
    RoomItem.prototype.init = function () {
        this.icon.mask = this.iconMask;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.changeRoom, this);
    };
    RoomItem.prototype.show = function (data) {
        var _this = this;
        this.roomId = data.id;
        this.toy.text = data.title;
        this.desc.text = data.cost + "金币/次  " + "约" + data.size + "厘米";
        this.icon.visible = false;
        DisplayUtils.loadImage(data.icon, function (tex) {
            _this.icon.texture = tex;
            _this.icon.visible = true;
        });
    };
    RoomItem.prototype.changeRoom = function () {
        GameConfig.ROOM.changeRoom(this.roomId);
        ViewManager.I.close(ViewName.DLG_CHOOSE_ROOM);
    };
    RoomItem.prototype.destroy = function () {
        DisplayUtils.removeFromParent(this);
        ObjectPool.push(this);
    };
    return RoomItem;
}(UIComponent));
__reflect(RoomItem.prototype, "RoomItem");
