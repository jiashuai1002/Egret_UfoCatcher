class InviteItem extends eui.ItemRenderer {
	private taskName: eui.Label;
	private desc: eui.Label;
	private drawBtn: Button;
	private finished: eui.Image;
	private inviteBtn: Button;

	public constructor() {
		super();
		this.skinName = skins.InviteItem;
		this.cacheAsBitmap = true;
		this.once(egret.Event.ADDED_TO_STAGE, this.init, this);
	}

	private init() {
		this.drawBtn.setOnTap(this.draw.bind(this));
		this.inviteBtn.setOnTap(this.invite.bind(this));
	}

	protected dataChanged() {
		var data = this.data as InviteTaskData;
		this.taskName.text = data.it_title;
		this.desc.text = "奖励：金币×" + parseInt(data.it_bonus_coin);
		this.drawBtn.visible = false;
		this.finished.visible = false;
		this.inviteBtn.visible = false;
		switch (data.finished_status) {
			case "0":
				this.drawBtn.visible = true;
				break;
			case "1":
				this.finished.visible = true;
				break;
			default:
				this.inviteBtn.visible = true;
				break;
		}
	}

	private draw() {
		HttpManager.post(HttpCmd.INVITE_TASK_RECEIVE, {
			task_id: this.data.it_id,
			user_id: PlayerDataManager.get(PlayerDataKey.ID),
		}, ret => {
			PlayerDataManager.updateCoin();
			ViewManager.I.doFunc(ViewName.DLG_INVITE, "refresh");
		}, null, true);
	}

	private invite() {
		ViewManager.I.doFunc(ViewName.DLG_INVITE, "invite");
	}
}