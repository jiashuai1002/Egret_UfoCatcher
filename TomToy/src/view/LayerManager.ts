class LayerManager {
	private _layers: Array<egret.DisplayObjectContainer>;

	public constructor() {
		this._layers = [];
		var nameArr = ["scene", "dialog", "popwin"];
		for (let i = 0; i < 3; i++) {
			let layer = new egret.DisplayObjectContainer;
			StageUtils.stage.addChild(layer);
			this._layers[i] = layer;
			layer.name = nameArr[i];
		}
	}

	public addToLayer(obj: egret.DisplayObject, layer: Layer) {
		this._layers[layer].addChild(obj);
	}

	private static _instance: LayerManager;
	public static get I(): LayerManager {
		return this._instance || (this._instance = new LayerManager);
	}
}

enum Layer {
	SCENE,
	DIALOG,
	POPWIN
}