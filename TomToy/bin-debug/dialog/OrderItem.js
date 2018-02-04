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
var OrderItem = (function (_super) {
    __extends(OrderItem, _super);
    function OrderItem() {
        var _this = _super.call(this) || this;
        _this.skinName = skins.OrderItem;
        _this.cacheAsBitmap = true;
        return _this;
    }
    OrderItem.prototype.dataChanged = function () {
        var data = this.data;
        this.toy.text = data.ut_name + "×" + data.pod_toy_num;
        this.time.text = data.to_createtime;
    };
    return OrderItem;
}(eui.ItemRenderer));
__reflect(OrderItem.prototype, "OrderItem");
