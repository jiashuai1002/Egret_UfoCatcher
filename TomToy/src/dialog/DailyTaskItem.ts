class DailyTaskItem extends eui.ItemRenderer {
	private taskName: eui.Label;
	private desc: eui.Label;
	private drawBtn: Button;
	private finished: eui.Image;
	private unFinished: eui.Label;

	public constructor() {
		super();
		this.skinName = skins.DailyTaskItem;
		this.cacheAsBitmap = true;
		this.once(egret.Event.ADDED_TO_STAGE, this.init, this);
	}

	private init() {
		this.drawBtn.setOnTap(this.draw.bind(this));
	}

	protected dataChanged() {
		var data = this.data as DailyTaskData;
		this.taskName.text = data.task_title;
		this.desc.text = "奖励：金币×" + parseInt(data.task_bonus_coin) + " 任务积分×" + parseInt(data.task_bonus_score);
		this.drawBtn.visible = false;
		this.finished.visible = false;
		this.unFinished.visible = false;
		switch (data.status) {
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
		if (data.status <= 0) {
			this.taskName.textFlow = <Array<egret.ITextElement>>[
				{ text: data.task_title + "(", style: {} },
				{ text: data.progress, style: { "textColor": 0x40a904 } },
				{ text: ")", style: {} }
			];
		}
	}

	private draw() {
		console.log(this.data.task_id);
		console.log(PlayerDataManager.get(PlayerDataKey.ID));
		console.log(this.data.task_cat_id);
		HttpManager.post(HttpCmd.DAILY_TASK_RECEIVE, {
			task_id: this.data.task_id,
			user_id: PlayerDataManager.get(PlayerDataKey.ID),
			category_id: this.data.task_cat_id
		}, ret => {
			if (ret.mission.toyId > 0) {
				ViewManager.I.open(ViewName.POP_ALERT, "获得一个神秘娃娃，去背包看一看吧！", "前往", () => {
					ViewManager.I.open(ViewName.DLG_BAG);
				});
			}
			PlayerDataManager.updateCoin();
			ViewManager.I.doFunc(ViewName.DLG_DAILY_TASK, "refresh");
		}, null, true);
	}
}