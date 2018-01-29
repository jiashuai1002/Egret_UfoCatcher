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
var GameTips = (function (_super) {
    __extends(GameTips, _super);
    function GameTips() {
        return _super.call(this) || this;
    }
    GameTips.prototype.start = function () {
        this.list = RES.getRes("bullet_json")["tips"];
        this.change();
        TimerManager.doTimer(5000, 0, this.change, this);
    };
    GameTips.prototype.stop = function () {
        TimerManager.remove(this.change, this);
    };
    GameTips.prototype.change = function () {
        this.text = ArrayUtils.random(this.list);
    };
    return GameTips;
}(eui.Label));
__reflect(GameTips.prototype, "GameTips");
//# sourceMappingURL=GameTips.js.map