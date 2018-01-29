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
var DlgCharge = (function (_super) {
    __extends(DlgCharge, _super);
    function DlgCharge() {
        var _this = _super.call(this) || this;
        _this.skinName = skins.DlgCharge;
        return _this;
    }
    DlgCharge.prototype.init = function () {
        var _this = this;
        this.payClose.setOnTap(function () {
            _this.payView.visible = false;
        });
        this.wxBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.wxPay, this);
        this.aliBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.aliPay, this);
        _super.prototype.init.call(this);
    };
    DlgCharge.prototype.preOpen = function () {
        var _this = this;
        HttpManager.post(HttpCmd.CHARGE_LIST, { user_id: PlayerDataManager.get(PlayerDataKey.ID) }, function (ret) {
            _this.datas = [];
            var arr = [];
            for (var key in ret.list) {
                var data = ret.list[key];
                if (data.ps_is_done == 1) {
                    arr.push(data);
                }
                else {
                    _this.datas.push(data);
                }
            }
            _this.datas = _this.datas.concat(arr);
            _super.prototype.preOpen.call(_this);
        }, null, true);
    };
    DlgCharge.prototype.show = function () {
        var collection = new eui.ArrayCollection(this.datas);
        this.list.dataProvider = collection;
        this.list.itemRenderer = ChargeItem;
        this.payView.visible = false;
    };
    DlgCharge.prototype.charge = function (id) {
        this.payId = id;
        this.payView.visible = true;
    };
    DlgCharge.prototype.wxPay = function () {
        WxPlatform.pay(this.payId);
    };
    DlgCharge.prototype.aliPay = function () {
        AliPlatform.pay(this.payId);
    };
    return DlgCharge;
}(Dialog));
__reflect(DlgCharge.prototype, "DlgCharge");
//# sourceMappingURL=DlgCharge.js.map