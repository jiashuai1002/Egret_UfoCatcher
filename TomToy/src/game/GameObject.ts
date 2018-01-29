class GameObject extends eui.Component {
	protected shadow: egret.Shape;
	protected _vx: number;
	protected _vy: number;
	protected _vz: number;

	public constructor() {
		super();
		this.shadow = new egret.Shape();
	}

	public init(...params: any[]) {
		this.vx = this.vy = this.vz = 0;
	}

	public addTo(con: egret.DisplayObjectContainer) {
		con.addChild(this);
		con.addChild(this.shadow);
		con.setChildIndex(this.shadow, 0);
	}

	public get vx(): number {
		return this._vx;
	}

	public set vx(value: number) {
		this._vx = value;
		this.x = this._vx;
		this.shadow.x = this._vx;
	}

	public get vy(): number {
		return this._vy;
	}

	public set vy(value: number) {
		this._vy = value;
		this.y = this._vy - this._vz;
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
		this.y = this._vy - this._vz;
	}

	public destroy() {
		DisplayUtils.removeFromParent(this);
		DisplayUtils.removeFromParent(this.shadow);
	}
}