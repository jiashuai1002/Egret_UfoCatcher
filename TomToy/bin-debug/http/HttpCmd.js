var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var HttpCmd = (function () {
    function HttpCmd() {
    }
    HttpCmd.CATCH_START = "/Home/Catch/insertCoin";
    HttpCmd.CATCH_LOST = "/Home/Catch/lost";
    HttpCmd.CATCH_FAIL = "/Home/Catch/failure";
    HttpCmd.CATCH_SUC = "/Home/Catch/success";
    HttpCmd.BAG_LIST = "/Home/Backpack/getAll";
    HttpCmd.ORDER_LIST = "/Home/ToyOrder/getAll";
    HttpCmd.BULLET_SUC = "/Home/CatchDanmu/getCatched";
    HttpCmd.BULLET_FAIL = "/Home/CatchDanmu/getUncatchedRecords";
    HttpCmd.MESSAGE_LIST = "/Home/Message/getAll";
    HttpCmd.DAILY_TASK_LIST = "/Home/DailyMission/getUserMission";
    HttpCmd.ROOM_USERS = "/Home/Online/getRoomUsers";
    HttpCmd.CATCH_RECORD_LIST = "/Home/ListCatched/pagination";
    HttpCmd.DAILY_TASK_RECEIVE = "/Home/DailyMission/receiveBonus";
    HttpCmd.CHECKIN_LIST = "/Home/Checkin/history";
    HttpCmd.CHECKIN_RECEIVE = "/Home/Checkin/getBonus";
    HttpCmd.CHARGE_LIST = "/Home/Payment/getSettings";
    HttpCmd.LUCKY_SCORE = "/Home/Online/getLuckyScore";
    HttpCmd.ROOM_LIST = "/Home/UfoCatcher/getUfos";
    HttpCmd.TOY_LIST = "/Home/UfoCatcher/getToys";
    HttpCmd.BULLET_LIST = "/Home/UfoCatcher/getSlogans";
    HttpCmd.USER_CURRENCY = "/Home/Currency/getUserCurrency";
    HttpCmd.USER = "/Home/User/getUser";
    HttpCmd.EXCHANGE = "/Home/Backpack/exchange";
    HttpCmd.DAILY_GIFT_RECEIVE = "/Home/WechatDailyGift/receive";
    HttpCmd.INVITE_TASK_LIST = "/Home/InviteTask/getAll";
    HttpCmd.INVITE_TASK_RECEIVE = "/Home/InviteTask/finish";
    HttpCmd.SHARE_RECEIVE = "/Home/InviteShareTask/share";
    HttpCmd.SEND_CODE = "/Home/User/sendCode";
    HttpCmd.BIND_PHONE = "/Home/User/bindPhone";
    HttpCmd.LOGIN_QQ = "/Service/Qq/login";
    HttpCmd.LOGIN_WX = "/Service/Wechat/login";
    HttpCmd.PAY = "/Home/Payment/pay";
    HttpCmd.LOGOUT = "/Home/User/logout";
    return HttpCmd;
}());
__reflect(HttpCmd.prototype, "HttpCmd");
//# sourceMappingURL=HttpCmd.js.map