class DlgBind extends Dialog {
	private codeBtn: Button;
	private phone: eui.EditableText;
	private code: eui.EditableText;
	private bindBtn: Button;
	private time: eui.Label;
	private COUNT_DOWN: number = 60;
	private startTime: number;

	public constructor() {
		super();
		this.skinName = skins.DlgBind;
	}

	protected init() {
		super.init();
		this.codeBtn.setOnTap(this.sendCode.bind(this));
		this.bindBtn.setOnTap(this.bindPhone.bind(this));
		this.phone.maxChars = 11;
		this.phone.inputType = egret.TextFieldInputType.TEL;
		this.code.maxChars = 6;
		this.code.inputType = egret.TextFieldInputType.TEL;
	}

	private sendCode() {
		var phone = this.phone.text;
		if (this.checkPhone(phone)) {
			HttpManager.post(HttpCmd.SEND_CODE, { phone: phone }, ret => {
				this.codeBtn.visible = false;
				this.time.visible = true;
				this.startTime = egret.getTimer();
				this.time.text = this.COUNT_DOWN + "秒后获取";
				TimerManager.doFrame(1, 0, this.update, this);
			}, null, true);
		}
	}

	private update() {
		var cd = this.COUNT_DOWN;
		var curTime = egret.getTimer();
		var interval = (curTime - this.startTime) / 1000;
		this.time.text = Math.floor(cd - interval) + "秒后获取";
		if (cd <= interval) {
			TimerManager.remove(this.update, this);
			this.codeBtn.visible = true;
			this.time.visible = false;
		}
	}

	private bindPhone() {
		var phone = this.phone.text;
		var code = this.code.text;
		if (this.checkPhone(phone) && this.checkCode(code)) {
			HttpManager.post(HttpCmd.BIND_PHONE, {
				phone: phone,
				user_id: PlayerDataManager.get(PlayerDataKey.ID),
				code: code
			}, ret => {
				PlayerDataManager.set(PlayerDataKey.PHONE, phone);
				PlayerDataManager.updateCoin();
				this.close();
			}, null, true);
		}
	}

	private checkPhone(phone: string): boolean {
		var hint: string;
		if (phone == "") {
			hint = "请填写手机号码";
		} else if (!MathUtils.checkMobile(phone)) {
			hint = "请填写正确的手机号码";
		}
		if (hint) {
			ViewManager.I.open(ViewName.POP_HINT, hint)
		}
		return hint == null;
	}

	private checkCode(code: string): boolean {
		var hint: string;
		if (code == "") {
			hint = "请填写验证码";
		} else if (code.length < 6) {
			hint = "请填写正确的验证码";
		}
		if (hint) {
			ViewManager.I.open(ViewName.POP_HINT, hint)
		}
		return hint == null;
	}
}