var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var QQPlatform = (function () {
    function QQPlatform() {
    }
    QQPlatform.login = function () {
        var url = Config.server + HttpCmd.LOGIN_QQ;
        window["jump"](url);
    };
    return QQPlatform;
}());
__reflect(QQPlatform.prototype, "QQPlatform");
