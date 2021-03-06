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
var DlgFaqs = (function (_super) {
    __extends(DlgFaqs, _super);
    function DlgFaqs() {
        var _this = _super.call(this) || this;
        _this.skinName = skins.DlgFaqs;
        return _this;
    }
    DlgFaqs.prototype.init = function () {
        this.subBtn.setOnTap(this.sub.bind(this));
        _super.prototype.init.call(this);
    };
    DlgFaqs.prototype.show = function () {
    };
    DlgFaqs.prototype.sub = function () {
        HttpManager.post(HttpCmd.DAILY_GIFT_RECEIVE, {
            user_id: PlayerDataManager.get(PlayerDataKey.ID),
            gift_code: this.code.text
        }, function (ret) {
            PlayerDataManager.updateCoin();
        }, null, true);
    };
    return DlgFaqs;
}(Dialog));
__reflect(DlgFaqs.prototype, "DlgFaqs");
