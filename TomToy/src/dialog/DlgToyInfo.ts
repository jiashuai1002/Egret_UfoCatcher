class DlgToyInfo extends Dialog {
	private recordList: eui.List;
	private recordTab: eui.ToggleButton;
	private infoList: eui.List;
	private infoTab: eui.ToggleButton;
	private datas: Array<RecordData>;
	private images: Array<string>;

	public constructor() {
		super();
		this.skinName = skins.DlgToyInfo;
	}

	protected init() {
		super.init();
		this.recordTab.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showRecord, this);
		this.infoTab.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showInfo, this);
		this.recordList.cacheAsBitmap = true;
	}

	protected preOpen(room: number) {
		HttpManager.post(HttpCmd.CATCH_RECORD_LIST, {
			ufo_id: room
		}, ret => {
			console.log(ret);
			this.datas = ret.result.list;
			super.preOpen();
		}, null, true);
		var toys = DataManager.getToysByRoom(room);
		var arr = [];
		toys.forEach(toy => {
			if (arr.indexOf(toy.desc) < 0) {
				arr.push(toy.desc);
			}
		});
		this.images = arr;
	}


	protected show() {
		var collection1 = new eui.ArrayCollection(this.datas);
		this.recordList.dataProvider = collection1;
		this.recordList.itemRenderer = RecordItem;
		var collection2 = new eui.ArrayCollection(this.images);
		this.infoList.dataProvider = collection2;
		this.infoList.itemRenderer = InfoItem;

		this.showRecord();
	}

	private showRecord() {
		this.recordList.parent.visible = true;
		this.recordTab.enabled = false;
		this.infoList.parent.visible = false;
		this.infoTab.enabled = true;
	}

	private showInfo() {
		this.recordList.parent.visible = false;
		this.recordTab.enabled = true;
		this.infoList.parent.visible = true;
		this.infoTab.enabled = false;
	}
}