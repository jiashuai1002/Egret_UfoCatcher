class DlgCatchToy extends Dialog {
	private toy: eui.Image;
	private content: eui.Label;
	private desc: eui.Label;
	private showBtn: Button;

	private catchId: number;
	private catchTimes: number;

	public constructor() {
		super();
		this.skinName = skins.DlgCatchToy;
	}

	protected init() {
		super.init();
		this.showBtn.setOnTap(this.share.bind(this));
	}

	protected preOpen(id: number, times: number) {
		this.catchId = id;
		this.catchTimes = times;
		super.preOpen();
	}

	protected show() {
		var data = DataManager.getToy(this.catchId);
		this.toy.source = data.icon;
		this.content.text = "抓到了一个" + data.name;
		var per = 100;
		for (let i = 1; i <= this.catchTimes; i++) {
			let v = i > 11 ? (22 - i) : i;
			if (v <= 0) v = 2;
			per -= Math.ceil(Math.sqrt(v));
		}
		if (per <= 0) per = 1;
		this.desc.textFlow = <Array<egret.ITextElement>>[
			{ text: "你抓了" + this.catchTimes + "次抓到了，超过了", style: {} },
			{ text: per + "%", style: { "textColor": 0xff4f9d } },
			{ text: "的玩家", style: {} }
		];

		WxPlatform.preloadAward(this.catchId, this.desc.text);
	}

	private share() {
		WxPlatform.awardShow();
	}
}