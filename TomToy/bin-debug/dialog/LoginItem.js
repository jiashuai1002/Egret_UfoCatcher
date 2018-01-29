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
var LoginItem = (function (_super) {
    __extends(LoginItem, _super);
    function LoginItem() {
        var _this = _super.call(this) || this;
        _this.skinName = skins.LoginItem;
        _this.cacheAsBitmap = true;
        _this.once(egret.Event.ADDED_TO_STAGE, _this.init, _this);
        return _this;
    }
    LoginItem.prototype.init = function () {
        this.drawBtn.setOnTap(this.draw.bind(this));
    };
    LoginItem.prototype.dataChanged = function () {
        var data = this.data;
        this.coinIcon.source = parseInt(data.gsd_checkin_total_days) == 7 ? "ui_json.bag_coin" : "ui_json.coin";
        this.taskName.text = data.gs_gift_name;
        this.desc.text = "奖励：金币×" + parseInt(data.gs_bonus_coin);
        this.setState(data.status);
    };
    LoginItem.prototype.setState = function (status) {
        this.drawBtn.visible = false;
        this.finished.visible = false;
        this.unFinished.visible = false;
        switch (status) {
            case -1:
                this.unFinished.visible = true;
                break;
            case 0:
                this.drawBtn.visible = true;
                break;
            case 1:
                this.finished.visible = true;
                break;
        }
    };
    LoginItem.prototype.draw = function () {
        var _this = this;
        HttpManager.post(HttpCmd.CHECKIN_RECEIVE, {
            user_checkin_id: this.data.ucgl_id,
            user_id: PlayerDataManager.get(PlayerDataKey.ID)
        }, function (ret) {
            PlayerDataManager.updateCoin();
            _this.setState(1);
        }, null, true);
    };
    return LoginItem;
}(eui.ItemRenderer));
__reflect(LoginItem.prototype, "LoginItem");
//# sourceMappingURL=LoginItem.js.map