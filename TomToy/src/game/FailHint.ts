class FailHint extends eui.Image {
	private pos: number;

	public constructor() {
		super();
		this.once(egret.Event.ADDED_TO_STAGE, this.init, this);
	}

	private init() {
		this.pos = this.y;
	}

	public show() {
		this.source = "wordart_json.fail_hint" + MathUtils.randomInt(1, 10);
		this.visible = true;
		this.y = this.pos + 200;
		this.alpha = 0.3;
		egret.Tween.removeTweens(this);
		egret.Tween.get(this).to({ y: this.pos, alpha: 1 }, 500).wait(2500)
			.to({ alpha: 0 }, 200).call(() => {
				this.visible = false;
			});
	}
}