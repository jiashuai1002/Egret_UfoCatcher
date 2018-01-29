class GiftButtons extends UIComponent {
	private dailyTaskBtn: Button;
	private dailyGiftBtn: Button;
	private inviteBtn: Button;
	private bindBtn: Button;

	public constructor() {
		super();
		this.cacheAsBitmap = true;
	}

	protected init() {
		this.dailyTaskBtn.setOnTap(() => { ViewManager.I.open(ViewName.DLG_DAILY_TASK);TDAPP.onEvent('点击每日任务', "点击"); });
		this.dailyGiftBtn.setOnTap(() => { ViewManager.I.open(ViewName.DLG_DAILY_GIFT);TDAPP.onEvent('点击每日礼包', "点击"); });
		this.inviteBtn.setOnTap(() => { ViewManager.I.open(ViewName.DLG_INVITE);TDAPP.onEvent('点击邀请好友', "点击"); });
		this.bindBtn.setOnTap(() => { ViewManager.I.open(ViewName.DLG_BIND);TDAPP.onEvent('点击绑定手机', "点击"); });

		PlayerDataManager.addDataListener(PlayerDataKey.PHONE, value => {
			this.checkPhone(value);
		});
		this.checkPhone(PlayerDataManager.get(PlayerDataKey.PHONE));
	}

	private checkPhone(phone: string) {
		if (phone) {
			DisplayUtils.removeFromParent(this.bindBtn.parent);
		}
	}
}