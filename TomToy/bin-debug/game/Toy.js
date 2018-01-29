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
var Toy = (function (_super) {
    __extends(Toy, _super);
    function Toy() {
        var _this = _super.call(this) || this;
        _this.addChild(_this.image = new egret.Bitmap);
        _this.addChild(_this.emoji = new egret.Bitmap);
        return _this;
    }
    Toy.prototype.init = function (data) {
        _super.prototype.init.call(this);
        this.shadow.graphics.clear();
        this.data = data;
        this.vx = data.x;
        this.vy = data.y;
        this.vz = 0;
        this.alpha = 1;
        DisplayUtils.loadImage(data.img, this.onLoaded.bind(this));
        this.image.scaleX = this.image.scaleY = 1;
        this.emoji.visible = false;
    };
    Toy.prototype.homing = function () {
        var _this = this;
        var duration = Math.sqrt(this.vz) * 50;
        egret.Tween.get(this).to({ vz: 0 }, duration, egret.Ease.quadIn);
        egret.Tween.get(this).to({ vx: this.data.x, vy: this.data.y }, duration)
            .call(function () {
            if (duration > 300) {
                egret.Tween.get(_this.image).to({ scaleX: 1, scaleY: 0.95 }, 120, egret.Ease.bounceInOut)
                    .to({ scaleX: 1, scaleY: 1 }, 180, egret.Ease.bounceInOut);
            }
        });
    };
    Toy.prototype.showEmoji = function (type) {
        var _this = this;
        var src;
        switch (type) {
            case 0:
                src = "game_json.em_stay" + MathUtils.randomInt(1, 9);
                break;
            case 1:
                src = "game_json.em_down" + MathUtils.randomInt(1, 5);
                break;
            case 2:
                src = "game_json.em_up" + MathUtils.randomInt(1, 5);
                break;
        }
        this.emoji.texture = RES.getRes(src);
        AnchorUtils.setAnchorX(this.emoji, 0.2);
        AnchorUtils.setAnchorY(this.emoji, 1);
        this.emoji.visible = true;
        egret.Tween.removeTweens(this.emoji);
        this.emoji.alpha = 1;
        this.emoji.x = 18;
        this.emoji.y = -this.image.height * 0.65;
        this.emoji.scaleX = this.emoji.scaleY = 0.01;
        egret.Tween.get(this.emoji).to({ scaleX: 1, scaleY: 1 }, 400, egret.Ease.backOut)
            .wait(3000).to({ alpha: 0 }, 200).call(function () {
            _this.emoji.visible = false;
        });
    };
    Toy.prototype.onLoaded = function (tex) {
        this.image.texture = tex;
        AnchorUtils.setAnchorX(this.image, 0.5);
        AnchorUtils.setAnchorY(this.image, 1);
        var g = this.shadow.graphics;
        g.clear();
        g.beginFill(0, 0.2);
        g.drawEllipse(0, 0, this.image.width * 0.8, 32);
        g.endFill();
        AnchorUtils.setAnchor(this.shadow, 0.5);
    };
    Object.defineProperty(Toy.prototype, "id", {
        get: function () {
            return this.data.id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Toy.prototype, "dollName", {
        get: function () {
            return this.data.name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Toy.prototype, "vh", {
        get: function () {
            return this.data.h;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Toy.prototype, "vw", {
        get: function () {
            return this.data.w;
        },
        enumerable: true,
        configurable: true
    });
    return Toy;
}(GameObject));
__reflect(Toy.prototype, "Toy");
//# sourceMappingURL=Toy.js.map