class HttpLoading extends PopWin {
	private black: egret.Shape;
	private con: egret.DisplayObjectContainer;
	private bg: egret.Shape;
	private round: egret.Shape;
	private label: eui.Label;

	public constructor() {
		super();
	}

	protected init() {
		this.addChild(this.black = new egret.Shape);
		this.addChild(this.con = new egret.DisplayObjectContainer);
		this.con.addChild(this.bg = new egret.Shape);
		this.con.addChild(this.round = new egret.Shape);
		this.con.addChild(this.label = new eui.Label);

		var g2 = this.bg.graphics;
		g2.beginFill(0, 0.8);
		g2.drawRoundRect(- 100, - 100, 200, 200, 20);
		g2.endFill();

		var g3 = this.round.graphics;
		g3.lineStyle(12, 0xffffff);
		g3.drawArc(0, 0, 40, 0, Math.PI * 1.6);
		g3.endFill();

		this.round.y = -20;

		this.label.text = "加载中...";
		this.label.width = 200;
		this.label.anchorOffsetX = 100;
		this.label.textAlign = "center";
		this.label.y = 40;

		this.black.touchEnabled = true;
	}

	protected show() {
		egret.Tween.removeTweens(this.round);
		this.round.rotation = 0;
		egret.Tween.get(this.round, { loop: true }).to({ rotation: 360 }, 1000);
		this.con.visible = false;
		egret.setTimeout(() => {
			this.con.visible = true;
		}, this, 250);
	}

	protected onResize() {
		var stage = StageUtils.stage;
		var w = stage.stageWidth;
		var h = stage.stageHeight;
		var g1 = this.black.graphics;
		g1.beginFill(0, 0.01);
		g1.drawRect(0, 0, w, h);
		g1.endFill();
		this.con.x = w / 2;
		this.con.y = h / 2 * 0.9;
	}

	public close() {
		super.close();
		egret.Tween.removeTweens(this.round);
	}
}