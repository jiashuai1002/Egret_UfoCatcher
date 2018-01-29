class DlgChooseRoom extends Dialog {
	private curRoom: number;
	private showRooms: Array<number>;
	private roomIds: Array<number>;
	private group: eui.Group;
	private changeBtn: Button;

	public constructor() {
		super();
		this.skinName = skins.DlgChooseRoom;
	}

	protected init() {
		super.init();

		var arr = [];
		var rooms = DataManager.getRooms();
		rooms.forEach(room => {
			arr.push(room.id);
		});
		this.roomIds = arr;
		this.showRooms = [];
		this.changeBtn.setOnTap(this.refresh.bind(this));
	}

	protected preOpen(roomId: number) {
		this.curRoom = roomId;
		this.showRooms = [];
		super.preOpen();
	}

	protected show() {
		this.refresh();
	}

	private refresh() {
		var arr = [];
		this.roomIds.forEach(roomId => {
			if (this.showRooms.indexOf(roomId) < 0 && this.curRoom != roomId) {
				arr.push(roomId);
			}
		})
		arr.sort(function () { return 0.5 - Math.random() });
		this.showRooms = arr.slice(0, 4);
		this.clear();

		for (let i = 0; i < this.showRooms.length; i++) {
			let item = ObjectPool.pop("RoomItem") as RoomItem;
			let data = DataManager.getRoom(this.showRooms[i]);
			item.show(data);
			this.group.addChild(item);
			item.touchEnabled = true;
		}
	}

	private clear() {
		var cnt = this.group.numChildren;
		for (let i = 0; i < cnt; i++) {
			var item = this.group.getChildAt(0) as RoomItem;
			item.destroy();
		}
	}
}