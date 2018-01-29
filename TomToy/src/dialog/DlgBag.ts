class DlgBag extends Dialog {
	private bagView: eui.Group;
	private toyView: eui.Group;
	private toyGroup: eui.List;
	private toyHint: eui.Label;
	private pickBtn: Button;
	private toyTab: eui.ToggleButton;
	private orderView: eui.Group;
	private orderList: eui.List;
	private orderTab: eui.ToggleButton;
	private orderHint: eui.Label;
	private toys: Array<any>;
	private orders: Array<OrderData>;
	private drawView: eui.Group;
	private pickList: eui.List;
	private pickView: eui.Group;
	private pickHint: eui.Label;
	private nextBtn: Button;
	private pickData: any;
	private pickCount: number;
	private infoView: eui.Group;
	private nameText: eui.EditableText;
	private phoneText: eui.EditableText;
	private addrText: eui.EditableText;
	private subBtn: Button;

	public constructor() {
		super();
		this.skinName = skins.DlgBag;
	}

	protected init() {
		super.init();
		this.toyTab.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showToy, this);
		this.orderTab.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showorder, this);
		this.pickBtn.setOnTap(this.pick.bind(this));
		this.nextBtn.setOnTap(this.next.bind(this));
		this.subBtn.setOnTap(this.sub.bind(this));

		this.nameText.maxChars = 7;
		this.phoneText.inputType = egret.TextFieldInputType.TEL;
		this.phoneText.restrict = "0-9";
		this.phoneText.maxChars = 11;
		this.addrText.maxChars = 40;
	}

	protected preOpen() {
		var ready = -2;
		var check = () => {
			ready += 1;
			if (ready == 0) {
				super.preOpen();
			}
		}
		HttpManager.post(HttpCmd.BAG_LIST, {
			user_id: PlayerDataManager.get(PlayerDataKey.ID)
		}, ret => {
			this.toys = ret.result.list;
			check();
		}, null, true);
		HttpManager.post(HttpCmd.ORDER_LIST, {
			user_id: PlayerDataManager.get(PlayerDataKey.ID)
		}, ret => {
			this.orders = ret.result.list;
			check();
		}, null, true);
	}


	protected show() {
		this.clear();
		var haveToy = this.toys.length > 0;
		if (haveToy) {
			for (let i = 0; i < this.toys.length; i++) {
				let item = ObjectPool.pop("ToyItem") as ToyItem;
				let toy = this.toys[i];
				console.log(toy)
				let data = DataManager.getToy(toy.pack_toy_id);
				item.show(data, toy.pack_balance_num);
				this.toyGroup.addChild(item);
			}
		}
		this.pickBtn.visible = haveToy;
		this.toyHint.visible = !haveToy;

		var collection = new eui.ArrayCollection(this.orders);
		this.orderList.dataProvider = collection;
		this.orderList.itemRenderer = OrderItem;
		this.orderHint.visible = this.orders.length == 0;

		this.bagView.visible = true;
		this.drawView.visible = false;
		this.showToy();
	}

	private showToy() {
		this.toyView.visible = true;
		this.toyTab.enabled = false;
		this.orderView.visible = false;
		this.orderTab.enabled = true;
	}

	private showorder() {
		this.toyView.visible = false;
		this.toyTab.enabled = true;
		this.orderView.visible = true;
		this.orderTab.enabled = false;
	}

	private clear() {
		var cnt = this.toyGroup.numChildren;
		for (let i = 0; i < cnt; i++) {
			var item = this.toyGroup.getChildAt(0) as RoomItem;
			item.destroy();
		}
	}

	private pick() {
		this.bagView.visible = false;
		this.drawView.visible = true;
		this.pickView.visible = true;
		this.infoView.visible = false;
		var list = [];
		for (let i = 0; i < this.toys.length; i++) {
			let toy = this.toys[i];
			list.push({
				id: toy.pack_toy_id,
				count: toy.pack_balance_num,
				onChange: this.onChange.bind(this)
			});
		}

		var collection = new eui.ArrayCollection(list);
		this.pickList.dataProvider = collection;
		this.pickList.itemRenderer = PickItem;
		this.pickData = {};
		this.pickCount = 0;
		this.pickHint.visible = true;
	}

	private onChange(toyId: number, value: number) {
		this.pickData[toyId] = value;
		this.pickCount = 0;
		for (var key in this.pickData) {
			this.pickCount += this.pickData[key];
		}
		this.pickHint.visible = this.pickCount < 2;
	}

	private next() {
		if (this.pickCount == 0) {
			return;
		}
		if (this.pickCount < 2 && PlayerDataManager.get(PlayerDataKey.COIN) < 100) {
			ViewManager.I.open(ViewName.DLG_CHARGE);
			ViewManager.I.open(ViewName.POP_HINT, "金币不足，请前去充值！");
			return;
		}

		this.pickView.visible = false;
		this.infoView.visible = true;
		var info = LocalDataManager.get(LocalDataKey.ADDRESS);
		if (info) {
			this.nameText.text = info.name;
			this.phoneText.text = info.phone;
			this.addrText.text = info.addr;
		}
	}

	private sub() {
		var hint: string;
		var name = this.nameText.text;
		var phone = this.phoneText.text;
		var addr = this.addrText.text;
		if (name == "") {
			hint = "请填写姓名";
		} else if (!MathUtils.checkName(name)) {
			hint = "请填写正确的姓名";
		} else if (phone == "") {
			hint = "请填写手机号码";
		} else if (!MathUtils.checkMobile(phone)) {
			hint = "请填写正确的手机号码";
		} else if (addr == "") {
			hint = "请填写详细地址";
		}
		if (hint) {
			ViewManager.I.open(ViewName.POP_HINT, hint);
			return;
		}
		LocalDataManager.set(LocalDataKey.ADDRESS, {
			name: name,
			phone: phone,
			addr: addr
		});

		var list = [];
		for (var key in this.pickData) {
			list.push({ ut_id: key, num: this.pickData[key] });
		}
		console.log(list);
		HttpManager.post(HttpCmd.EXCHANGE, {
			user_id: PlayerDataManager.get(PlayerDataKey.ID),
			exchg_username: name,
			exchg_phone: phone,
			exchg_address: addr,
			plist: JSON.stringify(list)
		}, ret => {
			this.close();
			ViewManager.I.open(ViewName.POP_HINT, "提取成功！");
			if (this.pickCount < 2) {
				PlayerDataManager.updateCoin();
			}
		}, null, true);
	}
}