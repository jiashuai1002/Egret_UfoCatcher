class NoticeItem extends eui.ItemRenderer {
	private title: eui.Label;
	private content: eui.Label;

	public constructor() {
		super();
		this.skinName = skins.NoticeItem;
		this.cacheAsBitmap = true;
	}

	protected dataChanged() {
		var data = this.data;
		if (data.msg_title.length > 13) {
			this.title.text = data.msg_title.slice(0, 12) + "...";
		} else {
			this.title.text = data.msg_title;
		}
		this.content.text = data.msg_desc;
	}
}