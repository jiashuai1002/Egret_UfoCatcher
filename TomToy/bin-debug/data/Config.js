var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Config = (function () {
    function Config() {
    }
    Object.defineProperty(Config, "server", {
        get: function () {
            return this.data.server;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Config, "auth", {
        get: function () {
            return this.data.auth;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Config, "data", {
        get: function () {
            if (this._data == null) {
                this._data = RES.getRes("config_json");
            }
            return this._data;
        },
        enumerable: true,
        configurable: true
    });
    return Config;
}());
__reflect(Config.prototype, "Config");
//# sourceMappingURL=Config.js.map