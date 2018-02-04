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
var Dialog = (function (_super) {
    __extends(Dialog, _super);
    function Dialog() {
        var _this = _super.call(this) || this;
        _this.layer = Layer.DIALOG;
        _this._black = new egret.Sprite;
        return _this;
    }
    Dialog.prototype.init = function () {
        AnchorUtils.setAnchor(this, 0.5);
        this.closeBtn && this.closeBtn.setOnTap(this.close.bind(this));
    };
    Dialog.prototype.onOpen = function () {
        LayerManager.I.addToLayer(this._black, Layer.DIALOG);
        this._black.alpha = .3;
        this._black.touchEnabled = true;
        this.scaleX = this.scaleY = 0.5;
        this.alpha = 1;
        egret.Tween.get(this).to({ scaleX: 1, scaleY: 1 }, 400, egret.Ease.backOut);
        _super.prototype.onOpen.call(this);
    };
    Dialog.prototype.onResize = function () {
        this.x = StageUtils.stageW / 2;
        this.y = StageUtils.stageH / 2;
        DrawUtils.drawRect(this._black, StageUtils.stageW, StageUtils.stageH, 0);
        _super.prototype.onResize.call(this);
    };
    Dialog.prototype.close = function () {
        var _this = this;
        egret.Tween.get(this).to({ alpha: 0, scaleX: 0.1, scaleY: 0.1 }, 150).call(function () {
            DisplayUtils.removeFromParent(_this._black);
            _super.prototype.close.call(_this);
        }, this);
        egret.Tween.get(this._black).to({ alpha: 0 }, 150);
    };
    return Dialog;
}(BaseView));
__reflect(Dialog.prototype, "Dialog");
