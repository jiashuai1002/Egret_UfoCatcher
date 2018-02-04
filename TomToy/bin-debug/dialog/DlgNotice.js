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
var DlgNotice = (function (_super) {
    __extends(DlgNotice, _super);
    function DlgNotice() {
        var _this = _super.call(this) || this;
        _this.skinName = skins.DlgNotice;
        return _this;
    }
    DlgNotice.prototype.init = function () {
        this.list.cacheAsBitmap = true;
        _super.prototype.init.call(this);
    };
    DlgNotice.prototype.preOpen = function () {
        var _this = this;
        HttpManager.post(HttpCmd.MESSAGE_LIST, {}, function (ret) {
            _this.datas = ret.list;
            _super.prototype.preOpen.call(_this);
        }, null, true);
    };
    DlgNotice.prototype.show = function () {
        var collection = new eui.ArrayCollection(this.datas);
        this.list.dataProvider = collection;
        this.list.itemRenderer = NoticeItem;
    };
    DlgNotice.prototype.close = function () {
        _super.prototype.close.call(this);
        ViewManager.I.open(ViewName.DLG_LOGIN_TASK);
    };
    return DlgNotice;
}(Dialog));
__reflect(DlgNotice.prototype, "DlgNotice");
