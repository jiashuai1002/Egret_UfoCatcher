class Button extends eui.Button {
	private callBack: Function;
	private terms: Array<Function>;
	private canTouch: boolean;

	public constructor() {
		super();
		this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this);
		this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBegin, this);
		this.addEventListener(egret.TouchEvent.TOUCH_END, this.touchEnd, this);
		this.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.touchEnd, this);
		this.touchEnabled = true;

		this.terms = [];
		this.callBack = null;
		this.canTouch = true;
	}

	private touchBegin() {
		egret.Tween.get(this).to({ scaleX: 0.9, scaleY: 0.9 }, 80, egret.Ease.quadOut);
	}

	private touchEnd() {
		egret.Tween.get(this).to({ scaleX: 1, scaleY: 1 }, 80, egret.Ease.quadOut)
			.call(() => {
				this.canTouch = true;
			});
	}

	private onTap(e) {
		if (!this.canTouch) return;
		this.canTouch = false;
		for (var i = 0; i < this.terms.length; i++) {
			if (!this.terms[i]) {
				return;
			}
		}
		if (this.callBack) {
			this.callBack(e);
		}
	}

	public addTerm(func: Function) {
		this.terms.push(func);
	}

	public setOnTap(callBack: Function) {
		this.callBack = callBack;
	}
}