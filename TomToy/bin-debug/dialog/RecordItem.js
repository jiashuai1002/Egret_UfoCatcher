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
var RecordItem = (function (_super) {
    __extends(RecordItem, _super);
    function RecordItem() {
        var _this = _super.call(this) || this;
        _this.skinName = skins.RecordItem;
        _this.cacheAsBitmap = true;
        return _this;
    }
    RecordItem.prototype.dataChanged = function () {
        var data = this.data;
        this.nickName.text = data.nickname;
        this.head.setImage(data.avtar);
        this.toy.text = data.ut_name;
        this.time.text = DateUtils.howLongAgo(data.pc_finished_at);
    };
    return RecordItem;
}(eui.ItemRenderer));
__reflect(RecordItem.prototype, "RecordItem");
//# sourceMappingURL=RecordItem.js.map