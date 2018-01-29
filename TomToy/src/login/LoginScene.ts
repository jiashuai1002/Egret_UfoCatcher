class LoginScene extends Scene {
	private qqBtn: Button;
	private wxBtn: Button;

	public constructor() {
		super();
		this.skinName = skins.LoginScene;
	}

	protected init() {
		this.qqBtn.setOnTap(this.qqLogin.bind(this));
		this.wxBtn.setOnTap(this.wxLogin.bind(this));
	}

	private qqLogin() {
		QQPlatform.login();
		TDAPP.onEvent('点击QQ登录', "点击");
	}

	private wxLogin() {
		WxPlatform.login();
	}
}