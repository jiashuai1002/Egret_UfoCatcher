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
var Lamp = (function (_super) {
    __extends(Lamp, _super);
    function Lamp() {
        var _this = _super.call(this) || this;
        _this.flag = true;
        return _this;
    }
    Lamp.prototype.start = function () {
        TimerManager.doTimer(600, 0, this.change, this);
    };
    Lamp.prototype.stop = function () {
        TimerManager.remove(this.change, this);
    };
    Lamp.prototype.change = function () {
        this.flag = !this.flag;
        this.img.texture = RES.getRes("game_json.light_" + (this.flag ? "1" : "2"));
    };
    return Lamp;
}(UIComponent));
__reflect(Lamp.prototype, "Lamp");
//# sourceMappingURL=Lamp.js.map