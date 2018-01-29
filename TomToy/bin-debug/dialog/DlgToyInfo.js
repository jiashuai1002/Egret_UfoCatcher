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
var DlgToyInfo = (function (_super) {
    __extends(DlgToyInfo, _super);
    function DlgToyInfo() {
        var _this = _super.call(this) || this;
        _this.skinName = skins.DlgToyInfo;
        return _this;
    }
    DlgToyInfo.prototype.init = function () {
        _super.prototype.init.call(this);
        this.recordTab.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showRecord, this);
        this.infoTab.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showInfo, this);
        this.recordList.cacheAsBitmap = true;
    };
    DlgToyInfo.prototype.preOpen = function (room) {
        var _this = this;
        HttpManager.post(HttpCmd.CATCH_RECORD_LIST, {
            ufo_id: room
        }, function (ret) {
            console.log(ret);
            _this.datas = ret.result.list;
            _super.prototype.preOpen.call(_this);
        }, null, true);
        var toys = DataManager.getToysByRoom(room);
        var arr = [];
        toys.forEach(function (toy) {
            if (arr.indexOf(toy.desc) < 0) {
                arr.push(toy.desc);
            }
        });
        this.images = arr;
    };
    DlgToyInfo.prototype.show = function () {
        var collection1 = new eui.ArrayCollection(this.datas);
        this.recordList.dataProvider = collection1;
        this.recordList.itemRenderer = RecordItem;
        var collection2 = new eui.ArrayCollection(this.images);
        this.infoList.dataProvider = collection2;
        this.infoList.itemRenderer = InfoItem;
        this.showRecord();
    };
    DlgToyInfo.prototype.showRecord = function () {
        this.recordList.parent.visible = true;
        this.recordTab.enabled = false;
        this.infoList.parent.visible = false;
        this.infoTab.enabled = true;
    };
    DlgToyInfo.prototype.showInfo = function () {
        this.recordList.parent.visible = false;
        this.recordTab.enabled = true;
        this.infoList.parent.visible = true;
        this.infoTab.enabled = false;
    };
    return DlgToyInfo;
}(Dialog));
__reflect(DlgToyInfo.prototype, "DlgToyInfo");
//# sourceMappingURL=DlgToyInfo.js.map