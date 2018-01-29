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
var GameObject = (function (_super) {
    __extends(GameObject, _super);
    function GameObject() {
        var _this = _super.call(this) || this;
        _this.shadow = new egret.Shape();
        return _this;
    }
    GameObject.prototype.init = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.vx = this.vy = this.vz = 0;
    };
    GameObject.prototype.addTo = function (con) {
        con.addChild(this);
        con.addChild(this.shadow);
        con.setChildIndex(this.shadow, 0);
    };
    Object.defineProperty(GameObject.prototype, "vx", {
        get: function () {
            return this._vx;
        },
        set: function (value) {
            this._vx = value;
            this.x = this._vx;
            this.shadow.x = this._vx;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameObject.prototype, "vy", {
        get: function () {
            return this._vy;
        },
        set: function (value) {
            this._vy = value;
            this.y = this._vy - this._vz;
            this.shadow.y = this._vy;
            var range = GameConfig.RANGE_Y;
            var ini = GameConfig.INI_SCALE;
            this.scaleX = this.scaleY = this.shadow.scaleX = this.shadow.scaleY = ini + this._vy / range * 0.05;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameObject.prototype, "vz", {
        get: function () {
            return this._vz;
        },
        set: function (value) {
            this._vz = value;
            this.y = this._vy - this._vz;
        },
        enumerable: true,
        configurable: true
    });
    GameObject.prototype.destroy = function () {
        DisplayUtils.removeFromParent(this);
        DisplayUtils.removeFromParent(this.shadow);
    };
    return GameObject;
}(eui.Component));
__reflect(GameObject.prototype, "GameObject");
//# sourceMappingURL=GameObject.js.map