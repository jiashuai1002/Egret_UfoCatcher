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
var DailyTaskItem = (function (_super) {
    __extends(DailyTaskItem, _super);
    function DailyTaskItem() {
        var _this = _super.call(this) || this;
        _this.skinName = skins.DailyTaskItem;
        _this.cacheAsBitmap = true;
        _this.once(egret.Event.ADDED_TO_STAGE, _this.init, _this);
        return _this;
    }
    DailyTaskItem.prototype.init = function () {
        this.drawBtn.setOnTap(this.draw.bind(this));
    };
    DailyTaskItem.prototype.dataChanged = function () {
        var data = this.data;
        this.taskName.text = data.task_title;
        this.desc.text = "奖励：金币×" + parseInt(data.task_bonus_coin) + " 任务积分×" + parseInt(data.task_bonus_score);
        this.drawBtn.visible = false;
        this.finished.visible = false;
        this.unFinished.visible = false;
        switch (data.status) {
            case -1:
                this.unFinished.visible = true;
                break;
            case 0:
                this.drawBtn.visible = true;
                break;
            case 1:
                this.finished.visible = true;
                break;
        }
        if (data.status <= 0) {
            this.taskName.textFlow = [
                { text: data.task_title + "(", style: {} },
                { text: data.progress, style: { "textColor": 0x40a904 } },
                { text: ")", style: {} }
            ];
        }
    };
    DailyTaskItem.prototype.draw = function () {
        console.log(this.data.task_id);
        console.log(PlayerDataManager.get(PlayerDataKey.ID));
        console.log(this.data.task_cat_id);
        HttpManager.post(HttpCmd.DAILY_TASK_RECEIVE, {
            task_id: this.data.task_id,
            user_id: PlayerDataManager.get(PlayerDataKey.ID),
            category_id: this.data.task_cat_id
        }, function (ret) {
            if (ret.mission.toyId > 0) {
                ViewManager.I.open(ViewName.POP_ALERT, "获得一个神秘娃娃，去背包看一看吧！", "前往", function () {
                    ViewManager.I.open(ViewName.DLG_BAG);
                });
            }
            PlayerDataManager.updateCoin();
            ViewManager.I.doFunc(ViewName.DLG_DAILY_TASK, "refresh");
        }, null, true);
    };
    return DailyTaskItem;
}(eui.ItemRenderer));
__reflect(DailyTaskItem.prototype, "DailyTaskItem");
