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
var GiftButtons = (function (_super) {
    __extends(GiftButtons, _super);
    function GiftButtons() {
        var _this = _super.call(this) || this;
        _this.cacheAsBitmap = true;
        return _this;
    }
    GiftButtons.prototype.init = function () {
        var _this = this;
        this.dailyTaskBtn.setOnTap(function () { ViewManager.I.open(ViewName.DLG_DAILY_TASK); window["tdStatistics"]('点击每日任务', "点击"); });
        this.dailyGiftBtn.setOnTap(function () { ViewManager.I.open(ViewName.DLG_DAILY_GIFT); window["tdStatistics"]('点击每日礼包', "点击"); });
        this.inviteBtn.setOnTap(function () { ViewManager.I.open(ViewName.DLG_INVITE); window["tdStatistics"]('点击邀请好友', "点击"); });
        this.bindBtn.setOnTap(function () { ViewManager.I.open(ViewName.DLG_BIND); window["tdStatistics"]('点击绑定手机', "点击"); });
        PlayerDataManager.addDataListener(PlayerDataKey.PHONE, function (value) {
            _this.checkPhone(value);
        });
        this.checkPhone(PlayerDataManager.get(PlayerDataKey.PHONE));
        this.flag = false;
        TimerManager.doTimer(400, 0, this.change, this);
    };
    GiftButtons.prototype.checkPhone = function (phone) {
        if (phone) {
            DisplayUtils.removeFromParent(this.bindBtn.parent);
        }
    };
    GiftButtons.prototype.change = function () {
        this.flag = !this.flag;
        if (this.flag) {
            egret.Tween.get(this.dailyGiftBtn).to({ scaleX: 0.75, scaleY: 0.75 }, 400, egret.Ease.quadOut);
        }
        else {
            egret.Tween.get(this.dailyGiftBtn).to({ scaleX: 1, scaleY: 1 }, 400, egret.Ease.quadOut);
        }
    };
    return GiftButtons;
}(UIComponent));
__reflect(GiftButtons.prototype, "GiftButtons");
