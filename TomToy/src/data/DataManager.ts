class DataManager {
	private static _roomDic: { [id: number]: RoomData };
	private static _toyDic: { [id: number]: ToyData };
	private static _roomToys: { [id: number]: Array<ToyData> };

	public static initRoom(list: Array<any>) {
		this._roomDic = {};
		list.forEach(data => {
			let roomData = new RoomData;
			roomData.id = parseInt(data.uc_id);
			roomData.cost = parseInt(data.uc_cost);
			roomData.size = parseInt(data.uc_size);
			roomData.icon = data.uc_icon;
			roomData.title = data.uc_title;
			roomData.pos = JSON.parse(data.uc_pos);
			this._roomDic[roomData.id] = roomData;
		});
	}

	public static getRoom(id: number): RoomData {
		return this._roomDic[id];
	}

	public static getRooms(): Array<RoomData> {
		var arr = [];
		for (var roomId in this._roomDic) {
			arr.push(this._roomDic[roomId]);
		}
		return arr;
	}

	public static initToy(list: Array<any>) {
		this._toyDic = {};
		console.log("--------------list----------------")
		console.log(list);
		list.forEach(data => {
			let toyData = new ToyData;
			toyData.id = parseInt(data.ut_id);
			toyData.room = parseInt(data.uc_id)
			toyData.name = data.ut_name;
			toyData.img = data.ut_icon;
			toyData.icon = data.ut_cover_img;
			toyData.desc = data.ut_cover_img;
			toyData.w = parseInt(data.ut_width);
			toyData.h = parseInt(data.ut_height);
			this._toyDic[toyData.id] = toyData;
		});
	}

	public static getToy(id: number): ToyData {
		console.log(this._toyDic)
		return this._toyDic[id];
	}

	public static initRoomToys() {
		this._roomToys = {};
		for (var roomId in this._roomDic) {
			var posArr = this._roomDic[roomId].pos;
			if (posArr == null) continue;
			var toys = [];
			for (var toyId in this._toyDic) {
				let data = this._toyDic[toyId];
				if (data.room == parseInt(roomId)) {
					toys.push(data);
				}
			}
			var arr = [];
			for (let i = 0; i < posArr.length; i++) {
				let data = toys[i % toys.length];
				let toyData = JSON.parse(JSON.stringify(data)) as ToyData;
				toyData.x = posArr[i].x;
				toyData.y = posArr[i].y;
				toyData.idx = i;
				arr.push(toyData);
			}
			this._roomToys[roomId] = arr;
		}
	}

	public static getToysByRoom(room: number): Array<ToyData> {
		return this._roomToys[room];
	}
}