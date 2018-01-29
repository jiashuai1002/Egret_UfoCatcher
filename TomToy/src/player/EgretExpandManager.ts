/**
 *
 * 引擎扩展工具管理器
 *
 */
class EgretExpandManager {
	/**
     * 初始化函数
     */
    public static init(): void {
        AnchorUtils.init();
        TimerManager.init();
        StageUtils.stage.addEventListener(egret.Event.ACTIVATE, () => {
            TimerManager.setTimeScale(1);
            SoundManager.I.resume();
        }, this);
        StageUtils.stage.addEventListener(egret.Event.DEACTIVATE, () => {
            TimerManager.setTimeScale(0);
            SoundManager.I.pause();
        }, this);
    }
}