class Toy extends GameObject {
	private image: egret.Bitmap;
	private data: ToyData;
	private emoji: egret.Bitmap;

	public constructor() {
		super();
		this.addChild(this.image = new egret.Bitmap);
		this.addChild(this.emoji = new egret.Bitmap);
	}

	public init(data: ToyData) {
		super.init();
		this.shadow.graphics.clear();
		this.data = data;
		this.vx = data.x;
		this.vy = data.y;
		this.vz = 0;
		this.alpha = 1;
		DisplayUtils.loadImage(data.img, this.onLoaded.bind(this));
		this.image.scaleX = this.image.scaleY = 1;
		this.emoji.visible = false;
	}

	public homing() {
		var duration = Math.sqrt(this.vz) * 50;
		egret.Tween.get(this).to({ vz: 0 }, duration, egret.Ease.quadIn);
		egret.Tween.get(this).to({ vx: this.data.x, vy: this.data.y }, duration)
			.call(() => {
				if (duration > 300) {
					egret.Tween.get(this.image).to({ scaleX: 1, scaleY: 0.95 }, 120, egret.Ease.bounceInOut)
						.to({ scaleX: 1, scaleY: 1 }, 180, egret.Ease.bounceInOut);
				}
			});
	}

	public showEmoji(type: number) {
		var src: string;
		switch (type) {
			case 0:
				src = "game_json.em_stay" + MathUtils.randomInt(1, 9);
				break;
			case 1:
				src = "game_json.em_down" + MathUtils.randomInt(1, 5);
				break;
			case 2:
				src = "game_json.em_up" + MathUtils.randomInt(1, 5);
				break;
		}
		this.emoji.texture = RES.getRes(src);
		AnchorUtils.setAnchorX(this.emoji, 0.2);
		AnchorUtils.setAnchorY(this.emoji, 1);
		this.emoji.visible = true;
		egret.Tween.removeTweens(this.emoji);
		this.emoji.alpha = 1;
		this.emoji.x = 18;
		this.emoji.y = - this.image.height * 0.65;
		this.emoji.scaleX = this.emoji.scaleY = 0.01;
		egret.Tween.get(this.emoji).to({ scaleX: 1, scaleY: 1 }, 400, egret.Ease.backOut)
			.wait(3000).to({ alpha: 0 }, 200).call(() => {
				this.emoji.visible = false;
			});
	}

	private onLoaded(tex: egret.Texture) {
		this.image.texture = tex;
		AnchorUtils.setAnchorX(this.image, 0.5);
		AnchorUtils.setAnchorY(this.image, 1);
		var g = this.shadow.graphics;
		g.clear();
		g.beginFill(0, 0.2);
		g.drawEllipse(0, 0, this.image.width * 0.8, 32);
		g.endFill();
		AnchorUtils.setAnchor(this.shadow, 0.5);
	}

	public get id() {
		return this.data.id;
	}

	public get dollName() {
		return this.data.name;
	}

	public get vh() {
		return this.data.h;
	}

	public get vw() {
		return this.data.w;
	}
}