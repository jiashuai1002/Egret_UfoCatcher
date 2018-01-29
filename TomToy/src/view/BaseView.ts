class BaseView extends eui.Component implements IView{
	protected layer: Layer;

	public constructor() {
		super();
		this.once(egret.Event.ADDED_TO_STAGE, this.init, this);
	}

	protected init() {

	}

	protected preOpen(...params) {
		this.onOpen();
	}

	public open(...params) {
		this.preOpen.apply(this, params);
	}

	protected onOpen() {
		StageUtils.stage.addEventListener(egret.Event.RESIZE, this.onResize, this);
		LayerManager.I.addToLayer(this, this.layer);
		this.onResize();
		this.show();
	}

	protected show() {

	}

	protected onResize() {
		this.x = StageUtils.stage.stageWidth / 2;
		AnchorUtils.setAnchorX(this, 0.5);
	}

	public close() {
		StageUtils.stage.removeEventListener(egret.Event.RESIZE, this.onResize, this);
		DisplayUtils.removeFromParent(this);
	}
}