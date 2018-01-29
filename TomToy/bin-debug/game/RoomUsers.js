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
var RoomUsers = (function (_super) {
    __extends(RoomUsers, _super);
    function RoomUsers() {
        var _this = _super.call(this) || this;
        _this.cacheAsBitmap = true;
        return _this;
    }
    RoomUsers.prototype.start = function (room) {
        this.room = room;
        this.getUsers();
        TimerManager.doTimer(20000, 0, this.getUsers, this);
    };
    RoomUsers.prototype.stop = function () {
        TimerManager.remove(this.getUsers, this);
    };
    RoomUsers.prototype.getUsers = function () {
        var _this = this;
        HttpManager.post(HttpCmd.ROOM_USERS, {
            ufo_id: this.room
        }, function (ret) {
            _this.userCnt.text = ret.result.count + "人";
            var arr = ret.result.users;
            for (var i = 0; i < 4; i++) {
                var data = ArrayUtils.random(arr);
                if (data == null) {
                    break;
                }
                var head = _this.headGroup.getChildAt(i);
                head.setImage(data.avtar);
                ArrayUtils.remove(arr, data);
            }
        });
    };
    return RoomUsers;
}(UIComponent));
__reflect(RoomUsers.prototype, "RoomUsers");
//# sourceMappingURL=RoomUsers.js.map