var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var PlayerDataManager = (function () {
    function PlayerDataManager() {
    }
    PlayerDataManager.set = function (key, value) {
        this.data[key] = value;
        if (this.listener[key]) {
            this.listener[key].forEach(function (func) { func(value); });
        }
    };
    PlayerDataManager.get = function (key) {
        return this.data[key];
    };
    PlayerDataManager.addDataListener = function (key, listener) {
        if (!this.listener[key]) {
            this.listener[key] = [];
        }
        this.listener[key].push(listener);
    };
    PlayerDataManager.removeDataListener = function (key, listener) {
        if (this.listener[key]) {
            ArrayUtils.remove(this.listener[key], listener);
        }
    };
    PlayerDataManager.updateCoin = function () {
        var _this = this;
        HttpManager.post(HttpCmd.USER_CURRENCY, { user_id: this.get(PlayerDataKey.ID) }, function (ret) {
            var coin = parseInt(ret.result.uc_balance);
            var dif = coin - _this.get(PlayerDataKey.COIN);
            PlayerDataManager.set(PlayerDataKey.COIN, coin);
            if (dif > 0) {
                ViewManager.I.open(ViewName.POP_HINT, "获得金币×" + dif);
            }
        });
    };
    PlayerDataManager.data = {};
    PlayerDataManager.listener = [];
    return PlayerDataManager;
}());
__reflect(PlayerDataManager.prototype, "PlayerDataManager");
var PlayerDataKey;
(function (PlayerDataKey) {
    PlayerDataKey[PlayerDataKey["ID"] = 0] = "ID";
    PlayerDataKey[PlayerDataKey["NAME"] = 1] = "NAME";
    PlayerDataKey[PlayerDataKey["HEAD"] = 2] = "HEAD";
    PlayerDataKey[PlayerDataKey["COIN"] = 3] = "COIN";
    PlayerDataKey[PlayerDataKey["PHONE"] = 4] = "PHONE";
})(PlayerDataKey || (PlayerDataKey = {}));
//# sourceMappingURL=PlayerDataManager.js.map