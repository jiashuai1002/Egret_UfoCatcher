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
/**
 * 游戏界面
 */
var GameScene = (function (_super) {
    __extends(GameScene, _super);
    function GameScene() {
        var _this = _super.call(this) || this;
        _this.skinName = skins.GameScene;
        return _this;
    }
    GameScene.prototype.init = function () {
        var _this = this;
        this.startBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.start, this);
        this.changeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.pickRoom, this);
        var btnArr = [this.upBtn, this.downBtn, this.leftBtn, this.rightBtn];
        var dirArr = [Direction.UP, Direction.DOWN, Direction.LEFT, Direction.RIGHT];
        var _loop_1 = function (i) {
            var btn = btnArr[i];
            var dir = dirArr[i];
            btn.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function () { return _this.changeDir(dir); }, this_1);
            btn.addEventListener(egret.TouchEvent.TOUCH_END, this_1.cancelDir, this_1);
            btn.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this_1.cancelDir, this_1);
        };
        var this_1 = this;
        for (var i = 0; i < 4; i++) {
            _loop_1(i);
        }
        this.catchBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.catch, this);
        this.catchData = new CatchData;
        this.bulletData = new BulletData;
        this.bulletData.user_id = PlayerDataManager.get(PlayerDataKey.ID);
        this.bulletData.username = PlayerDataManager.get(PlayerDataKey.NAME);
        this.bulletData.avtar = PlayerDataManager.get(PlayerDataKey.HEAD);
        this.infoBtn.setOnTap(function () {
            window["tdStatistics"]('点击抓娃娃信息', "点击");
            ViewManager.I.open(ViewName.DLG_TOY_INFO, _this.roomId);
        });
        this.customBtn.setOnTap(function () {
            window["tdStatistics"]('客服ICON', "点击");
            ViewManager.I.open(ViewName.DLG_CUSTOM);
        });
        LocalDataManager.addDataListener(LocalDataKey.BULLET, function (value) {
            if (value) {
                _this.bulletView.start(_this.roomId);
            }
            else {
                _this.bulletView.stop();
            }
        });
    };
    GameScene.prototype.preOpen = function (room) {
        this.roomId = room;
        _super.prototype.preOpen.call(this);
    };
    GameScene.prototype.show = function () {
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
    };
    GameScene.prototype.close = function () {
        _super.prototype.close.call(this);
        this.toyWorld.end();
        this.roomUsers.stop();
        this.bulletView.stop();
        this.tips.stop();
        this.leftLamp.stop();
        this.rightLamp.stop();
    };
    GameScene.prototype.changeRoom = function (roomId) {
        // this.moveScene(ViewManager.I.open(ViewName.BACKUP, 22) as GameScene);
        this.moveScene(ViewManager.I.open(ViewName.BACKUP, roomId));
    };
    GameScene.prototype.moveScene = function (scene) {
        var _this = this;
        this.parent.addChild(scene);
        var off = this.front.width;
        scene.x = this.x + off;
        egret.Tween.get(this).to({ x: this.x - off }, 300).call(function () {
            _this.close();
        });
        egret.Tween.get(scene).to({ x: this.x }, 300);
    };
    GameScene.prototype.start = function () {
        var _this = this;
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
        }, function (ret) {
            var prize = ret.prize;
            _this.catchData.catch = prize.catchedToy;
            _this.catchData.catchId = parseInt(prize.prepareCatchId);
            _this.catchData.lucky = prize.userLuckyScore;
            _this.catchData.toyId = 0;
            _this.catchData.catch_times = prize.catchTimes;
            PlayerDataManager.updateCoin();
            _this.toOperate();
            _this.toyWorld.start();
            _this.gameTimer.start(20, _this.catch.bind(_this));
            SoundManager.I.playEffect("start_mp3");
        }, null, true);
    };
    GameScene.prototype.end = function () {
        this.bulletData.catch_times = this.catchData.catch_times;
        this.bulletData.toy_name = this.catchData.toyId > 0 ? DataManager.getToy(this.catchData.toyId).name : "娃娃";
        if (this.catchData.catch && this.catchData.toyId > 0) {
            this.luckyBar.setLucky(0);
            this.bulletView.addNotice(this.bulletData);
            ViewManager.I.open(ViewName.DLG_CATCH_TOY, this.catchData.toyId, this.catchData.catch_times);
            SoundManager.I.playEffect("suc_mp3");
        }
        else {
            this.failHint.show();
            var lucky = this.catchData.lucky;
            this.luckyHint.show(lucky >= 100, lucky - this.luckyBar.value);
            this.luckyBar.setLucky(lucky);
            this.bulletView.addBullet(this.bulletData);
        }
        this.toStart();
    };
    GameScene.prototype.toOperate = function () {
        var _this = this;
        this.hideTable(this.startGroup, function () {
            _this.showTable(_this.operateGroup);
        });
        egret.Tween.get(this.giftBtns).to({ x: -200 }, 500);
    };
    GameScene.prototype.toStart = function () {
        var _this = this;
        this.hideTable(this.operateGroup, function () {
            _this.showTable(_this.startGroup);
        });
        egret.Tween.get(this.giftBtns).to({ x: -5 }, 500);
    };
    GameScene.prototype.showTable = function (table, cb) {
        if (cb === void 0) { cb = null; }
        table.visible = true;
        table.touchChildren = false;
        table.scaleY = 0;
        egret.Tween.get(table).to({ scaleY: 1 }, 250).call(function () {
            table.touchChildren = true;
            cb && cb();
        });
    };
    GameScene.prototype.hideTable = function (table, cb) {
        if (cb === void 0) { cb = null; }
        table.touchChildren = false;
        egret.Tween.get(table).to({ scaleY: 0 }, 250).call(function () {
            table.visible = false;
            cb && cb();
        }, this);
    };
    GameScene.prototype.changeDir = function (dir) {
        this.toyWorld.setDirection(dir);
    };
    GameScene.prototype.cancelDir = function () {
        this.toyWorld.setDirection(null);
    };
    GameScene.prototype.catch = function () {
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
            }
            else {
                HttpManager.post(HttpCmd.CATCH_FAIL, data);
            }
        }
        else {
            HttpManager.post(HttpCmd.CATCH_LOST, data);
        }
    };
    GameScene.prototype.pickRoom = function () {
        window["tdStatistics"]('点击换一台', "点击");
        ViewManager.I.open(ViewName.DLG_CHOOSE_ROOM, this.roomId);
    };
    return GameScene;
}(Scene));
__reflect(GameScene.prototype, "GameScene");
//# sourceMappingURL=GameScene.js.map