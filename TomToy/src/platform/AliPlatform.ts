class AliPlatform {
	public static pay(payId: number) {
		var url = Config.server + HttpCmd.PAY + "?user_id="
			+ PlayerDataManager.get(PlayerDataKey.ID) + "&pay_channel=" + 4 + "&pay_id=" + payId;
		window["jump"](url);
	}
}