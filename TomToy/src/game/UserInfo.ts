class UserInfo extends UIComponent {
	private nickName: eui.Label;
	private coin: eui.Label;

	public constructor() {
		super();
		this.cacheAsBitmap = true;
	}

	protected init() {
		this.nickName.text = PlayerDataManager.get(PlayerDataKey.NAME);
		this.coin.text = PlayerDataManager.get(PlayerDataKey.COIN);
		PlayerDataManager.addDataListener(PlayerDataKey.COIN, coin => {
			this.coin.text = coin;
		});
	}
}