var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *
 * 声音管理器
 *
 */
var SoundManager = (function () {
    function SoundManager() {
        var _this = this;
        this.soundDic = {};
        this.effectArr = [];
        this.pauseCnt = 0;
        var flag = LocalDataManager.get(LocalDataKey.SOUND);
        this.setMusicVolum(flag ? SoundManager.MV : 0);
        this.setEffectVolum(flag ? SoundManager.EV : 0);
        LocalDataManager.addDataListener(LocalDataKey.SOUND, function (value) {
            _this.setMusicVolum(value ? SoundManager.MV : 0);
            _this.setEffectVolum(value ? SoundManager.EV : 0);
        });
    }
    Object.defineProperty(SoundManager, "I", {
        get: function () {
            return this._instance || (this._instance = new SoundManager);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 播放背景音乐
     */
    SoundManager.prototype.playMusic = function (musciName) {
        this.stopMusic();
        this.pausePoint = null;
        this.musicSound = this.getSound(musciName);
        if (!this.musicSound) {
            return;
        }
        this.musicSound.type = egret.Sound.MUSIC;
        this.music = this.musicSound.play(0, 0);
        this.music.volume = this.musicVolum;
    };
    /**
     * 暂停背景音乐
     */
    SoundManager.prototype.pauseMusic = function () {
        if (this.music) {
            this.pausePoint = this.music.position;
            this.music.stop();
            this.music = null;
        }
    };
    /**
     * 恢复背景音乐
     */
    SoundManager.prototype.resumeMusic = function () {
        if (this.musicSound) {
            var position = this.pausePoint || 0;
            this.music = this.musicSound.play(position);
            this.music.volume = this.musicVolum;
            this.pausePoint = null;
        }
    };
    /**
     * 停止背景音乐
     */
    SoundManager.prototype.stopMusic = function () {
        if (this.music) {
            this.music.stop();
            this.music = null;
        }
    };
    /**
     * 播放音效
     * @param effectName
     */
    SoundManager.prototype.playEffect = function (effectName, ignore) {
        var _this = this;
        if (ignore === void 0) { ignore = 0; }
        var sound = this.getSound(effectName, ignore);
        if (!sound)
            return;
        sound.type = egret.Sound.EFFECT;
        var channel = sound.play(0, 1);
        channel.volume = this.effectVolum;
        this.effectArr.push(channel);
        channel.addEventListener(egret.Event.SOUND_COMPLETE, function () {
            _this.removeEffect(channel);
        }, this);
        return channel;
    };
    SoundManager.prototype.setMusicVolum = function (value) {
        this.musicVolum = value;
        if (this.music) {
            this.music.volume = value;
        }
    };
    SoundManager.prototype.setEffectVolum = function (value) {
        this.effectVolum = value;
        for (var i = 0; i < this.effectArr.length; i++) {
            this.effectArr[i].volume = value;
        }
    };
    SoundManager.prototype.removeEffect = function (channel) {
        ArrayUtils.remove(this.effectArr, channel);
    };
    SoundManager.prototype.getSound = function (name, ignore) {
        if (ignore === void 0) { ignore = 0; }
        var arr = this.soundDic[name];
        var curTime = egret.getTimer();
        if (!arr) {
            var sound = RES.getRes(name);
            arr = [sound, curTime];
            this.soundDic[name] = arr;
        }
        else if (curTime - arr[1] < ignore) {
            return null;
        }
        arr[1] = curTime;
        return arr[0];
    };
    SoundManager.prototype.pause = function () {
        this.pauseCnt += 1;
        this.setMusicVolum(0);
        this.setEffectVolum(0);
    };
    SoundManager.prototype.resume = function () {
        this.pauseCnt -= 1;
        if (this.pauseCnt <= 0) {
            this.pauseCnt = 0;
            var volum = LocalDataManager.get(LocalDataKey.SOUND) ? 1 : 0;
            this.setMusicVolum(volum);
            this.setEffectVolum(volum);
        }
    };
    SoundManager._instance = null;
    SoundManager.MV = 0.4;
    SoundManager.EV = 1;
    return SoundManager;
}());
__reflect(SoundManager.prototype, "SoundManager");
//# sourceMappingURL=SoundManager.js.map