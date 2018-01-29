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
 * @name [ToyWorld] 游戏世界
 */
var ToyWorld = (function (_super) {
    __extends(ToyWorld, _super);
    function ToyWorld() {
        var _this = _super.call(this) || this;
        //游戏内物体列表
        _this.objects = [];
        //娃娃列表
        _this.toyDic = {};
        _this.maxSpeed = 0.2;
        //加速度
        _this.acc = 0.001;
        return _this;
    }
    ToyWorld.prototype.createChildren = function () {
        this.addObj(this.hand = ObjectPool.pop("Hand"));
        this.hand.init();
        this.game = this.parent;
    };
    ToyWorld.prototype.init = function () {
        this.hand.vx = -GameConfig.RANGE_X;
        this.hand.vy = 0;
        this.hand.vz = 600;
        this.clearToy();
        TimerManager.doTimer(5000, 0, this.showEmoji, this);
    };
    ToyWorld.prototype.showToy = function (list) {
        for (var i = 0; i < list.length; i++) {
            var data = list[i];
            var toy = ObjectPool.pop("Toy");
            toy.init(data);
            this.toyDic[data.idx] = toy;
            this.addObj(toy);
        }
        this.sortObjects();
    };
    ToyWorld.prototype.clearToy = function () {
        for (var idx in this.toyDic) {
            this.removeObj(this.toyDic[idx]);
        }
        this.toyDic = {};
    };
    ToyWorld.prototype.showEmoji = function () {
        var arr = [];
        for (var idx in this.toyDic) {
            arr.push(idx);
        }
        if (arr.length > 1 && arr.indexOf(this.lastEmoji) >= 0) {
            ArrayUtils.remove(arr, this.lastEmoji);
        }
        this.lastEmoji = ArrayUtils.random(arr);
        var doll = this.toyDic[this.lastEmoji];
        doll && doll.showEmoji(0);
    };
    ToyWorld.prototype.start = function () {
        this.state = 0;
        this.speed = 0;
        this.direction = null;
        TimerManager.doFrame(1, 0, this.update, this);
        TimerManager.remove(this.showEmoji, this);
        this.curTime = egret.getTimer();
    };
    ToyWorld.prototype.end = function () {
        TimerManager.remove(this.update, this);
        TimerManager.doTimer(5000, 0, this.showEmoji, this);
    };
    ToyWorld.prototype.setDirection = function (dir) {
        if (this.state != 0)
            return;
        this.direction = dir;
        switch (dir) {
            case Direction.UP:
            case Direction.DOWN:
                break;
            case Direction.LEFT:
                this.hand.shake(-1);
                break;
            case Direction.RIGHT:
                this.hand.shake(1);
                break;
            default:
                this.speed = 0;
                this.hand.stopShake();
                break;
        }
        if (dir) {
            this.playMoveSound();
        }
        else {
            this.stopMoveSound();
        }
    };
    ToyWorld.prototype.playMoveSound = function () {
        this.moveSound && this.moveSound.stop();
        this.moveSound = SoundManager.I.playEffect("move_mp3", 1);
        this.moveSound.addEventListener(egret.Event.SOUND_COMPLETE, this.playMoveSound, this);
    };
    ToyWorld.prototype.stopMoveSound = function () {
        if (this.moveSound) {
            this.moveSound.removeEventListener(egret.Event.SOUND_COMPLETE, this.playMoveSound, this);
            this.moveSound.stop();
            SoundManager.I.removeEffect(this.moveSound);
        }
    };
    ToyWorld.prototype.startCatch = function () {
        if (this.state != 0)
            return;
        this.state = 1;
        this.sortObjects();
        var hand = this.hand;
        var min;
        var target;
        for (var idx in this.toyDic) {
            var toy = this.toyDic[idx];
            var dis = MathUtils.cacuDistance(hand.vx, hand.vy, toy.vx, toy.vy);
            if (min == null || dis < min) {
                target = toy;
                min = dis;
            }
        }
        if (target && (Math.abs(hand.vx - target.vx) > 50 || Math.abs(hand.vy - target.vy) > 30)) {
            target = null;
        }
        this.target = target;
        if (target) {
            var bounds = target.getBounds();
            var point = target.localToGlobal();
            var w = target.vw;
            var h = target.vh;
            var offX = (bounds.width - w) / 2;
            var offY = bounds.height - h;
            this.targetRect = new Rect(point.x + bounds.x + offX, point.y + bounds.y + offY, w, h);
            // 开启娃娃碰撞检测图像校准
            // var s = new egret.Shape;
            // var g = s.graphics;
            // g.beginFill(0xff0000, 0.5)
            // g.drawRect(point.x + bounds.x + offX, point.y + bounds.y + offY, w, h);
            // StageUtils.stage.addChild(s);
        }
        else {
            this.targetRect = null;
        }
        this.result = 0;
        this.moveHandDown();
        this.stopMoveSound();
        this.hand.stopShake();
        return this.target;
    };
    ToyWorld.prototype.setResult = function (suc) {
        this.result = suc ? 1 : -1;
        this.lostPos = Math.random() * 200 + 30;
    };
    ToyWorld.prototype.update = function () {
        var cur = egret.getTimer();
        var t = cur - this.curTime;
        this.curTime = cur;
        switch (this.state) {
            case 0:
                if (this.direction) {
                    this.move(t);
                }
                break;
            case 2:
                if (this.hand.checkHit(this.targetRect)) {
                    this.state = 3;
                    if (this.target) {
                        this.hand.redress();
                    }
                    this.moveHandUp();
                }
                break;
            case 3:
                if (this.target) {
                    var addx = Math.max(Math.min(1, this.hand.vx - this.target.vx), -1);
                    this.target.vx += addx;
                    this.target.vz = (this.handLen - this.hand.length) * this.hand.scaleY;
                    if (this.result == -1 && this.target.vz >= this.lostPos) {
                        this.lostDoll();
                    }
                }
                break;
            case 4:
                if (this.target) {
                    this.target.vx = this.hand.vx;
                    var addy = this.hand.vy - this.target.vy;
                    var s1 = this.target.scaleY;
                    this.target.vy += addy;
                    var s2 = this.target.scaleY;
                    this.target.vz += addy - (s2 - s1) * (this.target.getBounds().height + this.hand.getBounds().height * 0.7);
                }
                break;
        }
    };
    ToyWorld.prototype.move = function (t) {
        switch (this.direction) {
            case Direction.UP:
                this.hand.vy -= t * 0.15;
                break;
            case Direction.DOWN:
                this.hand.vy += t * 0.15;
                break;
            case Direction.LEFT:
                this.speed = Math.max(this.speed - this.acc * t, -this.maxSpeed);
                this.hand.vx += this.speed * t;
                break;
            case Direction.RIGHT:
                this.speed = Math.min(this.speed + this.acc * t, this.maxSpeed);
                ;
                this.hand.vx += this.speed * t;
                break;
        }
        var rangeX = GameConfig.RANGE_X;
        var rangeY = GameConfig.RANGE_Y;
        this.hand.vx = Math.max(Math.min(rangeX, this.hand.vx), -rangeX);
        this.hand.vy = Math.max(Math.min(rangeY, this.hand.vy), -rangeY);
    };
    ToyWorld.prototype.moveHandDown = function () {
        var _this = this;
        var y = this.hand.vy;
        if (this.target) {
            y = this.target.vy;
            var idx0 = this.getChildIndex(this.target);
            var idx1 = this.getChildIndex(this.hand);
            if (idx1 > idx0) {
                this.setChildIndex(this.hand, idx0);
            }
        }
        var ini = GameConfig.INI_SCALE;
        var add = 390 - (this.target ? this.target.vh : 130);
        this.handLen = (y - (this.hand.scaleY - ini) * 270 + add) * ini / this.hand.scaleY;
        this.hand.changeLength(this.handLen, function () {
            _this.state = 2;
            _this.hand.shrink();
            window["t"] = _this.target;
        });
    };
    ToyWorld.prototype.moveHandUp = function () {
        var _this = this;
        if (this.target) {
            this.target.showEmoji(2);
        }
        this.hand.changeLength(0, function () {
            if (_this.target && _this.result <= 0) {
                _this.lostDoll();
            }
            _this.toAward();
        });
    };
    ToyWorld.prototype.lostDoll = function () {
        this.hand.shrink();
        var target = this.target;
        SoundManager.I.playEffect("fail_mp3");
        egret.setTimeout(function () {
            target.homing();
            target.showEmoji(1);
        }, this, 60);
        this.target = null;
    };
    ToyWorld.prototype.toAward = function () {
        var _this = this;
        this.state = 4;
        var rx = -GameConfig.RANGE_X;
        var ry = GameConfig.RANGE_Y;
        var d = Math.max(Math.abs(rx * 0.9 - this.hand.vx) * 5, Math.abs(ry * 0.9 - this.hand.vy) * 5);
        egret.Tween.get(this.hand).to({ vx: rx * 0.9, vy: ry * 0.9 }, d).call(function () {
            _this.state = 5;
            _this.hand.spread();
            if (_this.target) {
                _this.getAward();
            }
        }).wait(600).call(function () {
            _this.end();
            _this.game.end();
        }).to({ vx: rx, vy: 0 }, 600);
    };
    ToyWorld.prototype.getAward = function () {
        var _this = this;
        this.game.awardCon.addChild(this.target);
        var duration = Math.sqrt(this.target.vz) * 50;
        egret.Tween.get(this.target).to({ vz: 0 }, duration, egret.Ease.quadIn)
            .to({ alpha: 0 }, 300)
            .call(function () {
            _this.target.alpha = 0;
            _this.removeObj(_this.target);
        });
    };
    ToyWorld.prototype.addObj = function (obj) {
        obj.addTo(this);
        this.objects.push(obj);
    };
    ToyWorld.prototype.removeObj = function (obj) {
        ArrayUtils.remove(this.objects, obj);
        obj.destroy();
        ObjectPool.push(obj);
    };
    ToyWorld.prototype.sortObjects = function () {
        var _this = this;
        this.objects.sort(this.sort);
        this.objects.forEach(function (obj) {
            _this.setChildIndex(obj, _this.numChildren + 1);
        });
    };
    ToyWorld.prototype.sort = function (a, b) {
        return a.vy - b.vy;
    };
    return ToyWorld;
}(eui.Component));
__reflect(ToyWorld.prototype, "ToyWorld");
//# sourceMappingURL=ToyWorld.js.map