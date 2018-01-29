class LocalDataManager {
	private static data: any;
	private static listener: Array<Array<Function>> = [];


	public static set(key: LocalDataKey, value: any) {
		if (this.data == null) this.load();
		this.data[key] = value;
		if (this.listener[key]) {
			this.listener[key].forEach(func => { func(value) });
		}
		this.save();
	}

	public static get(key: LocalDataKey) {
		if (this.data == null) this.load();
		return this.data[key];
	}

	public static addDataListener(key: LocalDataKey, listener: Function) {
		if (!this.listener[key]) {
			this.listener[key] = [];
		}
		this.listener[key].push(listener);
	}

	public static removeDataListener(key: LocalDataKey, listener: Function) {
		if (this.listener[key]) {
			ArrayUtils.remove(this.listener[key], listener);
		}
	}

	private static load() {
		var conf = egret.localStorage.getItem("tom_toy_loc");
		if (conf) {
			this.data = JSON.parse(conf);
		} else {
			this.data = {};
			this.data[LocalDataKey.ID] = null;
			this.data[LocalDataKey.SOUND] = true;
			this.data[LocalDataKey.BULLET] = true;
			this.data[LocalDataKey.GUIDE] = 0;
			this.data[LocalDataKey.ADDRESS] = {};
			this.data[LocalDataKey.SHARE] = false;
		}
	}

	private static save() {
		egret.localStorage.setItem("tom_toy_loc", JSON.stringify(this.data));
	}
}

enum LocalDataKey {
	ID,
	SOUND,
	BULLET,
	GUIDE,
	ADDRESS,
	SHARE
}
