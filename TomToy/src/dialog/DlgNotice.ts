class DlgNotice extends Dialog {
	private list: eui.List;
	private datas: Array<any>;

	public constructor() {
		super();
		this.skinName = skins.DlgNotice;
	}

	protected init() {
		this.list.cacheAsBitmap = true;
		super.init();
	}

	protected preOpen() {
		HttpManager.post(HttpCmd.MESSAGE_LIST, {}, ret => {
			this.datas = ret.list;
			super.preOpen();
		}, null, true);
	}


	protected show() {
		var collection = new eui.ArrayCollection(this.datas);
		this.list.dataProvider = collection;
		this.list.itemRenderer = NoticeItem;
	}

	public close() {
		super.close();
		ViewManager.I.open(ViewName.DLG_LOGIN_TASK);
	}
}