class BackupScene extends GameScene {
	public constructor() {
		super();
	}

	public changeRoom(roomId: number) {
		// this.moveScene(ViewManager.I.open(ViewName.GAME, 22) as GameScene);
		this.moveScene(ViewManager.I.open(ViewName.GAME, roomId) as GameScene);
	}
}