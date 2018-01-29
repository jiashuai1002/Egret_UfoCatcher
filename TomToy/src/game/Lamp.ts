class Lamp extends UIComponent {
	private img: eui.Image;
	private flag: boolean = true;

	public constructor() {
		super();
	}

	public start() {
		TimerManager.doTimer(600, 0, this.change, this);
	}

	public stop() {
		TimerManager.remove(this.change, this);
	}

	private change() {
		this.flag = !this.flag;
		this.img.texture = RES.getRes("game_json.light_" + (this.flag ? "1" : "2"));
	}
}