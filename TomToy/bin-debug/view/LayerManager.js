var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var LayerManager = (function () {
    function LayerManager() {
        this._layers = [];
        var nameArr = ["scene", "dialog", "popwin"];
        for (var i = 0; i < 3; i++) {
            var layer = new egret.DisplayObjectContainer;
            StageUtils.stage.addChild(layer);
            this._layers[i] = layer;
            layer.name = nameArr[i];
        }
    }
    LayerManager.prototype.addToLayer = function (obj, layer) {
        this._layers[layer].addChild(obj);
    };
    Object.defineProperty(LayerManager, "I", {
        get: function () {
            return this._instance || (this._instance = new LayerManager);
        },
        enumerable: true,
        configurable: true
    });
    return LayerManager;
}());
__reflect(LayerManager.prototype, "LayerManager");
var Layer;
(function (Layer) {
    Layer[Layer["SCENE"] = 0] = "SCENE";
    Layer[Layer["DIALOG"] = 1] = "DIALOG";
    Layer[Layer["POPWIN"] = 2] = "POPWIN";
})(Layer || (Layer = {}));
