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
var Hand = (function (_super) {
    __extends(Hand, _super);
    function Hand() {
        var _this = _super.call(this) || this;
        _this.skinName = skins.Hand;
        AnchorUtils.setAnchorX(_this, 0.5);
        var g = _this.shadow.graphics;
        g.clear();
        g.beginFill(0, 0.25);
        g.drawEllipse(0, 0, 160, 45);
        g.endFill();
        AnchorUtils.setAnchor(_this.shadow, 0.5);
        return _this;
    }
    Hand.prototype.init = function () {
        _super.prototype.init.call(this);
        this.length = 0;
    };
    Hand.prototype.changeLength = function (len, cb) {
        if (cb === void 0) { cb = null; }
        var change = len - this.length;
        var duration;
        if (change > 0) {
            duration = change * 3;
        }
        else {
            duration = -change * 5;
        }
        egret.Tween.get(this).to({ length: len }, duration).call(function () {
            cb && cb();
        });
    };
    Hand.prototype.shrink = function () {
        var _this = this;
        egret.Tween.removeTweens(this.leftHand);
        egret.Tween.removeTweens(this.rightHand);
        this.leftReady = false;
        this.rightReady = false;
        var duration1 = Math.abs(this.leftHand.rotation - 50) * 5;
        egret.Tween.get(this.leftHand).to({ rotation: -50 }, duration1).call(function () {
            _this.leftReady = true;
        }, this);
        var duration2 = Math.abs(this.rightHand.rotation - 50) * 5;
        egret.Tween.get(this.rightHand).to({ rotation: 50 }, duration2).call(function () {
            _this.rightReady = true;
        }, this);
    };
    Hand.prototype.spread = function () {
        var _this = this;
        egret.Tween.removeTweens(this.leftHand);
        egret.Tween.removeTweens(this.rightHand);
        var duration1 = Math.abs(this.leftHand.rotation) * 8;
        egret.Tween.get(this.leftHand).to({ rotation: 0 }, duration1).call(function () {
            _this.leftReady = true;
        }, this);
        var duration2 = Math.abs(this.rightHand.rotation) * 8;
        egret.Tween.get(this.rightHand).to({ rotation: 0 }, duration2).call(function () {
            _this.rightReady = true;
        }, this);
    };
    Hand.prototype.checkHit = function (rect) {
        if (rect) {
            if (!this.leftReady) {
                var l = this.leftRect.height;
                var p = this.leftRect.localToGlobal();
                var r = this.leftRect.rotation + this.leftHand.rotation;
                var start = new Vector2(p.x, p.y);
                var end = new Vector2(p.x + Math.sin((r - 180) / 180 * Math.PI) * l, p.y - Math.cos((r - 180) / 180 * Math.PI) * l);
                if (MathUtils.lineRectIntersection(start, end, rect)) {
                    this.leftReady = true;
                    egret.Tween.removeTweens(this.leftHand);
                }
            }
            if (!this.rightReady) {
                var l = this.rightRect.height;
                var p = this.rightRect.localToGlobal();
                var r = -this.rightRect.rotation + this.rightHand.rotation;
                var start = new Vector2(p.x, p.y);
                var end = new Vector2(p.x + Math.sin((r - 180) / 180 * Math.PI) * l, p.y - Math.cos((r - 180) / 180 * Math.PI) * l);
                if (MathUtils.lineRectIntersection(start, end, rect)) {
                    this.rightReady = true;
                    egret.Tween.removeTweens(this.rightHand);
                }
            }
        }
        return this.leftReady && this.rightReady;
    };
    Hand.prototype.redress = function () {
        egret.Tween.removeTweens(this.leftHand);
        egret.Tween.removeTweens(this.rightHand);
        var r = -this.leftHand.rotation + this.rightHand.rotation;
        var d = Math.abs(r / 2 - this.rightHand.rotation) * 30;
        egret.Tween.get(this.leftHand).to({ rotation: -r / 2 }, d);
        egret.Tween.get(this.rightHand).to({ rotation: r / 2 }, d);
    };
    Hand.prototype.shake = function (flag) {
        var value = flag * 20;
        egret.Tween.removeTweens(this.root);
        egret.Tween.get(this.root, { loop: true })
            .to({ rotation: value }, 400)
            .wait(100).to({ rotation: -value }, 800)
            .wait(100).to({ rotation: 0 }, 400);
    };
    Hand.prototype.stopShake = function () {
        egret.Tween.removeTweens(this.root);
        egret.Tween.get(this.root)
            .to({ rotation: 0 }, 200);
    };
    Object.defineProperty(Hand.prototype, "vy", {
        get: function () {
            return this._vy;
        },
        set: function (value) {
            this._vy = value;
            this.shadow.y = this._vy;
            var range = GameConfig.RANGE_Y;
            var ini = GameConfig.INI_SCALE;
            this.scaleX = this.scaleY = this.shadow.scaleX = this.shadow.scaleY = ini + this._vy / range * 0.05;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Hand.prototype, "vz", {
        get: function () {
            return this._vz;
        },
        set: function (value) {
            this._vz = value;
            this.y = -this._vz;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Hand.prototype, "length", {
        get: function () {
            return this._length;
        },
        set: function (value) {
            this._length = value;
            this.line.height = this.root.y = 90 + this._length;
        },
        enumerable: true,
        configurable: true
    });
    return Hand;
}(GameObject));
__reflect(Hand.prototype, "Hand");
//# sourceMappingURL=Hand.js.map