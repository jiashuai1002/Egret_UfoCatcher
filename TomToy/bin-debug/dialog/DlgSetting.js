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
var DlgSetting = (function (_super) {
    __extends(DlgSetting, _super);
    function DlgSetting() {
        var _this = _super.call(this) || this;
        _this.skinName = skins.DlgSetting;
        return _this;
    }
    DlgSetting.prototype.init = function () {
        this.soundBtn.setOnTap(function () {
            LocalDataManager.set(LocalDataKey.SOUND, !LocalDataManager.get(LocalDataKey.SOUND));
        });
        LocalDataManager.addDataListener(LocalDataKey.SOUND, this.checkSound.bind(this));
        this.bulletBtn.setOnTap(function () {
            LocalDataManager.set(LocalDataKey.BULLET, !LocalDataManager.get(LocalDataKey.BULLET));
        });
        LocalDataManager.addDataListener(LocalDataKey.BULLET, this.checkBullet.bind(this));
        this.checkSound();
        this.checkBullet();
        this.helpBtn.setOnTap(function () {
            ViewManager.I.open(ViewName.DLG_FAQS);
        });
        this.quitBtn.setOnTap(this.quit.bind(this));
        _super.prototype.init.call(this);
    };
    DlgSetting.prototype.checkSound = function () {
        var image = this.soundBtn.getChildAt(0);
        image.source = LocalDataManager.get(LocalDataKey.SOUND) ? "ui_json.music_off" : "ui_json.music_on";
    };
    DlgSetting.prototype.checkBullet = function () {
        var image = this.bulletBtn.getChildAt(0);
        image.source = LocalDataManager.get(LocalDataKey.BULLET) ? "ui_json.bullet_off" : "ui_json.bullet_on";
    };
    DlgSetting.prototype.show = function () {
    };
    DlgSetting.prototype.quit = function () {
        this.close();
        GameConfig.ROOM.close();
        ViewManager.I.open(ViewName.LOGIN);
        LocalDataManager.set(LocalDataKey.ID, null);
        HttpManager.post(HttpCmd.LOGOUT, {}, function (ret) {
        }, null, true);
    };
    return DlgSetting;
}(Dialog));
__reflect(DlgSetting.prototype, "DlgSetting");
//# sourceMappingURL=DlgSetting.js.map