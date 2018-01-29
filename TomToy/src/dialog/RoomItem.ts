class RoomItem extends UIComponent {
	private roomId: number;
	private icon: eui.Image;
	private iconMask: eui.Image;
	private toy: eui.Label;
	private desc: eui.Label;

	public constructor() {
		super();
		this.skinName = skins.RoomItem;
		this.cacheAsBitmap = true;
	}

	protected init() {
		this.icon.mask = this.iconMask;
		this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.changeRoom, this);
	}

	public show(data: RoomData) {
		this.roomId = data.id;
		this.toy.text = data.title;
		this.desc.text = data.cost + "金币/次  " + "约" + data.size + "厘米";
		this.icon.visible = false;
		DisplayUtils.loadImage(data.icon, tex => {
			this.icon.texture = tex;
			this.icon.visible = true;
		});
	}

	private changeRoom() {
		GameConfig.ROOM.changeRoom(this.roomId);
		ViewManager.I.close(ViewName.DLG_CHOOSE_ROOM);
	}

	public destroy() {
		DisplayUtils.removeFromParent(this);
		ObjectPool.push(this);
	}
}