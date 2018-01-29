class RecordItem extends eui.ItemRenderer {
	private nickName: eui.Label;
	private head: Head;
	private toy: eui.Label;
	private time: eui.Label;

	public constructor() {
		super();
		this.skinName = skins.RecordItem;
		this.cacheAsBitmap = true;
	}

	protected dataChanged() {
		var data = this.data as RecordData;
		this.nickName.text = data.nickname;
		this.head.setImage(data.avtar);
		this.toy.text = data.ut_name;
		this.time.text = DateUtils.howLongAgo(data.pc_finished_at);
	}
}