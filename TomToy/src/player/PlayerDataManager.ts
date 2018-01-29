class PlayerDataManager {
	private static data: any = {};
	private static listener: Array<Array<Function>> = [];


	public static set(key: PlayerDataKey, value: any) {
		this.data[key] = value;
		if (this.listener[key]) {
			this.listener[key].forEach(func => { func(value) });
		}
	}

	public static get(key: PlayerDataKey) {
		return this.data[key];
	}

	public static addDataListener(key: PlayerDataKey, listener: Function) {
		if (!this.listener[key]) {
			this.listener[key] = [];
		}
		this.listener[key].push(listener);
	}

	public static removeDataListener(key: PlayerDataKey, listener: Function) {
		if (this.listener[key]) {
			ArrayUtils.remove(this.listener[key], listener);
		}
	}

	public static updateCoin() {
		HttpManager.post(HttpCmd.USER_CURRENCY, { user_id: this.get(PlayerDataKey.ID) }, ret => {
			var coin = parseInt(ret.result.uc_balance);
			var dif = coin - this.get(PlayerDataKey.COIN);
			PlayerDataManager.set(PlayerDataKey.COIN, coin);
			if (dif > 0) {
				ViewManager.I.open(ViewName.POP_HINT, "获得金币×" + dif);
			}
		});
	}
}

enum PlayerDataKey {
	ID,
	NAME,
	HEAD,
	COIN,
	PHONE
}
