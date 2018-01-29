class LuckyBar extends UIComponent {
	private bar: eui.Image;
	private lucky: eui.Label;
	private barMask: egret.Shape;
	private _luckyValue: number;

	public constructor() {
		super();
	}

	protected init() {
		this.bar.parent.addChild(this.barMask = new egret.Shape);
		var g = this.barMask.graphics;
		g.beginFill(0);
		g.drawRect(0, 0, this.bar.width, this.bar.height);
		g.endFill();
		this.barMask.y = this.bar.y;
		this.barMask.x = this.bar.x - this.bar.width;
		this.bar.mask = this.barMask;
	}

	public start(room: number) {
		this.luckyValue = 0;
		HttpManager.post(HttpCmd.LUCKY_SCORE, {
			user_id: PlayerDataManager.get(PlayerDataKey.ID),
			ufo_id: room
		}, ret => {
			this.setLucky(ret.result.userLuckyScore);
		}, null, true);
	}

	public setLucky(value: number) {
		var duration = 500;
		egret.Tween.removeTweens(this);
		egret.Tween.get(this).to({ luckyValue: value }, duration);
	}

	public get value() {
		return this.luckyValue;
	}

	private get luckyValue() {
		return this._luckyValue;
	}

	private set luckyValue(value: number) {
		this._luckyValue = value;
		this.lucky.text = Math.floor(value) + "";
		this.barMask.x = this.bar.x + this.bar.width * (value / 100 - 1);
	}
}