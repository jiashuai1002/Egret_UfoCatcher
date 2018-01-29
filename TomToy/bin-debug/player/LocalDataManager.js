var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var LocalDataManager = (function () {
    function LocalDataManager() {
    }
    LocalDataManager.set = function (key, value) {
        if (this.data == null)
            this.load();
        this.data[key] = value;
        if (this.listener[key]) {
            this.listener[key].forEach(function (func) { func(value); });
        }
        this.save();
    };
    LocalDataManager.get = function (key) {
        if (this.data == null)
            this.load();
        return this.data[key];
    };
    LocalDataManager.addDataListener = function (key, listener) {
        if (!this.listener[key]) {
            this.listener[key] = [];
        }
        this.listener[key].push(listener);
    };
    LocalDataManager.removeDataListener = function (key, listener) {
        if (this.listener[key]) {
            ArrayUtils.remove(this.listener[key], listener);
        }
    };
    LocalDataManager.load = function () {
        var conf = egret.localStorage.getItem("tom_toy_loc");
        if (conf) {
            this.data = JSON.parse(conf);
        }
        else {
            this.data = {};
            this.data[LocalDataKey.ID] = null;
            this.data[LocalDataKey.SOUND] = true;
            this.data[LocalDataKey.BULLET] = true;
            this.data[LocalDataKey.GUIDE] = 0;
            this.data[LocalDataKey.ADDRESS] = {};
            this.data[LocalDataKey.SHARE] = false;
        }
    };
    LocalDataManager.save = function () {
        egret.localStorage.setItem("tom_toy_loc", JSON.stringify(this.data));
    };
    LocalDataManager.listener = [];
    return LocalDataManager;
}());
__reflect(LocalDataManager.prototype, "LocalDataManager");
var LocalDataKey;
(function (LocalDataKey) {
    LocalDataKey[LocalDataKey["ID"] = 0] = "ID";
    LocalDataKey[LocalDataKey["SOUND"] = 1] = "SOUND";
    LocalDataKey[LocalDataKey["BULLET"] = 2] = "BULLET";
    LocalDataKey[LocalDataKey["GUIDE"] = 3] = "GUIDE";
    LocalDataKey[LocalDataKey["ADDRESS"] = 4] = "ADDRESS";
    LocalDataKey[LocalDataKey["SHARE"] = 5] = "SHARE";
})(LocalDataKey || (LocalDataKey = {}));
//# sourceMappingURL=LocalDataManager.js.map