var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var DlgDailyTask = (function (_super) {
    __extends(DlgDailyTask, _super);
    function DlgDailyTask() {
        var _this = _super.call(this) || this;
        _this.skinName = skins.DlgDailyTask;
        return _this;
    }
    DlgDailyTask.prototype.init = function () {
        _super.prototype.init.call(this);
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
    };
    DlgDailyTask.prototype.preOpen = function () {
        this.refresh(_super.prototype.preOpen.bind(this));
    };
    DlgDailyTask.prototype.refresh = function (cb) {
        var _this = this;
        if (cb === void 0) { cb = null; }
        HttpManager.post(HttpCmd.DAILY_TASK_LIST, { user_id: PlayerDataManager.get(PlayerDataKey.ID) }, function (ret) {
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
                }
                else if (typeArr.indexOf(data.utl_cat_id) < 0) {
                    typeArr.push(data.utl_cat_id);
                    data.status = 0;
                    data.task_cat_id = data.utl_cat_id;
                    arr.push(data);
                }
            }
            for (var id in unfinished) {
                var data = unfinished[id];
                if (typeArr.indexOf(data.task_cat_id) < 0) {
                    typeArr.push(data.task_cat_id);
                    data.status = -1;
                    arr.push(data);
                }
            }
            _this.datas = arr.concat(arr1);
            _this.datas.forEach(function (data) {
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
            });
            _this.setScore(ret.list.userDailyScore);
            var collection = new eui.ArrayCollection(_this.datas);
            _this.list.dataProvider = collection;
            _this.list.itemRenderer = DailyTaskItem;
            cb && cb();
        }, null, true);
    };
    DlgDailyTask.prototype.show = function () {
    };
    DlgDailyTask.prototype.setScore = function (value) {
        var duration = 500;
        egret.Tween.removeTweens(this);
        egret.Tween.get(this).to({ score: value }, duration);
    };
    Object.defineProperty(DlgDailyTask.prototype, "value", {
        get: function () {
            return this.score;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DlgDailyTask.prototype, "score", {
        get: function () {
            return this._score;
        },
        set: function (value) {
            this._score = value;
            this.progress.text = Math.floor(value) + "/100";
            this.barMask.x = this.bar.x + this.bar.width * (value / 100 - 1);
        },
        enumerable: true,
        configurable: true
    });
    return DlgDailyTask;
}(Dialog));
__reflect(DlgDailyTask.prototype, "DlgDailyTask");
