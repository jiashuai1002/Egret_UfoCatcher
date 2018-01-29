class ViewManager {
	private _views: { [name: string]: IView };

	public constructor() {
		this._views = {};
	}

	public open(name: string, ...params): IView {
		var view: IView = this.getView(name) || this.createView(name);
		view.open.apply(view, params);
		return view;
	}

	public close(name: string, ...params) {
		var view = this.getView(name);
		view.close.apply(view, params);
	}

	public doFunc(name: string, funcName: string, ...params) {
		var view = this.getView(name);
		view[funcName].apply(view, params);
	}

	public getView(name: string) {
		return this._views[name];
	}

	private createView(name: string): IView {
		var view = ObjectPool.pop(name);
		this._views[name] = view;
		return view;
	}

	private static _instance: ViewManager;
	public static get I(): ViewManager {
		return this._instance || (this._instance = new ViewManager);
	}
}