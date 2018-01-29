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
var InviteItem = (function (_super) {
    __extends(InviteItem, _super);
    function InviteItem() {
        var _this = _super.call(this) || this;
        _this.skinName = skins.InviteItem;
        _this.cacheAsBitmap = true;
        _this.once(egret.Event.ADDED_TO_STAGE, _this.init, _this);
        return _this;
    }
    InviteItem.prototype.init = function () {
        this.drawBtn.setOnTap(this.draw.bind(this));
        this.inviteBtn.setOnTap(this.invite.bind(this));
    };
    InviteItem.prototype.dataChanged = function () {
        var data = this.data;
        this.taskName.text = data.it_title;
        this.desc.text = "奖励：金币×" + parseInt(data.it_bonus_coin);
        this.drawBtn.visible = false;
        this.finished.visible = false;
        this.inviteBtn.visible = false;
        switch (data.finished_status) {
            case "0":
                this.drawBtn.visible = true;
                break;
            case "1":
                this.finished.visible = true;
                break;
            default:
                this.inviteBtn.visible = true;
                break;
        }
    };
    InviteItem.prototype.draw = function () {
        HttpManager.post(HttpCmd.INVITE_TASK_RECEIVE, {
            task_id: this.data.it_id,
            user_id: PlayerDataManager.get(PlayerDataKey.ID),
        }, function (ret) {
            PlayerDataManager.updateCoin();
            ViewManager.I.doFunc(ViewName.DLG_INVITE, "refresh");
        }, null, true);
    };
    InviteItem.prototype.invite = function () {
        ViewManager.I.doFunc(ViewName.DLG_INVITE, "invite");
    };
    return InviteItem;
}(eui.ItemRenderer));
__reflect(InviteItem.prototype, "InviteItem");
//# sourceMappingURL=InviteItem.js.map