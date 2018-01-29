class HttpManager {
	private static loadCnt: number = 0;

	public constructor() {
	}

	public static get(cmd: string, data: any, suc: Function = null, fail: Function = null, showLoading: boolean = false) {
		this.send(egret.HttpMethod.GET, cmd, data, suc, fail, showLoading);
	}

	public static post(cmd: string, data: any, suc: Function = null, fail: Function = null, showLoading: boolean = false) {
		this.send(egret.HttpMethod.POST, cmd, data, suc, fail, showLoading);
	}

	private static send(method: string, cmd: string, data: any, suc: Function = null, fail: Function = null, showLoading: boolean = false) {
		if (showLoading && fail == null) {
			fail = this.fail.bind(this);
		}

		if (showLoading) {
			this.showLoading();
		}
		var request = new egret.HttpRequest();
		var url = Config.server + cmd;
		var idx = 0;
		var params = "";
		for (var key in data) {
			params += idx == 0 ? "" : "&";
			params += key + "=" + data[key];
			idx += 1;
		}
		request.responseType = egret.HttpResponseType.TEXT;
		switch (method) {
			case egret.HttpMethod.GET:
				request.open(url, method);
				url += "?" + params;
				request.withCredentials = true;
				request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
				request.send();
				break;
			case egret.HttpMethod.POST:
				request.open(url, method);
				request.withCredentials = true;
				request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
				request.send(params);
				break;
		}
		request.addEventListener(egret.Event.COMPLETE, e => {
			var ret = JSON.parse(e.currentTarget.response);
			if (ret.error == 0) {
				// console.log(ret);
				suc && suc(ret);
			} else {
				fail && fail(ret);
			}
			if (showLoading) {
				this.hideLoading();
			}
		}, this);
		request.addEventListener(egret.IOErrorEvent.IO_ERROR, e => {
			fail && fail();
			if (showLoading) {
				this.hideLoading();
			}
		}, this);
	}

	private static fail(ret) {
		console.log(ret);
		ViewManager.I.open(ViewName.POP_ALERT, ret.message);
	}

	private static showLoading() {
		if (this.loadCnt == 0) {
			ViewManager.I.open(ViewName.HTTP);
		}
		this.loadCnt += 1;
	}

	private static hideLoading() {
		this.loadCnt -= 1;
		if (this.loadCnt == 0) {
			ViewManager.I.close(ViewName.HTTP);
		}
	}
}