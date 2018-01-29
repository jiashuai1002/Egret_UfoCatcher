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
var BaseView = (function (_super) {
    __extends(BaseView, _super);
    function BaseView() {
        var _this = _super.call(this) || this;
        _this.once(egret.Event.ADDED_TO_STAGE, _this.init, _this);
        return _this;
    }
    BaseView.prototype.init = function () {
    };
    BaseView.prototype.preOpen = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.onOpen();
    };
    BaseView.prototype.open = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.preOpen.apply(this, params);
    };
    BaseView.prototype.onOpen = function () {
        StageUtils.stage.addEventListener(egret.Event.RESIZE, this.onResize, this);
        LayerManager.I.addToLayer(this, this.layer);
        this.onResize();
        this.show();
    };
    BaseView.prototype.show = function () {
    };
    BaseView.prototype.onResize = function () {
        this.x = StageUtils.stage.stageWidth / 2;
        AnchorUtils.setAnchorX(this, 0.5);
    };
    BaseView.prototype.close = function () {
        StageUtils.stage.removeEventListener(egret.Event.RESIZE, this.onResize, this);
        DisplayUtils.removeFromParent(this);
    };
    return BaseView;
}(eui.Component));
__reflect(BaseView.prototype, "BaseView", ["IView"]);
//# sourceMappingURL=BaseView.js.map