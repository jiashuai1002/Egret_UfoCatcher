class FunctionButtons extends UIComponent {
	private bagBtn: Button;
	private chargeBtn: Button;
	private settingBtn: Button;
	private showBtn: Button;

	public constructor() {
		super();
		this.cacheAsBitmap = true;
	}

	protected init() {
		this.bagBtn.setOnTap(() => {
			ViewManager.I.open(ViewName.DLG_BAG);
			TDAPP.onEvent('点击背包', "点击"); 
		});
		this.chargeBtn.setOnTap(() => {
			ViewManager.I.open(ViewName.DLG_CHARGE);
			TDAPP.onEvent('点击充值', "点击"); 
		});
		this.settingBtn.setOnTap(() => {
			ViewManager.I.open(ViewName.DLG_SETTING);
			TDAPP.onEvent('点击设置', "点击"); 
		});
		this.showBtn.setOnTap(() => {
			ViewManager.I.open(ViewName.DLG_SHOW);
			TDAPP.onEvent('点击玩家秀', "点击"); 
		});
	}
}