class Dialog extends BaseView {
	private _black: egret.Sprite;
	private closeBtn: Button;

	public constructor() {
		super();
		this.layer = Layer.DIALOG;
		this._black = new egret.Sprite;
	}

	protected init() {
		AnchorUtils.setAnchor(this, 0.5);
		this.closeBtn && this.closeBtn.setOnTap(this.close.bind(this));
	}

	protected onOpen() {
		LayerManager.I.addToLayer(this._black, Layer.DIALOG);
		this._black.alpha = .3;
		this._black.touchEnabled = true;

		this.scaleX = this.scaleY = 0.5;
		this.alpha = 1;

		egret.Tween.get(this).to({ scaleX: 1, scaleY: 1 }, 400, egret.Ease.backOut);
		super.onOpen();
	}

	protected onResize() {
		this.x = StageUtils.stageW / 2;
		this.y = StageUtils.stageH / 2;
		DrawUtils.drawRect(this._black, StageUtils.stageW, StageUtils.stageH, 0);
		super.onResize();
	}

	public close() {
		egret.Tween.get(this).to({ alpha: 0, scaleX: 0.1, scaleY: 0.1 }, 150).call(() => {
			DisplayUtils.removeFromParent(this._black);
			super.close();
		}, this);
		egret.Tween.get(this._black).to({ alpha: 0 }, 150);
	}
}