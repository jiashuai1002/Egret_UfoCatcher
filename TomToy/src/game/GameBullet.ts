class GameBullet extends egret.DisplayObjectContainer {
	private bg: egret.Shape;
	private content: eui.Label;
	private padding: number = 8;

	public constructor() {
		super();
		this.addChild(this.bg = new egret.Shape);
		this.addChild(this.content = new eui.Label);
		this.content.x = this.content.y = this.padding;
		this.content.size = 24;
	}

	public start(text: string, src: number, dest: number) {
		this.content.text = text;
		var g = this.bg.graphics;
		g.clear();
		g.beginFill(0, 0.3);
		g.drawRoundRect(0, 0, this.content.width + this.padding * 2, this.content.height + this.padding * 2, 50, 50);
		g.endFill();

		this.x = src;
		var duration = 5000 + Math.random() * 2000;
		egret.Tween.get(this).to({ x: dest - this.width }, duration).call(() => {
			DisplayUtils.removeFromParent(this);
			ObjectPool.push(this);
		});
	}
}