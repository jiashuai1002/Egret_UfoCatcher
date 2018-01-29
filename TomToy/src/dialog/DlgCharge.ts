class DlgCharge extends Dialog {
	private list: eui.List;
	private datas: Array<ChargeData>;
	private payView: eui.Group;
	private payClose: Button;
	private wxBtn: eui.Image;
	private aliBtn: eui.Image;
	private payId: number;

	public constructor() {
		super();
		this.skinName = skins.DlgCharge;
	}

	protected init() {
		this.payClose.setOnTap(() => {
			this.payView.visible = false;
		});
		this.wxBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.wxPay, this);
		this.aliBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.aliPay, this);
		super.init();
	}

	protected preOpen() {
		HttpManager.post(HttpCmd.CHARGE_LIST, { user_id: PlayerDataManager.get(PlayerDataKey.ID) }, ret => {
			this.datas = [];
			var arr = [];
			for (var key in ret.list) {
				var data = ret.list[key];
				if (data.ps_is_done == 1) {
					arr.push(data);
				} else {
					this.datas.push(data);
				}
			}
			this.datas = this.datas.concat(arr);
			super.preOpen();
		}, null, true);
	}


	protected show() {
		var collection = new eui.ArrayCollection(this.datas);
		this.list.dataProvider = collection;
		this.list.itemRenderer = ChargeItem;
		this.payView.visible = false;
	}

	private charge(id: number) {
		this.payId = id;
		this.payView.visible = true;
	}

	private wxPay() {
		WxPlatform.pay(this.payId);
	}

	private aliPay() {
		AliPlatform.pay(this.payId);
	}
}