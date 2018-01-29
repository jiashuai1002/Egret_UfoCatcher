class ToyItem extends UIComponent {
	private roomId: number;
	private icon: eui.Image;
	private iconMask: eui.Image;
	private toy: eui.Label;

	public constructor() {
		super();
		this.skinName = skins.ToyItem;
		this.cacheAsBitmap = true;
	}

	protected init() {
		this.icon.mask = this.iconMask;
	}

	public show(data: ToyData, cnt: number) {
		console.log("------------------------")
		console.log(data)
		this.roomId = data.id;
		this.toy.text = data.name + " × " + cnt;
		this.icon.visible = false;
		DisplayUtils.loadImage(data.icon, tex => {
			this.icon.texture = tex;
			this.icon.visible = true;
		});
	}

	public destroy() {
		DisplayUtils.removeFromParent(this);
		ObjectPool.push(this);
	}
}