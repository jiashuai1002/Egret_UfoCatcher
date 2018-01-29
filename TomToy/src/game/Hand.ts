class Hand extends GameObject {
	private line: eui.Image;
	private root: eui.Group;
	private _length: number;
	private leftHand: eui.Group;
	private rightHand: eui.Group;
	private leftRect: eui.Rect;
	private rightRect: eui.Rect;
	private leftReady: boolean;
	private rightReady: boolean;

	public constructor() {
		super();
		this.skinName = skins.Hand;
		AnchorUtils.setAnchorX(this, 0.5);
		var g = this.shadow.graphics;
		g.clear();
		g.beginFill(0, 0.25);
		g.drawEllipse(0, 0, 160, 45);
		g.endFill();
		AnchorUtils.setAnchor(this.shadow, 0.5);
	}

	public init() {
		super.init();
		this.length = 0;
	}

	public changeLength(len: number, cb: Function = null) {
		var change = len - this.length;
		var duration: number;
		if (change > 0) {
			duration = change * 3;
		} else {
			duration = -change * 5;
		}
		egret.Tween.get(this).to({ length: len }, duration).call(() => {
			cb && cb();
		});
	}

	public shrink() {
		egret.Tween.removeTweens(this.leftHand);
		egret.Tween.removeTweens(this.rightHand);
		this.leftReady = false;
		this.rightReady = false;
		var duration1 = Math.abs(this.leftHand.rotation - 50) * 5;
		egret.Tween.get(this.leftHand).to({ rotation: -50 }, duration1).call(() => {
			this.leftReady = true;
		}, this);
		var duration2 = Math.abs(this.rightHand.rotation - 50) * 5;
		egret.Tween.get(this.rightHand).to({ rotation: 50 }, duration2).call(() => {
			this.rightReady = true;
		}, this);
	}

	public spread() {
		egret.Tween.removeTweens(this.leftHand);
		egret.Tween.removeTweens(this.rightHand);
		var duration1 = Math.abs(this.leftHand.rotation) * 8;
		egret.Tween.get(this.leftHand).to({ rotation: 0 }, duration1).call(() => {
			this.leftReady = true;
		}, this);
		var duration2 = Math.abs(this.rightHand.rotation) * 8;
		egret.Tween.get(this.rightHand).to({ rotation: 0 }, duration2).call(() => {
			this.rightReady = true;
		}, this);
	}

	public checkHit(rect: Rect): boolean {
		if (rect) {
			if (!this.leftReady) {
				var l = this.leftRect.height;
				var p = this.leftRect.localToGlobal();
				var r = this.leftRect.rotation + this.leftHand.rotation;
				var start = new Vector2(p.x, p.y);
				var end = new Vector2(p.x + Math.sin((r - 180) / 180 * Math.PI) * l, p.y - Math.cos((r - 180) / 180 * Math.PI) * l);
				if (MathUtils.lineRectIntersection(start, end, rect)) {
					this.leftReady = true;
					egret.Tween.removeTweens(this.leftHand);
				}
			}
			if (!this.rightReady) {
				var l = this.rightRect.height;
				var p = this.rightRect.localToGlobal();
				var r = -this.rightRect.rotation + this.rightHand.rotation;
				var start = new Vector2(p.x, p.y);
				var end = new Vector2(p.x + Math.sin((r - 180) / 180 * Math.PI) * l, p.y - Math.cos((r - 180) / 180 * Math.PI) * l);
				if (MathUtils.lineRectIntersection(start, end, rect)) {
					this.rightReady = true;
					egret.Tween.removeTweens(this.rightHand);
				}
			}
		}
		return this.leftReady && this.rightReady;
	}

	public redress() {
		egret.Tween.removeTweens(this.leftHand);
		egret.Tween.removeTweens(this.rightHand);
		var r = -this.leftHand.rotation + this.rightHand.rotation;
		var d = Math.abs(r / 2 - this.rightHand.rotation) * 30;
		egret.Tween.get(this.leftHand).to({ rotation: -r / 2 }, d);
		egret.Tween.get(this.rightHand).to({ rotation: r / 2 }, d);
	}

	public shake(flag: number) {
		var value = flag * 20;
		egret.Tween.removeTweens(this.root);
		egret.Tween.get(this.root, { loop: true })
			.to({ rotation: value }, 400)
			.wait(100).to({ rotation: -value }, 800)
			.wait(100).to({ rotation: 0 }, 400);
	}

	public stopShake() {
		egret.Tween.removeTweens(this.root);
		egret.Tween.get(this.root)
			.to({ rotation: 0 }, 200);
	}

	public get vy(): number {
		return this._vy;
	}

	public set vy(value: number) {
		this._vy = value;
		this.shadow.y = this._vy;

		var range = GameConfig.RANGE_Y;
		var ini = GameConfig.INI_SCALE;
		this.scaleX = this.scaleY = this.shadow.scaleX = this.shadow.scaleY = ini + this._vy / range * 0.05;
	}

	public get vz(): number {
		return this._vz;
	}

	public set vz(value: number) {
		this._vz = value;
		this.y = -this._vz;
	}

	public get length(): number {
		return this._length;
	}

	public set length(value: number) {
		this._length = value;
		this.line.height = this.root.y = 90 + this._length;
	}
}