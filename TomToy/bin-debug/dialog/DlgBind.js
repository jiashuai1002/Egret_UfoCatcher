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
var DlgBind = (function (_super) {
    __extends(DlgBind, _super);
    function DlgBind() {
        var _this = _super.call(this) || this;
        _this.COUNT_DOWN = 60;
        _this.skinName = skins.DlgBind;
        return _this;
    }
    DlgBind.prototype.init = function () {
        _super.prototype.init.call(this);
        this.codeBtn.setOnTap(this.sendCode.bind(this));
        this.bindBtn.setOnTap(this.bindPhone.bind(this));
        this.phone.maxChars = 11;
        this.phone.inputType = egret.TextFieldInputType.TEL;
        this.code.maxChars = 6;
        this.code.inputType = egret.TextFieldInputType.TEL;
    };
    DlgBind.prototype.sendCode = function () {
        var _this = this;
        var phone = this.phone.text;
        if (this.checkPhone(phone)) {
            HttpManager.post(HttpCmd.SEND_CODE, { phone: phone }, function (ret) {
                _this.codeBtn.visible = false;
                _this.time.visible = true;
                _this.startTime = egret.getTimer();
                _this.time.text = _this.COUNT_DOWN + "秒后获取";
                TimerManager.doFrame(1, 0, _this.update, _this);
            }, null, true);
        }
    };
    DlgBind.prototype.update = function () {
        var cd = this.COUNT_DOWN;
        var curTime = egret.getTimer();
        var interval = (curTime - this.startTime) / 1000;
        this.time.text = Math.floor(cd - interval) + "秒后获取";
        if (cd <= interval) {
            TimerManager.remove(this.update, this);
            this.codeBtn.visible = true;
            this.time.visible = false;
        }
    };
    DlgBind.prototype.bindPhone = function () {
        var _this = this;
        var phone = this.phone.text;
        var code = this.code.text;
        if (this.checkPhone(phone) && this.checkCode(code)) {
            HttpManager.post(HttpCmd.BIND_PHONE, {
                phone: phone,
                user_id: PlayerDataManager.get(PlayerDataKey.ID),
                code: code
            }, function (ret) {
                PlayerDataManager.set(PlayerDataKey.PHONE, phone);
                PlayerDataManager.updateCoin();
                _this.close();
            }, null, true);
        }
    };
    DlgBind.prototype.checkPhone = function (phone) {
        var hint;
        if (phone == "") {
            hint = "请填写手机号码";
        }
        else if (!MathUtils.checkMobile(phone)) {
            hint = "请填写正确的手机号码";
        }
        if (hint) {
            ViewManager.I.open(ViewName.POP_HINT, hint);
        }
        return hint == null;
    };
    DlgBind.prototype.checkCode = function (code) {
        var hint;
        if (code == "") {
            hint = "请填写验证码";
        }
        else if (code.length < 6) {
            hint = "请填写正确的验证码";
        }
        if (hint) {
            ViewManager.I.open(ViewName.POP_HINT, hint);
        }
        return hint == null;
    };
    return DlgBind;
}(Dialog));
__reflect(DlgBind.prototype, "DlgBind");
//# sourceMappingURL=DlgBind.js.map