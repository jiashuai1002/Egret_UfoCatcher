class LoginItem extends eui.ItemRenderer {
	private coinIcon: eui.Image;
	private taskName: eui.Label;
	private desc: eui.Label;
	private drawBtn: Button;
	private finished: eui.Image;
	private unFinished: eui.Label;

	public constructor() {
		super();
		this.skinName = skins.LoginItem;
		this.cacheAsBitmap = true;
		this.once(egret.Event.ADDED_TO_STAGE, this.init, this);
	}

	private init() {
		this.drawBtn.setOnTap(this.draw.bind(this));
	}

	protected dataChanged() {
		var data = this.data as LoginTaskData;
		this.coinIcon.source = parseInt(data.gsd_checkin_total_days) == 7 ? "ui_json.bag_coin" : "ui_json.coin";
		this.taskName.text = data.gs_gift_name;
		this.desc.text = "奖励：金币×" + parseInt(data.gs_bonus_coin);
		this.setState(data.status);
	}

	private setState(status: number) {
		this.drawBtn.visible = false;
		this.finished.visible = false;
		this.unFinished.visible = false;
		switch (status) {
			case -1:
				this.unFinished.visible = true;
				break;
			case 0:
				this.drawBtn.visible = true;
				break;
			case 1:
				this.finished.visible = true;
				break;
		}
	}

	private draw() {
		HttpManager.post(HttpCmd.CHECKIN_RECEIVE, {
			user_checkin_id: this.data.ucgl_id,
			user_id: PlayerDataManager.get(PlayerDataKey.ID)
		}, ret => {
			PlayerDataManager.updateCoin();
			this.setState(1);
		}, null, true);
	}
}