class LuckyHint extends UIComponent {
	private luckyAdd: eui.Label;
	private luckyFull: eui.Image;

	public constructor() {
		super();
	}

	public show(full: boolean, add: number) {
		this.luckyFull.visible = full;
		this.luckyAdd.visible = !full;
		var str = "+" + add;
		this.luckyAdd.text = str;
		this.visible = true;
		this.scaleX = this.scaleY = 0.01;
		this.alpha = 1;
		egret.Tween.removeTweens(this);
		egret.Tween.get(this).to({ scaleX: 1, scaleY: 1 }, 300).wait(2500)
			.to({ alpha: 0 }, 200).call(() => {
				this.visible = false;
			});
	}

}