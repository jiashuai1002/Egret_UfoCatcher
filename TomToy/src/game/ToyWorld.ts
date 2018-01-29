/**
 * @name [ToyWorld] 游戏世界
 */
class ToyWorld extends eui.Component {
	//游戏界面
	private game: GameScene;
	//游戏内物体列表
	private objects: Array<GameObject> = [];
	//爪子
	private hand: Hand;
	//娃娃列表
	private toyDic: { [idx: number]: Toy } = {};
	//游戏世界的状态
	private state: number;
	private speed: number;
	private direction: Direction;
	private curTime: number;
	private target: Toy;
	private targetRect: Rect;
	private result: number;
	private lostPos: number;
	private handLen: number;
	private maxSpeed = 0.2;
	//加速度
	private acc = 0.001;

	private lastEmoji: number;
	private moveSound: egret.SoundChannel;

	public constructor() {
		super();
	}

	protected createChildren() {
		this.addObj(this.hand = ObjectPool.pop("Hand"));
		this.hand.init();

		this.game = this.parent as GameScene;
	}

	public init() {
		this.hand.vx = -GameConfig.RANGE_X;
		this.hand.vy = 0;
		this.hand.vz = 600;
		this.clearToy();
		TimerManager.doTimer(5000, 0, this.showEmoji, this);
	}

	public showToy(list: Array<ToyData>) {
		for (let i = 0; i < list.length; i++) {
			let data = list[i];
			let toy = ObjectPool.pop("Toy") as Toy;
			toy.init(data);
			this.toyDic[data.idx] = toy;
			this.addObj(toy);
		}
		this.sortObjects();
	}

	public clearToy() {
		for (let idx in this.toyDic) {
			this.removeObj(this.toyDic[idx]);
		}
		this.toyDic = {};
	}

	private showEmoji() {
		var arr = [];
		for (let idx in this.toyDic) {
			arr.push(idx);
		}
		if (arr.length > 1 && arr.indexOf(this.lastEmoji) >= 0) {
			ArrayUtils.remove(arr, this.lastEmoji);
		}
		this.lastEmoji = ArrayUtils.random(arr);
		var doll = this.toyDic[this.lastEmoji];
		doll && doll.showEmoji(0);
	}

	public start() {
		this.state = 0;
		this.speed = 0;
		this.direction = null;
		TimerManager.doFrame(1, 0, this.update, this);
		TimerManager.remove(this.showEmoji, this);
		this.curTime = egret.getTimer();
	}

	public end() {
		TimerManager.remove(this.update, this);
		TimerManager.doTimer(5000, 0, this.showEmoji, this);
	}

	public setDirection(dir: Direction) {
		if (this.state != 0) return;
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
		} else {
			this.stopMoveSound();
		}
	}

	private playMoveSound() {
		this.moveSound && this.moveSound.stop();
		this.moveSound = SoundManager.I.playEffect("move_mp3", 1);
		this.moveSound.addEventListener(egret.Event.SOUND_COMPLETE, this.playMoveSound, this);
	}

	private stopMoveSound() {
		if (this.moveSound) {
			this.moveSound.removeEventListener(egret.Event.SOUND_COMPLETE, this.playMoveSound, this);
			this.moveSound.stop();
			SoundManager.I.removeEffect(this.moveSound);
		}
	}

	public startCatch(): Toy {
		if (this.state != 0) return;
		this.state = 1;
		this.sortObjects();
		var hand = this.hand;
		var min: number;
		var target: Toy;
		for (let idx in this.toyDic) {
			let toy = this.toyDic[idx];
			let dis = MathUtils.cacuDistance(hand.vx, hand.vy, toy.vx, toy.vy);
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
		} else {
			this.targetRect = null;
		}
		this.result = 0;
		this.moveHandDown();
		this.stopMoveSound();
		this.hand.stopShake();
		return this.target;
	}

	public setResult(suc: boolean) {
		this.result = suc ? 1 : -1;
		this.lostPos = Math.random() * 200 + 30;
	}

	private update() {
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

	}

	private move(t: number) {
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
				this.speed = Math.min(this.speed + this.acc * t, this.maxSpeed);;
				this.hand.vx += this.speed * t;
				break;
		}
		var rangeX = GameConfig.RANGE_X;
		var rangeY = GameConfig.RANGE_Y;
		this.hand.vx = Math.max(Math.min(rangeX, this.hand.vx), -rangeX);
		this.hand.vy = Math.max(Math.min(rangeY, this.hand.vy), -rangeY);
	}

	private moveHandDown() {
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
		this.hand.changeLength(this.handLen, () => {
			this.state = 2;
			this.hand.shrink();
			window["t"] = this.target;
		});
	}

	private moveHandUp() {
		if (this.target) {
			this.target.showEmoji(2);
		}

		this.hand.changeLength(0, () => {
			if (this.target && this.result <= 0) {
				this.lostDoll();
			}
			this.toAward();
		});
	}

	private lostDoll() {
		this.hand.shrink();
		var target = this.target;
		SoundManager.I.playEffect("fail_mp3");
		egret.setTimeout(() => {
			target.homing();
			target.showEmoji(1);
		}, this, 60);
		this.target = null;
	}

	private toAward() {
		this.state = 4;
		var rx = -GameConfig.RANGE_X;
		var ry = GameConfig.RANGE_Y;
		var d = Math.max(Math.abs(rx * 0.9 - this.hand.vx) * 5, Math.abs(ry * 0.9 - this.hand.vy) * 5);
		egret.Tween.get(this.hand).to({ vx: rx * 0.9, vy: ry * 0.9 }, d).call(() => {
			this.state = 5;
			this.hand.spread();
			if (this.target) {
				this.getAward();
			}
		}).wait(600).call(() => {
			this.end();
			this.game.end();
		}).to({ vx: rx, vy: 0 }, 600);
	}

	private getAward() {
		this.game.awardCon.addChild(this.target);
		var duration = Math.sqrt(this.target.vz) * 50;
		egret.Tween.get(this.target).to({ vz: 0 }, duration, egret.Ease.quadIn)
			.to({ alpha: 0 }, 300)
			.call(() => {
				this.target.alpha = 0;
				this.removeObj(this.target);
			});
	}

	private addObj(obj: GameObject) {
		obj.addTo(this);
		this.objects.push(obj);
	}

	private removeObj(obj: GameObject) {
		ArrayUtils.remove(this.objects, obj);
		obj.destroy();
		ObjectPool.push(obj);
	}

	private sortObjects() {
		this.objects.sort(this.sort);
		this.objects.forEach(obj => {
			this.setChildIndex(obj, this.numChildren + 1);
		});
	}

	private sort(a: GameObject, b: GameObject): number {
		return a.vy - b.vy;
	}
}