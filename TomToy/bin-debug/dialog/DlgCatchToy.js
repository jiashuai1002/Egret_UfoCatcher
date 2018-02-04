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
var DlgCatchToy = (function (_super) {
    __extends(DlgCatchToy, _super);
    function DlgCatchToy() {
        var _this = _super.call(this) || this;
        _this.skinName = skins.DlgCatchToy;
        return _this;
    }
    DlgCatchToy.prototype.init = function () {
        _super.prototype.init.call(this);
        this.showBtn.setOnTap(this.share.bind(this));
    };
    DlgCatchToy.prototype.preOpen = function (id, times) {
        this.catchId = id;
        this.catchTimes = times;
        _super.prototype.preOpen.call(this);
    };
    DlgCatchToy.prototype.show = function () {
        var data = DataManager.getToy(this.catchId);
        this.toy.source = data.icon;
        this.content.text = "抓到了一个" + data.name;
        var per = 100;
        for (var i = 1; i <= this.catchTimes; i++) {
            var v = i > 11 ? (22 - i) : i;
            if (v <= 0)
                v = 2;
            per -= Math.ceil(Math.sqrt(v));
        }
        if (per <= 0)
            per = 1;
        this.desc.textFlow = [
            { text: "你抓了" + this.catchTimes + "次抓到了，超过了", style: {} },
            { text: per + "%", style: { "textColor": 0xff4f9d } },
            { text: "的玩家", style: {} }
        ];
        WxPlatform.preloadAward(this.catchId, this.desc.text);
    };
    DlgCatchToy.prototype.share = function () {
        WxPlatform.awardShow();
    };
    return DlgCatchToy;
}(Dialog));
__reflect(DlgCatchToy.prototype, "DlgCatchToy");
