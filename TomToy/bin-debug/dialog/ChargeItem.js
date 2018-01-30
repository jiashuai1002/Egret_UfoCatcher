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
var ChargeItem = (function (_super) {
    __extends(ChargeItem, _super);
    function ChargeItem() {
        var _this = _super.call(this) || this;
        _this.skinName = skins.ChargeItem;
        _this.cacheAsBitmap = true;
        return _this;
    }
    ChargeItem.prototype.dataChanged = function () {
        var data = this.data;
        if (data.ps_is_newer) {
            this.skinName = skins.NewGiftItem;
            this.btn.visible = false;
            this.finished.visible = false;
            if (data.ps_is_done == 0) {
                this.btn.visible = true;
            }
            else if (data.ps_is_done == 1) {
                this.finished.visible = true;
            }
        }
        else {
            this.skinName = skins.ChargeItem;
            this.icon.source = data.ps_amount >= 1000 ? "ui_json.bag_coin" : "ui_json.coin";
        }
        this.desc.textFlow = [
            { text: data.ps_rmb_coin, style: {} },
            { text: data.ps_bonus_coin > 0 ? "+" + data.ps_bonus_coin : "", style: { "textColor": 0xff4f9d } },
            { text: "金币", style: {} }
        ];
        this.btn.labelDisplay.text = "¥" + data.ps_amount / 100;
        this.btn.setOnTap(this.charge.bind(this));
    };
    ChargeItem.prototype.charge = function () {
        if (PlayerShowData.isWechat()) {
            WxPlatform.pay(this.data.ps_id);
        }
        else {
            ViewManager.I.doFunc(ViewName.DLG_CHARGE, "charge", this.data.ps_id);
        }
        TDAPP.onEvent('充值按钮', "点击");
    };
    return ChargeItem;
}(eui.ItemRenderer));
__reflect(ChargeItem.prototype, "ChargeItem");
//# sourceMappingURL=ChargeItem.js.map