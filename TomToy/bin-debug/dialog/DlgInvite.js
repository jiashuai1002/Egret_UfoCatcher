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
var DlgInvite = (function (_super) {
    __extends(DlgInvite, _super);
    function DlgInvite() {
        var _this = _super.call(this) || this;
        _this.skinName = skins.DlgInvite;
        return _this;
    }
    DlgInvite.prototype.init = function () {
        this.shareBtn.setOnTap(this.invite.bind(this));
        this.drawBtn.setOnTap(this.draw.bind(this));
        this.list.cacheAsBitmap = true;
        _super.prototype.init.call(this);
    };
    DlgInvite.prototype.preOpen = function () {
        this.refresh(_super.prototype.preOpen.bind(this));
    };
    DlgInvite.prototype.refresh = function (cb) {
        var _this = this;
        if (cb === void 0) { cb = null; }
        HttpManager.post(HttpCmd.INVITE_TASK_LIST, { user_id: PlayerDataManager.get(PlayerDataKey.ID) }, function (ret) {
            var list = ret.result.invite_tasks;
            _this.datas = [];
            var arr = [];
            for (var i = 0; i < list.length; i++) {
                var data = list[i];
                if (data.finished_status == "1") {
                    arr.push(data);
                }
                else {
                    _this.datas.push(data);
                }
            }
            _this.datas = _this.datas.concat(arr);
            var collection = new eui.ArrayCollection(_this.datas);
            _this.list.dataProvider = collection;
            _this.list.itemRenderer = InviteItem;
            _this.lastShare = ret.result.latest_invite_share;
            _this.check();
            cb && cb();
        }, null, true);
    };
    DlgInvite.prototype.show = function () {
    };
    DlgInvite.prototype.invite = function () {
        window["tdStatistics"]('邀请好友-分享', "点击");
        WxPlatform.share("xx", "xx");
        LocalDataManager.set(LocalDataKey.SHARE, true);
        this.check();
    };
    DlgInvite.prototype.draw = function () {
        var _this = this;
        HttpManager.post(HttpCmd.SHARE_RECEIVE, { user_id: PlayerDataManager.get(PlayerDataKey.ID) }, function (ret) {
            _this.lastShare = ret.result.latest_invite_share;
            PlayerDataManager.updateCoin();
            _this.check();
        }, null, true);
    };
    DlgInvite.prototype.check = function () {
        var flag = LocalDataManager.get(LocalDataKey.SHARE);
        this.drawBtn.visible = false;
        this.shareBtn.visible = false;
        if (flag) {
            if (this.lastShare && DateUtils.checkDay(new Date(DateUtils.convertDate(this.lastShare)), new Date())) {
                this.shareBtn.visible = true;
            }
            else {
                this.drawBtn.visible = true;
            }
        }
        else {
            this.shareBtn.visible = true;
        }
    };
    return DlgInvite;
}(Dialog));
__reflect(DlgInvite.prototype, "DlgInvite");
