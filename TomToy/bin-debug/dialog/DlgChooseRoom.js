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
var DlgChooseRoom = (function (_super) {
    __extends(DlgChooseRoom, _super);
    function DlgChooseRoom() {
        var _this = _super.call(this) || this;
        _this.skinName = skins.DlgChooseRoom;
        return _this;
    }
    DlgChooseRoom.prototype.init = function () {
        _super.prototype.init.call(this);
        var arr = [];
        var rooms = DataManager.getRooms();
        rooms.forEach(function (room) {
            arr.push(room.id);
        });
        this.roomIds = arr;
        this.showRooms = [];
        this.changeBtn.setOnTap(this.refresh.bind(this));
    };
    DlgChooseRoom.prototype.preOpen = function (roomId) {
        this.curRoom = roomId;
        this.showRooms = [];
        _super.prototype.preOpen.call(this);
    };
    DlgChooseRoom.prototype.show = function () {
        this.refresh();
    };
    DlgChooseRoom.prototype.refresh = function () {
        var _this = this;
        var arr = [];
        this.roomIds.forEach(function (roomId) {
            if (_this.showRooms.indexOf(roomId) < 0 && _this.curRoom != roomId) {
                arr.push(roomId);
            }
        });
        arr.sort(function () { return 0.5 - Math.random(); });
        this.showRooms = arr.slice(0, 4);
        this.clear();
        for (var i = 0; i < this.showRooms.length; i++) {
            var item = ObjectPool.pop("RoomItem");
            var data = DataManager.getRoom(this.showRooms[i]);
            item.show(data);
            this.group.addChild(item);
            item.touchEnabled = true;
        }
    };
    DlgChooseRoom.prototype.clear = function () {
        var cnt = this.group.numChildren;
        for (var i = 0; i < cnt; i++) {
            var item = this.group.getChildAt(0);
            item.destroy();
        }
    };
    return DlgChooseRoom;
}(Dialog));
__reflect(DlgChooseRoom.prototype, "DlgChooseRoom");
//# sourceMappingURL=DlgChooseRoom.js.map