class PopAlert extends Dialog {
	private content: eui.Label;
	private btn: Button;
	private callBack: Function;

	public constructor() {
		super();
		this.layer = Layer.POPWIN;
		this.skinName = skins.PopAlert;
	}

	protected init() {
		this.cacheAsBitmap = true;
		this.btn.setOnTap(() => {
			this.close();
			this.callBack && this.callBack();
		});
		super.init();
	}

	protected preOpen(txt: string, btnName: string = null, cb: Function = null) {
		super.preOpen();
		if (btnName == null) {
			btnName = "确定";
		}
		this.content.text = txt;
		this.btn.labelDisplay.text = btnName;
		this.callBack = cb;
	}
}