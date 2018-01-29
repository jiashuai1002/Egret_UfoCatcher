class ChargeItem extends eui.ItemRenderer {
	private icon: eui.Image;
	private desc: eui.Label;
	private btn: Button;
	private finished: eui.Image;

	public constructor() {
		super();
		this.skinName = skins.ChargeItem;
		this.cacheAsBitmap = true;
	}

	protected dataChanged() {
		var data = this.data as ChargeData;
		if (data.ps_is_newer) {
			this.skinName = skins.NewGiftItem;
			this.btn.visible = false;
			this.finished.visible = false;
			if (data.ps_is_done == 0) {
				this.btn.visible = true;
			} else if (data.ps_is_done == 1) {
				this.finished.visible = true;
			}
		} else {
			this.skinName = skins.ChargeItem;
			this.icon.source = data.ps_amount >= 1000 ? "ui_json.bag_coin" : "ui_json.coin";
		}
		this.desc.textFlow = <Array<egret.ITextElement>>[
			{ text: data.ps_rmb_coin, style: {} },
			{ text: data.ps_bonus_coin > 0 ? "+" + data.ps_bonus_coin : "", style: { "textColor": 0xff4f9d } },
			{ text: "金币", style: {} }
		];
		this.btn.labelDisplay.text = "¥" + data.ps_amount/100;
		this.btn.setOnTap(this.charge.bind(this));
	}

	private charge() {
		// ViewManager.I.doFunc(ViewName.DLG_CHARGE, "charge", this.data.ps_id);
		WxPlatform.pay(this.data.ps_id);
		TDAPP.onEvent('充值按钮', "点击");
	}
}