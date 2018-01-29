/**
 *
 * 声音管理器
 *
 */
class SoundManager {
	private static _instance = null;

	private soundDic: { [name: string]: Array<any> } = {};
	private musicSound: egret.Sound;
	private music: egret.SoundChannel;
	private effectArr: Array<egret.SoundChannel> = [];
	private musicVolum: number;
	private effectVolum: number;
	private pausePoint: number;
	private pauseCnt: number = 0;
	private static MV: number = 0.4;
	private static EV: number = 1;

	public constructor() {
		var flag = LocalDataManager.get(LocalDataKey.SOUND);
		this.setMusicVolum(flag ? SoundManager.MV : 0);
		this.setEffectVolum(flag ? SoundManager.EV : 0);

		LocalDataManager.addDataListener(LocalDataKey.SOUND, (value) => {
			this.setMusicVolum(value ? SoundManager.MV : 0);
			this.setEffectVolum(value ? SoundManager.EV : 0);
		});
	}

	public static get I(): SoundManager {
		return this._instance || (this._instance = new SoundManager);
	}

    /**
     * 播放背景音乐
     */
	public playMusic(musciName: string): void {
		this.stopMusic();
		this.pausePoint = null;
		this.musicSound = this.getSound(musciName);
		if (!this.musicSound) {
			return;
		}
		this.musicSound.type = egret.Sound.MUSIC;
		this.music = this.musicSound.play(0, 0);
		this.music.volume = this.musicVolum;
	}

    /**
     * 暂停背景音乐
     */
	public pauseMusic() {
		if (this.music) {
			this.pausePoint = this.music.position;
			this.music.stop();
			this.music = null;
		}
	}

    /**
     * 恢复背景音乐
     */
	public resumeMusic() {
		if (this.musicSound) {
			var position = this.pausePoint || 0;
			this.music = this.musicSound.play(position);
			this.music.volume = this.musicVolum;
			this.pausePoint = null;
		}
	}

    /**
     * 停止背景音乐
     */
	public stopMusic(): void {
		if (this.music) {
			this.music.stop();
			this.music = null;
		}
	}

    /**
     * 播放音效
     * @param effectName
     */
	public playEffect(effectName: string, ignore: number = 0): egret.SoundChannel {
		var sound = this.getSound(effectName, ignore);
		if (!sound)
			return;
		sound.type = egret.Sound.EFFECT;
		var channel = sound.play(0, 1);
		channel.volume = this.effectVolum;
		this.effectArr.push(channel);
		channel.addEventListener(egret.Event.SOUND_COMPLETE, () => {
			this.removeEffect(channel);
		}, this);
		return channel;
	}

	public setMusicVolum(value: number) {
		this.musicVolum = value;
		if (this.music) {
			this.music.volume = value;
		}
	}

	public setEffectVolum(value: number) {
		this.effectVolum = value;
		for (let i = 0; i < this.effectArr.length; i++) {
			this.effectArr[i].volume = value;
		}
	}

	public removeEffect(channel: egret.SoundChannel) {
		ArrayUtils.remove(this.effectArr, channel);
	}

	private getSound(name: string, ignore: number = 0): egret.Sound {
		var arr = this.soundDic[name];
		var curTime = egret.getTimer();
		if (!arr) {
			var sound = RES.getRes(name);
			arr = [sound, curTime];
			this.soundDic[name] = arr;
		} else if (curTime - arr[1] < ignore) {
			return null;
		}
		arr[1] = curTime;
		return arr[0];
	}


	public pause() {
		this.pauseCnt += 1;

		this.setMusicVolum(0);
		this.setEffectVolum(0);
	}

	public resume() {
		this.pauseCnt -= 1;

		if (this.pauseCnt <= 0) {
			this.pauseCnt = 0;
			var volum = LocalDataManager.get(LocalDataKey.SOUND) ? 1 : 0;
			this.setMusicVolum(volum);
			this.setEffectVolum(volum);
		}
	}
}