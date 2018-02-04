var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ViewName = (function () {
    function ViewName() {
    }
    ViewName.LOGIN = "LoginScene";
    ViewName.LOADING = "LoadingScene";
    ViewName.GAME = "GameScene";
    ViewName.BACKUP = "BackupScene";
    ViewName.HTTP = "HttpLoading";
    ViewName.DLG_LOGIN_TASK = "DlgLoginTask";
    ViewName.DLG_DAILY_TASK = "DlgDailyTask";
    ViewName.DLG_DAILY_GIFT = "DlgDailyGift";
    ViewName.DLG_NOTICE = "DlgNotice";
    ViewName.DLG_TOY_INFO = "DlgToyInfo";
    ViewName.DLG_CATCH_TOY = "DlgCatchToy";
    ViewName.DLG_CHOOSE_ROOM = "DlgChooseRoom";
    ViewName.DLG_BAG = "DlgBag";
    ViewName.DLG_INVITE = "DlgInvite";
    ViewName.DLG_BIND = "DlgBind";
    ViewName.DLG_SETTING = "DlgSetting";
    ViewName.DLG_SHOW = "DlgShow";
    ViewName.DLG_CHARGE = "DlgCharge";
    ViewName.DLG_FAQS = "DlgFaqs";
    ViewName.DLG_CUSTOM = "DlgCustom";
    ViewName.DLG_SPRGIFT = "Dlg";
    ViewName.POP_HINT = "PopHint";
    ViewName.POP_ALERT = "PopAlert";
    return ViewName;
}());
__reflect(ViewName.prototype, "ViewName");
//# sourceMappingURL=ViewName.js.map