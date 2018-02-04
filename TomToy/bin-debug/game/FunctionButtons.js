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
var FunctionButtons = (function (_super) {
    __extends(FunctionButtons, _super);
    function FunctionButtons() {
        var _this = _super.call(this) || this;
        _this.cacheAsBitmap = true;
        return _this;
    }
    FunctionButtons.prototype.init = function () {
        this.bagBtn.setOnTap(function () {
            ViewManager.I.open(ViewName.DLG_BAG);
            window["tdStatistics"]('点击背包', "点击");
        });
        this.chargeBtn.setOnTap(function () {
            ViewManager.I.open(ViewName.DLG_CHARGE);
            window["tdStatistics"]('点击充值', "点击");
        });
        this.settingBtn.setOnTap(function () {
            ViewManager.I.open(ViewName.DLG_SETTING);
            window["tdStatistics"]('点击设置', "点击");
        });
        this.showBtn.setOnTap(function () {
            ViewManager.I.open(ViewName.DLG_SHOW);
            window["tdStatistics"]('点击玩家秀', "点击");
        });
    };
    return FunctionButtons;
}(UIComponent));
__reflect(FunctionButtons.prototype, "FunctionButtons");
