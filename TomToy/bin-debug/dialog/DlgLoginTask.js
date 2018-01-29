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
var DlgLoginTask = (function (_super) {
    __extends(DlgLoginTask, _super);
    function DlgLoginTask() {
        var _this = _super.call(this) || this;
        _this.skinName = skins.DlgLoginTask;
        return _this;
    }
    DlgLoginTask.prototype.preOpen = function () {
        var _this = this;
        HttpManager.post(HttpCmd.CHECKIN_LIST, { user_id: PlayerDataManager.get(PlayerDataKey.ID) }, function (ret) {
            _this.datas = ret.result.tasks;
            var checkins = ret.result.user_checkins;
            var flag = false;
            for (var i = 0; i < _this.datas.length; i++) {
                var data = _this.datas[i];
                var checkinData = checkins[i];
                if (checkinData) {
                    data.ucgl_id = checkinData.ucgl_id;
                    data.status = parseInt(checkinData.ucgl_status);
                    if (data.status == 0) {
                        flag = true;
                    }
                }
                else {
                    data.status = -1;
                }
            }
            if (flag) {
                _super.prototype.preOpen.call(_this);
            }
            else {
                _this.close();
            }
        }, null, true);
    };
    DlgLoginTask.prototype.show = function () {
        //data
        var collection = new eui.ArrayCollection(this.datas);
        this.list.dataProvider = collection;
        //view
        this.list.itemRenderer = LoginItem;
    };
    return DlgLoginTask;
}(Dialog));
__reflect(DlgLoginTask.prototype, "DlgLoginTask");
//# sourceMappingURL=DlgLoginTask.js.map