class GameTips extends eui.Label {
	private list: Array<string>;

	public constructor() {
		super();
	}

	public start() {
		this.list = RES.getRes("bullet_json")["tips"];
		this.change();
		TimerManager.doTimer(5000, 0, this.change, this);
	}

	public stop() {
		TimerManager.remove(this.change, this);
	}

	private change() {
		this.text = ArrayUtils.random(this.list);
	}
}