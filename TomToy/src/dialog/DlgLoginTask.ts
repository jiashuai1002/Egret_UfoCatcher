class DlgLoginTask extends Dialog {
	private list: eui.List;
	private datas: Array<LoginTaskData>;

	public constructor() {
		super();
		this.skinName = skins.DlgLoginTask;
	}

	protected preOpen() {
		HttpManager.post(HttpCmd.CHECKIN_LIST, { user_id: PlayerDataManager.get(PlayerDataKey.ID) }, ret => {
			this.datas = ret.result.tasks;
			var checkins = ret.result.user_checkins;
			var flag = false;
			for (let i = 0; i < this.datas.length; i++) {
				var data = this.datas[i];
				var checkinData = checkins[i];
				if (checkinData) {
					data.ucgl_id = checkinData.ucgl_id;
					data.status = parseInt(checkinData.ucgl_status);
					if (data.status == 0) {
						flag = true;
					}
				} else {
					data.status = -1;
				}
			}
			if (flag) {
				super.preOpen();
			} else {
				this.close();
			}
		}, null, true);
	}


	protected show() {
		//data
		var collection = new eui.ArrayCollection(this.datas);
		this.list.dataProvider = collection;
		//view
		this.list.itemRenderer = LoginItem;
	}
}