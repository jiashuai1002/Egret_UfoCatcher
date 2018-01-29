class BulletView extends eui.Component {
    private static datas: any;
    private noticeList: Array<BulletData> = [];
    private bulletList: Array<BulletData> = [];
    private interval = 30;
    private roomId: number;
    private lastTime: number;
    private notice: GameNotice;
    private lastNotice: number;

    public constructor() {
        super();

        if (BulletView.datas == null) {
            BulletView.datas = RES.getRes("bullet_json");
        }

        this.addChild(this.notice = new GameNotice());
        this.notice.anchorOffsetX = this.notice.width / 2;
        this.notice.y = 10;

        this.notice.visible = false;
    }

    public start(roomId: number) {
        this.visible = true;
        this.roomId = roomId;
        TimerManager.doTimer(200, 0, this.update, this);
    }

    public stop() {
        this.visible = false;
        TimerManager.remove(this.update, this);
    }

    private update() {
        var curTime = (new Date).getTime();
        var interval = this.interval;
        if (this.lastNotice == null || curTime - this.lastNotice > 2000) {
            for (let i = 0; i < this.noticeList.length; i++) {
				let data = this.noticeList[i];
				if (data.user_id == PlayerDataManager.get(PlayerDataKey.ID)) {
					continue;
				}
				let t = (new Date(DateUtils.convertDate(data.created_at))).getTime();
				if (curTime - t >= interval * 1000) {
					this.noticeList.splice(i, 1);
					this.addNotice(data);
					this.lastNotice = curTime;
					break;
				}
			}
        }
        for (let i = 0; i < this.bulletList.length; i++) {
			let data = this.bulletList[i];
			if (data.user_id == PlayerDataManager.get(PlayerDataKey.ID)) {
				continue;
			}
			let t = (new Date(DateUtils.convertDate(data.created_at))).getTime();
			if (curTime - t >= interval * 1000) {
				this.bulletList.splice(i, 1);
				this.addBullet(data);
				break;
			}
		}
        this.checkList();
    }

    public addNotice(data: BulletData) {
        var arr = BulletView.datas["suc"];
        this.notice.x = this.width / 2;
        var text: string;
        if (data.catch_times == null || data.catch_times > 10) {
            text = ArrayUtils.random(arr[0]);
        } else {
            text = arr[data.catch_times];
        }
        var textArr = text.split("s%");
        var textFlow = <Array<egret.ITextElement>>[
            { text: textArr[0], style: {} },
            { text: data.username, style: { "bold": true } },
            { text: textArr[1] + data.toy_name + textArr[2], style: {} }
        ]
        this.notice.show(data.avtar, textFlow);
    }

    public addBullet(data: BulletData) {
        var arr = BulletView.datas["fail"];
        var text = ArrayUtils.random(arr);
        var textArr = text.split("s%");
        text = textArr[0] + data.username + textArr[1] + data.toy_name + textArr[2];
        var bullet = ObjectPool.pop("GameBullet") as GameBullet;
        bullet.y = Math.random() * 200 + 30;
        this.addChildAt(bullet, 0);
        var off = 50;
        bullet.start(text, this.width + off, - off);
    }

    private checkList() {
        var curTime = (new Date).getTime();
		var interval = this.interval;
		if (this.lastTime == null || curTime - this.lastTime >= interval * 1000) {
			 HttpManager.post(HttpCmd.BULLET_SUC, {
                sec_before: this.interval
            }, ret => {
                this.noticeList = ret.list;
            });
            HttpManager.post(HttpCmd.BULLET_FAIL, {
                sec_before: this.interval,
                ufo_id: this.roomId
            }, ret => {
                this.bulletList = ret.list;
            });
			this.lastTime = curTime;
		}
    }
}