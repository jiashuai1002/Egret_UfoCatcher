/**
 * 加载界面
 */
class LoadingScene extends Scene {
	private bar: eui.Image;
	private progress: eui.Label;
	private barMask: egret.Shape;
	private _per: number;

	public constructor() {
		super();
		this.skinName = skins.LoadingScene;
	}

	protected init() {
		this.addChild(this.barMask = new egret.Shape);
		var g = this.barMask.graphics;
		g.beginFill(0);
		g.drawRect(0, -10, this.bar.width, this.bar.height + 20);
		g.endFill();
		this.barMask.y = this.bar.y;
		this.barMask.x = this.bar.x - this.bar.width;
		this.bar.mask = this.barMask;

		this._per = 0;
	}

	public setProgress(value: number) {
		var duration = 500;
		egret.Tween.removeTweens(this);
		egret.Tween.get(this).to({ per: value }, duration);
	}

	private get per() {
		return this._per;
	}

	private set per(value: number) {
		this._per = value;
		this.progress.text = Math.floor(value * 100) + "%";
		this.barMask.x = this.bar.x + this.bar.width * (value - 1);
	}
}