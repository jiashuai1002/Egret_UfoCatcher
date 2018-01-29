class GameTimer extends UIComponent {
	private time: eui.BitmapLabel;
	private count: number;
	private callBack: Function;

	public constructor() {
		super();
		this.cacheAsBitmap = true;
	}

	public start(count: number, cb: Function = null) {
		this.visible = true;
		TimerManager.doTimer(1000, count, this.countDown, this);
		this.setCount(count);
		this.callBack = cb;
	}

	public stop() {
		this.visible = false;
		TimerManager.remove(this.countDown, this);
		this.callBack = null;
	}

	private countDown() {
		this.setCount(this.count - 1);
	}

	private setCount(value: number) {
		this.time.text = value + "";
		this.count = value;
		if (value == 0) {
			this.callBack && this.callBack();
		}
	}
}