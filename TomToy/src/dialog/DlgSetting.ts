class DlgSetting extends Dialog {
	private soundBtn: Button;
	private bulletBtn: Button;
	private helpBtn: Button;
	private quitBtn: Button;

	public constructor() {
		super();
		this.skinName = skins.DlgSetting;
	}

	protected init() {
		this.soundBtn.setOnTap(() => {
			LocalDataManager.set(LocalDataKey.SOUND, !LocalDataManager.get(LocalDataKey.SOUND));
		})
		LocalDataManager.addDataListener(LocalDataKey.SOUND, this.checkSound.bind(this));
		this.bulletBtn.setOnTap(() => {
			LocalDataManager.set(LocalDataKey.BULLET, !LocalDataManager.get(LocalDataKey.BULLET));
		})
		LocalDataManager.addDataListener(LocalDataKey.BULLET, this.checkBullet.bind(this));
		this.checkSound();
		this.checkBullet();

		this.helpBtn.setOnTap(()=>{
			 ViewManager.I.open(ViewName.DLG_FAQS);
		})

		this.quitBtn.setOnTap(this.quit.bind(this));

		super.init();
		//微信环境下 setting-dialog 特殊处理。
		if(PlayerShowData.isWechat()){
			this.quitBtn.visible = false;
			this.bulletBtn.y = 474;
			this.helpBtn.y = 570;
		}
	}

	private checkSound() {
		var image = this.soundBtn.getChildAt(0) as eui.Image;
		image.source = LocalDataManager.get(LocalDataKey.SOUND) ? "ui_json.music_off" : "ui_json.music_on";
	}

	private checkBullet() {
		var image = this.bulletBtn.getChildAt(0) as eui.Image;
		image.source = LocalDataManager.get(LocalDataKey.BULLET) ? "ui_json.bullet_off" : "ui_json.bullet_on";
	}

	protected show() {

	}

	private quit() {
		this.close();
		GameConfig.ROOM.close();
		ViewManager.I.open(ViewName.LOGIN);
		LocalDataManager.set(LocalDataKey.ID, null);
		

		HttpManager.post(HttpCmd.LOGOUT, {
			
		}, ret => {
			
		}, null, true);
	}
}