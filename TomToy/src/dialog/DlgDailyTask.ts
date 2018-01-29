class DlgDailyTask extends Dialog {
	private list: eui.List;
	private datas: Array<DailyTaskData>;
	private bar: eui.Image;
	private barMask: egret.Shape;
	private progress: eui.Label;
	private _score: number;

	public constructor() {
		super();
		this.skinName = skins.DlgDailyTask;
	}

	protected init() {
		super.init();
		this.bar.parent.addChild(this.barMask = new egret.Shape);
		var g = this.barMask.graphics;
		g.beginFill(0);
		g.drawRect(0, 0, this.bar.width, this.bar.height);
		g.endFill();
		this.barMask.y = this.bar.y;
		this.barMask.x = this.bar.x - this.bar.width;
		this.bar.mask = this.barMask;
		this.score = 0;
		this.list.cacheAsBitmap = true;
	}

	protected preOpen() {
		this.refresh(super.preOpen.bind(this));
	}

	private refresh(cb: Function = null) {
		HttpManager.post(HttpCmd.DAILY_TASK_LIST, { user_id: PlayerDataManager.get(PlayerDataKey.ID) }, ret => {
			var finished = ret.list.finished;
			var unfinished = ret.list.unfinished;
			var arr = [];
			var arr1 = [];
			var typeArr = [];
			for (var id in finished) {
				var data = finished[id];
				if (data.utl_status == 1) {
					data.status = 1;
					data.task_cat_id = data.utl_cat_id;
					arr1.push(data);
				} else if (typeArr.indexOf(data.utl_cat_id) < 0) {
					typeArr.push(data.utl_cat_id);
					data.status = 0;
					data.task_cat_id = data.utl_cat_id;
					arr.push(data);
				}
			}
			for (var id in unfinished) {
				var data = unfinished[id]
				if (typeArr.indexOf(data.task_cat_id) < 0) {
					typeArr.push(data.task_cat_id);
					data.status = -1;
					arr.push(data);
				}
			}
			this.datas = arr.concat(arr1);
			this.datas.forEach(data => {
				switch (data.task_cat_id) {
					case "1":
						data.progress = ret.list.userDailyCatchTimes + "/" + data["task_need_catch_times"];
						break;
					case "2":
						data.progress = ret.list.userDailyCatchedTimes + "/" + data["task_need_catch_times"];
						break;
					case "3":
						data.progress = ret.list.userDailyRecharge + "/" + data["task_need_recharge_money"];
						break;
				}
			})
			this.setScore(ret.list.userDailyScore);
			var collection = new eui.ArrayCollection(this.datas);
			this.list.dataProvider = collection;
			this.list.itemRenderer = DailyTaskItem;
			cb && cb();
		}, null, true);
	}

	protected show() {

	}

	public setScore(value: number) {
		var duration = 500;
		egret.Tween.removeTweens(this);
		egret.Tween.get(this).to({ score: value }, duration);
	}

	public get value() {
		return this.score;
	}

	private get score() {
		return this._score;
	}

	private set score(value: number) {
		this._score = value;
		this.progress.text = Math.floor(value) + "/100";
		this.barMask.x = this.bar.x + this.bar.width * (value / 100 - 1);
	}
}