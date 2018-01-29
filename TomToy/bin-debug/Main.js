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
 * 初始界面
 */
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Main.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        DisplayUtils.removeFromParent(this);
        EgretExpandManager.init();
        //注入自定义的素材解析器
        var assetAdapter = new AssetAdapter();
        egret.registerImplementation("eui.IAssetAdapter", assetAdapter);
        egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());
        //初始化Resource资源加载库
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/");
        this.state = 0;
    };
    /**
     * 配置文件加载完成,开始预加载皮肤主题资源和preload资源组。
     */
    Main.prototype.onConfigComplete = function (event) {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
        var theme = new eui.Theme("resource/default.thm.json", StageUtils.stage);
        theme.once(eui.UIEvent.COMPLETE, this.onThemeLoadComplete, this);
    };
    /**
     * 主题文件加载完成,开始预加载
     */
    Main.prototype.onThemeLoadComplete = function () {
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.loadGroup("loading");
    };
    /**
     * 加载资源完成
     */
    Main.prototype.onResourceLoadComplete = function (event) {
        if (event.groupName == "loading") {
            var userId = window["getParam"]("user_id");
            if (userId != null) {
                LocalDataManager.set(LocalDataKey.ID, userId);
            }
            else {
                userId = LocalDataManager.get(LocalDataKey.ID);
            }
            if (userId) {
                this.loadingScene = ViewManager.I.open(ViewName.LOADING);
                RES.loadGroup("preload");
                this.loadData();
            }
            else {
                ViewManager.I.open(ViewName.LOGIN);
            }
        }
        else if (event.groupName == "preload") {
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            WxPlatform.preLoad();
            this.nextState();
            StageUtils.stage.once(egret.TouchEvent.TOUCH_TAP, function () {
                SoundManager.I.playMusic("music_mp3");
            }, this);
        }
    };
    /**
     * 加载资源进度
     */
    Main.prototype.onResourceProgress = function (event) {
        if (event.groupName == "preload") {
            this.loadingScene && this.loadingScene.setProgress(event.itemsLoaded / event.itemsTotal);
        }
    };
    /**
     * 加载数据
     */
    Main.prototype.loadData = function () {
        var _this = this;
        TDAPP.onEvent('进入到加载页', "访问");
        var user_id = LocalDataManager.get(LocalDataKey.ID);
        var cnt = 4;
        var check = function () {
            cnt -= 1;
            if (cnt == 0) {
                DataManager.initRoomToys();
                _this.nextState();
            }
        };
        HttpManager.post(HttpCmd.ROOM_LIST, null, function (ret) {
            DataManager.initRoom(ret.ufos);
            var randomNum = parseInt(ret.ufos.length * Math.random());
            _this.iRoomNum = ret.ufos[randomNum].uc_id || 1;
            check();
        }, null, true);
        HttpManager.post(HttpCmd.TOY_LIST, null, function (ret) {
            console.log("all Toys", ret);
            DataManager.initToy(ret.toys);
            check();
        }, null, true);
        HttpManager.post(HttpCmd.USER, { user_id: user_id }, function (ret) {
            console.log(ret);
            if (ret.result.return_code != 0) {
                console.log("呼出登录面板");
                ViewManager.I.open(ViewName.LOGIN);
            }
            else {
                var user = ret.result.user;
                PlayerDataManager.set(PlayerDataKey.ID, user.user_id);
                PlayerDataManager.set(PlayerDataKey.NAME, user.nickname);
                PlayerDataManager.set(PlayerDataKey.HEAD, user.avtar);
                PlayerDataManager.set(PlayerDataKey.PHONE, user.phone);
                check();
            }
        }, null, true);
        HttpManager.post(HttpCmd.USER_CURRENCY, { user_id: user_id }, function (ret) {
            PlayerDataManager.set(PlayerDataKey.COIN, parseInt(ret.result.uc_balance));
            check();
        });
    };
    /**
     * 设置状态
     */
    Main.prototype.nextState = function () {
        this.state += 1;
        if (this.state == 2) {
            TimerManager.doTimer(800, 1, this.enterGame, this);
        }
    };
    /**
     * 进入游戏
     */
    Main.prototype.enterGame = function () {
        TDAPP.onEvent('QQ登录成功', "访问");
        TDAPP.onEvent('进入娃娃机首页', "访问");
        ViewManager.I.close(ViewName.LOADING);
        ViewManager.I.open(ViewName.GAME, this.iRoomNum);
        ViewManager.I.open(ViewName.DLG_NOTICE);
    };
    return Main;
}(eui.UILayer));
__reflect(Main.prototype, "Main");
//# sourceMappingURL=Main.js.map