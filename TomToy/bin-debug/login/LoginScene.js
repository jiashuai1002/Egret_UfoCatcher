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
var LoginScene = (function (_super) {
    __extends(LoginScene, _super);
    function LoginScene() {
        var _this = _super.call(this) || this;
        _this.skinName = skins.LoginScene;
        return _this;
    }
    LoginScene.prototype.init = function () {
        this.qqBtn.setOnTap(this.qqLogin.bind(this));
        this.wxBtn.setOnTap(this.wxLogin.bind(this));
    };
    LoginScene.prototype.qqLogin = function () {
        QQPlatform.login();
        window["tdStatistics"]('点击QQ登录', "点击");
    };
    LoginScene.prototype.wxLogin = function () {
        WxPlatform.login();
    };
    return LoginScene;
}(Scene));
__reflect(LoginScene.prototype, "LoginScene");
