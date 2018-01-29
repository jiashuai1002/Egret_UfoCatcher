class UIComponent extends eui.Component {
	public constructor() {
		super();
		this.once(egret.Event.ADDED_TO_STAGE, this.init, this);
	}

	protected init() {
		
	}
}