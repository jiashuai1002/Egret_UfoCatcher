class QQPlatform {
	public static login() {
		var url = Config.server + HttpCmd.LOGIN_QQ;
		window["jump"](url);
	}
}