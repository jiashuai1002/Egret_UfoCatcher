class RoomUsers extends UIComponent {
	private room: number;
	private userCnt: eui.Label;
	private headGroup: eui.Group;

	public constructor() {
		super();
		this.cacheAsBitmap = true;
	}

	public start(room: number) {
		this.room = room;
		this.getUsers();
		TimerManager.doTimer(20000, 0, this.getUsers, this);
	}

	public stop() {
		TimerManager.remove(this.getUsers, this);
	}

	private getUsers() {
		HttpManager.post(HttpCmd.ROOM_USERS, {
			ufo_id: this.room
		}, ret => {
			this.userCnt.text = ret.result.count + "人";
			var arr = ret.result.users;
			for (let i = 0; i < 4; i++) {
				var data = ArrayUtils.random(arr);
				if (data == null) {
					break;
				}
				var head = this.headGroup.getChildAt(i) as Head;
				head.setImage(data.avtar);
				ArrayUtils.remove(arr, data);
			}
		});
	}
}