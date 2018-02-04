/**
 * 游戏界面
 */
class GameScene extends Scene {
	private roomId: number;
	private price: number;
	private catchData: CatchData;

	private front: eui.Image;

	private startGroup: eui.Group;
	private startBtn: Button;
	private changeBtn: Button;
	private cost: eui.Label;

	private operateGroup: eui.Group;
	private upBtn: eui.Rect;
	private downBtn: eui.Rect;
	private leftBtn: eui.Rect;
	private rightBtn: eui.Rect;
	private catchBtn: Button;

	private gameTimer: GameTimer;
	private toyWorld: ToyWorld;
	public awardCon: eui.Component;

	private tips: GameTips;
	private leftLamp: Lamp;
	private rightLamp: Lamp;

	private giftBtns: GiftButtons;

	private failHint: FailHint;
	private luckyHint: LuckyHint;
	private luckyBar: LuckyBar;
	private roomUsers: RoomUsers;

	private bulletView: BulletView;
	private bulletData: BulletData;

	private infoBtn: Button;
	private customBtn: Button;

	public constructor() {
		super();
		this.skinName = skins.GameScene;
	}

	protected init() {
		this.startBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.start, this);
		this.changeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.pickRoom, this);

		var btnArr = [this.upBtn, this.downBtn, this.leftBtn, this.rightBtn];
		var dirArr = [Direction.UP, Direction.DOWN, Direction.LEFT, Direction.RIGHT];
		for (let i = 0; i < 4; i++) {
			let btn = btnArr[i];
			let dir = dirArr[i];
			btn.addEventListener(egret.TouchEvent.TOUCH_BEGIN, () => this.changeDir(dir), this);
			btn.addEventListener(egret.TouchEvent.TOUCH_END, this.cancelDir, this);
			btn.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.cancelDir, this);
		}

		this.catchBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.catch, this);

		this.catchData = new CatchData;
		this.bulletData = new BulletData;
		this.bulletData.user_id = PlayerDataManager.get(PlayerDataKey.ID);
		this.bulletData.username = PlayerDataManager.get(PlayerDataKey.NAME);
		this.bulletData.avtar = PlayerDataManager.get(PlayerDataKey.HEAD);

		this.infoBtn.setOnTap(() => {
			window["tdStatistics"]('点击抓娃娃信息', "点击");
			ViewManager.I.open(ViewName.DLG_TOY_INFO, this.roomId);
		});

		this.customBtn.setOnTap(() => {
			window["tdStatistics"]('客服ICON', "点击");
			ViewManager.I.open(ViewName.DLG_CUSTOM);
		});


		LocalDataManager.addDataListener(LocalDataKey.BULLET, value => {
			if (value) {
				this.bulletView.start(this.roomId);
			} else {
				this.bulletView.stop();
			}
		});
	}

	protected preOpen(room: number) {
		this.roomId = room;
		super.preOpen();
	}

	protected show() {
		GameConfig.ROOM = this;
		this.operateGroup.visible = false;
		this.startGroup.visible = true;
		this.startGroup.touchChildren = true;
		this.giftBtns.x = -5;
		var room = this.roomId;
		var roomData = DataManager.getRoom(room);
		
		this.cost.text = roomData.cost + "/次";
		this.price = roomData.cost;
		this.toyWorld.init();
		this.toyWorld.showToy(DataManager.getToysByRoom(room));

		this.gameTimer.visible = false;
		this.failHint.visible = false;
		this.luckyHint.visible = false;
		this.luckyBar.start(room);
		this.roomUsers.start(room);
		if (LocalDataManager.get(LocalDataKey.BULLET)) {
			this.bulletView.start(room);
		}
		this.tips.start();
		this.leftLamp.start();
		this.rightLamp.start();
	}

	public close() {
		super.close();
		this.toyWorld.end();
		this.roomUsers.stop();
		this.bulletView.stop();
		this.tips.stop();
		this.leftLamp.stop();
		this.rightLamp.stop();
	}

	public changeRoom(roomId: number) {
		// this.moveScene(ViewManager.I.open(ViewName.BACKUP, 22) as GameScene);
		this.moveScene(ViewManager.I.open(ViewName.BACKUP, roomId) as GameScene);
	}

	protected moveScene(scene: GameScene) {
		this.parent.addChild(scene);
		var off = this.front.width;
		scene.x = this.x + off;
		egret.Tween.get(this).to({ x: this.x - off }, 300).call(() => {
			this.close();
		});
		egret.Tween.get(scene).to({ x: this.x }, 300);
	}

	private start() {
		window["tdStatistics"]('点击开始游戏', "点击");
		if (PlayerDataManager.get(PlayerDataKey.COIN) < this.price) {
			window["tdStatistics"]('弹出充值弹框', "访问");
			ViewManager.I.open(ViewName.DLG_CHARGE);
			ViewManager.I.open(ViewName.POP_HINT, "金币不足，请前去充值！");
			return;
		}

		HttpManager.post(HttpCmd.CATCH_START, {
			user_id: PlayerDataManager.get(PlayerDataKey.ID),
			ufo_id: this.roomId
		}, ret => {
			var prize = ret.prize;
			this.catchData.catch = prize.catchedToy;
			this.catchData.catchId = parseInt(prize.prepareCatchId);
			this.catchData.lucky = prize.userLuckyScore;
			this.catchData.toyId = 0;
			this.catchData.catch_times = prize.catchTimes;
			PlayerDataManager.updateCoin();
			this.toOperate();
			this.toyWorld.start();
			this.gameTimer.start(20, this.catch.bind(this));
			SoundManager.I.playEffect("start_mp3");
		}, null, true);
	}

	public end() {
		this.bulletData.catch_times = this.catchData.catch_times;
		this.bulletData.toy_name = this.catchData.toyId > 0 ? DataManager.getToy(this.catchData.toyId).name : "娃娃";
		if (this.catchData.catch && this.catchData.toyId > 0) {
			this.luckyBar.setLucky(0);
			this.bulletView.addNotice(this.bulletData);
			ViewManager.I.open(ViewName.DLG_CATCH_TOY, this.catchData.toyId, this.catchData.catch_times);
			SoundManager.I.playEffect("suc_mp3");
		} else {
			this.failHint.show();
			var lucky = this.catchData.lucky;
			this.luckyHint.show(lucky >= 100, lucky - this.luckyBar.value);
			this.luckyBar.setLucky(lucky);
			this.bulletView.addBullet(this.bulletData);
		}
		this.toStart();
	}

	private toOperate() {
		this.hideTable(this.startGroup, () => {
			this.showTable(this.operateGroup);
		});

		egret.Tween.get(this.giftBtns).to({ x: -200 }, 500);
	}

	private toStart() {
		this.hideTable(this.operateGroup, () => {
			this.showTable(this.startGroup);
		});
		egret.Tween.get(this.giftBtns).to({ x: -5 }, 500);
	}

	private showTable(table: eui.Group, cb: Function = null) {
		table.visible = true;
		table.touchChildren = false;
		table.scaleY = 0;
		egret.Tween.get(table).to({ scaleY: 1 }, 250).call(() => {
			table.touchChildren = true;
			cb && cb();
		});
	}

	private hideTable(table: eui.Group, cb: Function = null) {
		table.touchChildren = false;
		egret.Tween.get(table).to({ scaleY: 0 }, 250).call(() => {
			table.visible = false;
			cb && cb();
		}, this);
	}

	private changeDir(dir: Direction) {
		this.toyWorld.setDirection(dir);
	}

	private cancelDir() {
		this.toyWorld.setDirection(null);
	}

	public catch() {
		this.gameTimer.stop();
		var target = this.toyWorld.startCatch();
		this.operateGroup.touchEnabled = false;
		this.toyWorld.setResult(this.catchData.catch && target != null);
		this.catchData.toyId = target ? target.id : 0;

		var data = {
			user_id: PlayerDataManager.get(PlayerDataKey.ID),
			ufo_id: this.roomId,
			prepareCatchId: this.catchData.catchId,
			toyId: this.catchData.toyId
		};
		if (target) {
			if (this.catchData.catch) {
				HttpManager.post(HttpCmd.CATCH_SUC, data);
			} else {
				HttpManager.post(HttpCmd.CATCH_FAIL, data);
			}
		} else {
			HttpManager.post(HttpCmd.CATCH_LOST, data);
		}
	}

	private pickRoom() {
		window["tdStatistics"]('点击换一台', "点击");
		ViewManager.I.open(ViewName.DLG_CHOOSE_ROOM, this.roomId);
	}
}