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
var NoticeItem = (function (_super) {
    __extends(NoticeItem, _super);
    function NoticeItem() {
        var _this = _super.call(this) || this;
        _this.skinName = skins.NoticeItem;
        _this.cacheAsBitmap = true;
        return _this;
    }
    NoticeItem.prototype.dataChanged = function () {
        var data = this.data;
        if (data.msg_title.length > 13) {
            this.title.text = data.msg_title.slice(0, 12) + "...";
        }
        else {
            this.title.text = data.msg_title;
        }
        this.content.text = data.msg_desc;
    };
    return NoticeItem;
}(eui.ItemRenderer));
__reflect(NoticeItem.prototype, "NoticeItem");
//# sourceMappingURL=NoticeItem.js.map