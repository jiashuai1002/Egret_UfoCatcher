class PopHint extends PopWin {
	private con: eui.Group;
	private content: eui.Label;

	public constructor() {
		super();
		this.skinName = skins.PopHint;
	}

	protected preOpen(txt: string) {
		this.content.text = txt;
		super.preOpen();
	}

	public show() {
		StageUtils.stage.addChild(this);
		egret.Tween.removeTweens(this.con);
		this.con.alpha = 0;
		egret.Tween.get(this.con).to({ alpha: 1 }, 200).wait(1500)
			.to({ alpha: 0 }, 200).call(() => {
				DisplayUtils.removeFromParent(this);
			});
	}
}