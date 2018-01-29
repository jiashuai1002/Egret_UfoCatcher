class GameNotice extends UIComponent {
	private head: Head;
	private bg: eui.Image;
	private content: eui.Label;

	public constructor() {
		super();
		this.skinName = skins.GameNotice;
	}

	public show(head: string, textFlow: Array<egret.ITextElement>) {
		this.visible = true;
		egret.Tween.removeTweens(this.bg);
		this.head.setImage(head);
		this.head.visible = false;
		this.content.textFlow = textFlow;
		this.content.visible = false;
		this.bg.width = 0;
		egret.Tween.get(this.bg).to({ width: 508 }, 300).call(() => {
			this.content.visible = true;
			this.head.visible = true;
		}).wait(5000).call(() => {
			this.visible = false;
		});
	}
}