class OrderItem extends eui.ItemRenderer {
	private toy: eui.Label;
	private time: eui.Label;

	public constructor() {
		super();
		this.skinName = skins.OrderItem;
		this.cacheAsBitmap = true;
	}

	protected dataChanged() {
		var data = this.data as OrderData;
		this.toy.text = data.ut_name + "×" + data.pod_toy_num;
		this.time.text = data.to_createtime;
	}
}