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
var PickItem = (function (_super) {
    __extends(PickItem, _super);
    function PickItem() {
        var _this = _super.call(this) || this;
        _this.skinName = skins.PickItem;
        _this.cacheAsBitmap = true;
        _this.once(egret.Event.ADDED_TO_STAGE, _this.init, _this);
        return _this;
    }
    PickItem.prototype.init = function () {
        this.addBtn.setOnTap(this.add.bind(this));
        this.subBtn.setOnTap(this.sub.bind(this));
    };
    PickItem.prototype.dataChanged = function () {
        var data = this.data;
        this.id = data.id;
        this.toy.text = DataManager.getToy(this.id).name;
        this.max = data.count;
        this.onChange = data.onChange;
        this.setValue(0);
    };
    PickItem.prototype.add = function () {
        this.setValue(this.cur + 1);
    };
    PickItem.prototype.sub = function () {
        this.setValue(this.cur - 1);
    };
    PickItem.prototype.setValue = function (value) {
        this.cur = Math.max(Math.min(this.max, value), 0);
        this.count.text = "" + this.cur;
        this.addBtn.enabled = this.cur < this.max;
        this.subBtn.enabled = this.cur > 0;
        this.onChange(this.id, this.cur);
    };
    return PickItem;
}(eui.ItemRenderer));
__reflect(PickItem.prototype, "PickItem");
//# sourceMappingURL=PickItem.js.map