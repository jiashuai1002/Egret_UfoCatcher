class Config {
	private static _data: any;

	public static get server() {
		return PlayerShowData.isWechat() ? this.data.server_wechat : this.data.server;
	}

	public static get auth() {
		return PlayerShowData.isWechat() ? this.data.auth_wechat : this.data.auth;
	}

	private static get data() {
		if (this._data == null) {
			this._data = RES.getRes("config_json");
		}
		return this._data;
	}
}