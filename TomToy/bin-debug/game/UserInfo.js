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
var UserInfo = (function (_super) {
    __extends(UserInfo, _super);
    function UserInfo() {
        var _this = _super.call(this) || this;
        _this.cacheAsBitmap = true;
        return _this;
    }
    UserInfo.prototype.init = function () {
        var _this = this;
        this.nickName.text = PlayerDataManager.get(PlayerDataKey.NAME);
        this.coin.text = PlayerDataManager.get(PlayerDataKey.COIN);
        PlayerDataManager.addDataListener(PlayerDataKey.COIN, function (coin) {
            _this.coin.text = coin;
        });
    };
    return UserInfo;
}(UIComponent));
__reflect(UserInfo.prototype, "UserInfo");
//# sourceMappingURL=UserInfo.js.map