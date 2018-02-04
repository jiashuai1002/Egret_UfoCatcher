var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var DataManager = (function () {
    function DataManager() {
    }
    DataManager.initRoom = function (list) {
        var _this = this;
        this._roomDic = {};
        list.forEach(function (data) {
            var roomData = new RoomData;
            roomData.id = parseInt(data.uc_id);
            roomData.cost = parseInt(data.uc_cost);
            roomData.size = parseInt(data.uc_size);
            roomData.icon = data.uc_icon;
            roomData.title = data.uc_title;
            roomData.pos = JSON.parse(data.uc_pos);
            _this._roomDic[roomData.id] = roomData;
        });
    };
    DataManager.getRoom = function (id) {
        return this._roomDic[id];
    };
    DataManager.getRooms = function () {
        var arr = [];
        for (var roomId in this._roomDic) {
            arr.push(this._roomDic[roomId]);
        }
        return arr;
    };
    DataManager.initToy = function (list) {
        var _this = this;
        this._toyDic = {};
        console.log("--------------list----------------");
        console.log(list);
        list.forEach(function (data) {
            var toyData = new ToyData;
            toyData.id = parseInt(data.ut_id);
            toyData.room = parseInt(data.uc_id);
            toyData.name = data.ut_name;
            toyData.img = data.ut_icon;
            toyData.icon = data.ut_cover_img;
            toyData.desc = data.ut_cover_img;
            toyData.w = parseInt(data.ut_width);
            toyData.h = parseInt(data.ut_height);
            _this._toyDic[toyData.id] = toyData;
        });
    };
    DataManager.getToy = function (id) {
        return this._toyDic[id];
    };
    DataManager.initRoomToys = function () {
        this._roomToys = {};
        for (var roomId in this._roomDic) {
            var posArr = this._roomDic[roomId].pos;
            if (posArr == null)
                continue;
            var toys = [];
            for (var toyId in this._toyDic) {
                var data = this._toyDic[toyId];
                if (data.room == parseInt(roomId)) {
                    toys.push(data);
                }
            }
            var arr = [];
            for (var i = 0; i < posArr.length; i++) {
                var data = toys[i % toys.length];
                var toyData = JSON.parse(JSON.stringify(data));
                toyData.x = posArr[i].x;
                toyData.y = posArr[i].y;
                toyData.idx = i;
                arr.push(toyData);
            }
            this._roomToys[roomId] = arr;
        }
    };
    DataManager.getToysByRoom = function (room) {
        return this._roomToys[room];
    };
    return DataManager;
}());
__reflect(DataManager.prototype, "DataManager");
