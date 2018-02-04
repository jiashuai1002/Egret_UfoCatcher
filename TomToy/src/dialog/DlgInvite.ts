class DlgInvite extends Dialog {
	private datas: Array<InviteTaskData>;
	private list: eui.List;
	private shareBtn: Button;
	private drawBtn: Button;
	private lastShare: string;

	public constructor() {
		super();
		this.skinName = skins.DlgInvite;
	}

	protected init() {
		this.shareBtn.setOnTap(this.invite.bind(this));
		this.drawBtn.setOnTap(this.draw.bind(this));
		this.list.cacheAsBitmap = true;
		super.init();
	}

	protected preOpen() {
		this.refresh(super.preOpen.bind(this));
	}

	private refresh(cb: Function = null) {
		HttpManager.post(HttpCmd.INVITE_TASK_LIST, { user_id: PlayerDataManager.get(PlayerDataKey.ID) }, ret => {
			var list = ret.result.invite_tasks as Array<InviteTaskData>;
			this.datas = [];
			var arr = [];
			for (let i = 0; i < list.length; i++) {
				var data = list[i];
				if (data.finished_status == "1") {
					arr.push(data);
				} else {
					this.datas.push(data);
				}
			}
			this.datas = this.datas.concat(arr);
			var collection = new eui.ArrayCollection(this.datas);
			this.list.dataProvider = collection;
			this.list.itemRenderer = InviteItem;
			this.lastShare = ret.result.latest_invite_share;
			this.check();
			cb && cb();
		}, null, true);
	}

	protected show() {
	}

	private invite() {
		window["tdStatistics"]('邀请好友-分享', "点击");
		WxPlatform.share("xx", "xx");
		LocalDataManager.set(LocalDataKey.SHARE, true);
		this.check();
	}

	private draw() {
		HttpManager.post(HttpCmd.SHARE_RECEIVE, { user_id: PlayerDataManager.get(PlayerDataKey.ID) }, ret => {
			this.lastShare = ret.result.latest_invite_share;
			PlayerDataManager.updateCoin();
			this.check();
		}, null, true);
	}

	private check() {
		var flag = LocalDataManager.get(LocalDataKey.SHARE);
		this.drawBtn.visible = false;
		this.shareBtn.visible = false;
		if (flag) {
			if (this.lastShare && DateUtils.checkDay(new Date(DateUtils.convertDate(this.lastShare)), new Date())) {
				this.shareBtn.visible = true;
			} else {
				this.drawBtn.visible = true;
			}
		} else {
			this.shareBtn.visible = true;
		}
	}
}