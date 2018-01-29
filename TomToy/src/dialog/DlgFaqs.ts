class DlgFaqs extends Dialog {
	private code: eui.EditableText;
	private subBtn: Button;

	public constructor() {
		super();
		this.skinName = skins.DlgFaqs;
	}

	protected init() {
		this.subBtn.setOnTap(this.sub.bind(this));
		super.init();
	}

	protected show() {

	}

	private sub() {
		HttpManager.post(HttpCmd.DAILY_GIFT_RECEIVE, {
			user_id: PlayerDataManager.get(PlayerDataKey.ID),
			gift_code: this.code.text
		}, ret => {
			PlayerDataManager.updateCoin();
		}, null, true);
	}
}