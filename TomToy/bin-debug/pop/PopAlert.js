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
var PopAlert = (function (_super) {
    __extends(PopAlert, _super);
    function PopAlert() {
        var _this = _super.call(this) || this;
        _this.layer = Layer.POPWIN;
        _this.skinName = skins.PopAlert;
        return _this;
    }
    PopAlert.prototype.init = function () {
        var _this = this;
        this.cacheAsBitmap = true;
        this.btn.setOnTap(function () {
            _this.close();
            _this.callBack && _this.callBack();
        });
        _super.prototype.init.call(this);
    };
    PopAlert.prototype.preOpen = function (txt, btnName, cb) {
        if (btnName === void 0) { btnName = null; }
        if (cb === void 0) { cb = null; }
        _super.prototype.preOpen.call(this);
        if (btnName == null) {
            btnName = "确定";
        }
        this.content.text = txt;
        this.btn.labelDisplay.text = btnName;
        this.callBack = cb;
    };
    return PopAlert;
}(Dialog));
__reflect(PopAlert.prototype, "PopAlert");
