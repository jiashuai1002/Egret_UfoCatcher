class Head extends eui.Image {
	public constructor() {
		super();
		this.once(egret.Event.ADDED_TO_STAGE, this.init, this);
	}

	private init() {
		var mask = new egret.Shape;
		this.parent.addChild(mask);
		mask.x = this.x;
		mask.y = this.y;
		var g = mask.graphics;
		g.beginFill(0);
		g.drawRoundRect(0, 0, this.width, this.height, this.width / 3, this.width / 3);
		g.endFill();
		this.mask = mask;
	}

	public setImage(img: string) {
		if (img == null || img == "") {
			this.source = "game_json.head";
		} else {
			this.source = img;
		}
	}
}