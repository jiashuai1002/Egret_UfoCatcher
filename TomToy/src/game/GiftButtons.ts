class GiftButtons extends UIComponent {
	private dailyTaskBtn: Button;
	private dailyGiftBtn: Button;
	private inviteBtn: Button;
	private bindBtn: Button;
	private flag: boolean;

	public constructor() {
		super();
		this.cacheAsBitmap = true;
	}

	protected init() {
		this.dailyTaskBtn.setOnTap(() => { ViewManager.I.open(ViewName.DLG_DAILY_TASK);window["tdStatistics"]('点击每日任务', "点击");});
		this.dailyGiftBtn.setOnTap(() => { ViewManager.I.open(ViewName.DLG_DAILY_GIFT);window["tdStatistics"]('点击每日礼包', "点击");});
		this.inviteBtn.setOnTap(() => { ViewManager.I.open(ViewName.DLG_INVITE);window["tdStatistics"]('点击邀请好友', "点击");});
		this.bindBtn.setOnTap(() => { ViewManager.I.open(ViewName.DLG_BIND);window["tdStatistics"]('点击绑定手机', "点击");});

		PlayerDataManager.addDataListener(PlayerDataKey.PHONE, value => {
			this.checkPhone(value);
		});
		this.checkPhone(PlayerDataManager.get(PlayerDataKey.PHONE));
		this.flag = false;
		TimerManager.doTimer(400, 0, this.change, this)
	}

	private checkPhone(phone: string) {
		if (phone) {
			DisplayUtils.removeFromParent(this.bindBtn.parent);
		}
	}

	private change() {
		this.flag = !this.flag;
		if (this.flag) {
			egret.Tween.get(this.dailyGiftBtn).to({ scaleX: 0.75, scaleY: 0.75 }, 400, egret.Ease.quadOut);
		} else {
			egret.Tween.get(this.dailyGiftBtn).to({ scaleX: 1, scaleY: 1 }, 400, egret.Ease.quadOut);
		}
		
	}
}