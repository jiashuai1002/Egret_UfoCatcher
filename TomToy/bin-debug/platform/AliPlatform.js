var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var AliPlatform = (function () {
    function AliPlatform() {
    }
    AliPlatform.pay = function (payId) {
        var url = Config.server + HttpCmd.PAY + "?user_id="
            + PlayerDataManager.get(PlayerDataKey.ID) + "&pay_channel=" + 4 + "&pay_id=" + payId;
        window["jump"](url);
    };
    return AliPlatform;
}());
__reflect(AliPlatform.prototype, "AliPlatform");
