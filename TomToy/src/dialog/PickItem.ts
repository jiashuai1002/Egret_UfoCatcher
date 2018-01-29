class PickItem extends eui.ItemRenderer {
	private toy: eui.Label;
	private count: eui.Label;
	private addBtn: Button;
	private subBtn: Button;
	private id: number;
	private max: number;
	private cur: number;
	private onChange: Function;

	public constructor() {
		super();
		this.skinName = skins.PickItem;
		this.cacheAsBitmap = true;
		this.once(egret.Event.ADDED_TO_STAGE, this.init, this);
	}

	protected init() {
		this.addBtn.setOnTap(this.add.bind(this));
		this.subBtn.setOnTap(this.sub.bind(this));
	}

	protected dataChanged() {
		var data = this.data;
		this.id = data.id;
		this.toy.text = DataManager.getToy(this.id).name;
		this.max = data.count;
		this.onChange = data.onChange;
		this.setValue(0);
	}

	private add() {
		this.setValue(this.cur + 1);
	}

	private sub() {
		this.setValue(this.cur - 1);
	}

	private setValue(value: number) {
		this.cur = Math.max(Math.min(this.max, value), 0);
		this.count.text = "" + this.cur;
		this.addBtn.enabled = this.cur < this.max;
		this.subBtn.enabled = this.cur > 0;
		this.onChange(this.id, this.cur);
	}
}