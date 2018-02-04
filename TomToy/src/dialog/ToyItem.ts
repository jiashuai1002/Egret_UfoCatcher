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
		this.roomId = data.id;
		this.toy.text = data.name + " × " + cnt;
		this.icon.visible = false;
		DisplayUtils.loadImage(data.icon, tex => {
			this.icon.texture = tex;
			//限制背包内娃娃ICON的尺寸
			this.icon.width = 248;
			this.icon.height = 194;
			this.icon.visible = true;
		});
	}

	public destroy() {
		DisplayUtils.removeFromParent(this);
		ObjectPool.push(this);
	}
}