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
var BulletView = (function (_super) {
    __extends(BulletView, _super);
    function BulletView() {
        var _this = _super.call(this) || this;
        _this.noticeList = [];
        _this.bulletList = [];
        _this.interval = 30;
        if (BulletView.datas == null) {
            BulletView.datas = RES.getRes("bullet_json");
        }
        _this.addChild(_this.notice = new GameNotice());
        _this.notice.anchorOffsetX = _this.notice.width / 2;
        _this.notice.y = 10;
        _this.notice.visible = false;
        return _this;
    }
    BulletView.prototype.start = function (roomId) {
        this.visible = true;
        this.roomId = roomId;
        TimerManager.doTimer(200, 0, this.update, this);
    };
    BulletView.prototype.stop = function () {
        this.visible = false;
        TimerManager.remove(this.update, this);
    };
    BulletView.prototype.update = function () {
        var curTime = (new Date).getTime();
        var interval = this.interval;
        if (this.lastNotice == null || curTime - this.lastNotice > 2000) {
            for (var i = 0; i < this.noticeList.length; i++) {
                var data = this.noticeList[i];
                if (data.user_id == PlayerDataManager.get(PlayerDataKey.ID)) {
                    continue;
                }
                var t = (new Date(DateUtils.convertDate(data.created_at))).getTime();
                if (curTime - t >= interval * 1000) {
                    this.noticeList.splice(i, 1);
                    this.addNotice(data);
                    this.lastNotice = curTime;
                    break;
                }
            }
        }
        for (var i = 0; i < this.bulletList.length; i++) {
            var data = this.bulletList[i];
            if (data.user_id == PlayerDataManager.get(PlayerDataKey.ID)) {
                continue;
            }
            var t = (new Date(DateUtils.convertDate(data.created_at))).getTime();
            if (curTime - t >= interval * 1000) {
                this.bulletList.splice(i, 1);
                this.addBullet(data);
                break;
            }
        }
        this.checkList();
    };
    BulletView.prototype.addNotice = function (data) {
        var arr = BulletView.datas["suc"];
        this.notice.x = this.width / 2;
        var text;
        if (data.catch_times == null || data.catch_times > 10) {
            text = ArrayUtils.random(arr[0]);
        }
        else {
            text = arr[data.catch_times];
        }
        var textArr = text.split("s%");
        var textFlow = [
            { text: textArr[0], style: {} },
            { text: data.username, style: { "bold": true } },
            { text: textArr[1] + data.toy_name + textArr[2], style: {} }
        ];
        this.notice.show(data.avtar, textFlow);
    };
    BulletView.prototype.addBullet = function (data) {
        var arr = BulletView.datas["fail"];
        var text = ArrayUtils.random(arr);
        var textArr = text.split("s%");
        text = textArr[0] + data.username + textArr[1] + data.toy_name + textArr[2];
        var bullet = ObjectPool.pop("GameBullet");
        bullet.y = Math.random() * 200 + 30;
        this.addChildAt(bullet, 0);
        var off = 50;
        bullet.start(text, this.width + off, -off);
    };
    BulletView.prototype.checkList = function () {
        var _this = this;
        var curTime = (new Date).getTime();
        var interval = this.interval;
        if (this.lastTime == null || curTime - this.lastTime >= interval * 1000) {
            HttpManager.post(HttpCmd.BULLET_SUC, {
                sec_before: this.interval
            }, function (ret) {
                _this.noticeList = ret.list;
            });
            HttpManager.post(HttpCmd.BULLET_FAIL, {
                sec_before: this.interval,
                ufo_id: this.roomId
            }, function (ret) {
                _this.bulletList = ret.list;
            });
            this.lastTime = curTime;
        }
    };
    return BulletView;
}(eui.Component));
__reflect(BulletView.prototype, "BulletView");
//# sourceMappingURL=BulletView.js.map