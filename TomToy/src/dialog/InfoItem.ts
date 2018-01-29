class InfoItem extends eui.ItemRenderer {
	private image: eui.Image;

	public constructor() {
		super();
		this.addChild(this.image = new eui.Image);
		this.image.y = 2;
	}

	protected dataChanged() {
		this.image.source = this.data;
		this.image.once(egret.Event.COMPLETE, () => {
			this.height = Math.floor(this.image.height * this.width / this.image.width);
			this.image.height = this.height;
			this.image.width = this.width;
		}, this);
	}
}