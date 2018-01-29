class Config {
	private static _data: any;

	public static get server() {
		return this.data.server;
	}
	
	public static get auth() {
		return this.data.auth;
	} 

	private static get data() {
		if (this._data == null) {
			this._data = RES.getRes("config_json");
		}
		return this._data;
	}
}