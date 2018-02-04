/**
 * 初始界面
 */
class Main extends eui.UILayer {
    private loadingScene: LoadingScene;
    private state: number;
    private iRoomNum: number;
    private wechatLogin: boolean;

    protected createChildren(): void {
        // PlayerShowData.

        super.createChildren();
        DisplayUtils.removeFromParent(this);
        EgretExpandManager.init();

        //注入自定义的素材解析器
        let assetAdapter = new AssetAdapter();
        egret.registerImplementation("eui.IAssetAdapter", assetAdapter);
        egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());

        //初始化Resource资源加载库
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/");

        this.state = 0;
    }

    /**
     * 配置文件加载完成,开始预加载皮肤主题资源和preload资源组。
     */
    private onConfigComplete(event: RES.ResourceEvent): void {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
        let theme = new eui.Theme("resource/default.thm.json", StageUtils.stage);
        theme.once(eui.UIEvent.COMPLETE, this.onThemeLoadComplete, this);
    }

    /**
     * 主题文件加载完成,开始预加载
     */
    private onThemeLoadComplete(): void {
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.loadGroup("loading");
    }

    /**
	 * 加载资源完成
	 */
    private onResourceLoadComplete(event: RES.ResourceEvent): void {
        if (event.groupName == "loading") {
            var userId = window["getParam"]("user_id");
            if (userId != null) {
                LocalDataManager.set(LocalDataKey.ID, userId);
            } else {
                userId = LocalDataManager.get(LocalDataKey.ID);
            }
            if (userId) {
                this.loadingScene = ViewManager.I.open(ViewName.LOADING) as LoadingScene;
                RES.loadGroup("preload");
                this.loadData();
            } else {
                //判断用户是否在微信：1在  直接跳转微信授权操作； 2不在 其他登录逻辑；
                if (PlayerShowData.isWechat()) {
                    WxPlatform.login();
                } else {
                    ViewManager.I.open(ViewName.LOGIN);
                }
            }
        } else if (event.groupName == "preload") {
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            WxPlatform.preLoad();
            this.nextState();
            StageUtils.stage.once(egret.TouchEvent.TOUCH_TAP, () => {
                SoundManager.I.playMusic("music1_mp3");
            }, this);
        }
    }

    /**
	 * 加载资源进度
	 */
    private onResourceProgress(event: RES.ResourceEvent): void {
        if (event.groupName == "preload") {
            this.loadingScene && this.loadingScene.setProgress(event.itemsLoaded / event.itemsTotal);
        }
    }

    /**
     * 加载数据
     */
    private loadData() {
        window["tdStatistics"]('进入到加载页', "访问");
        var user_id = LocalDataManager.get(LocalDataKey.ID);
        var cnt = 4;
        var check = () => {
            cnt -= 1;
            if (cnt == 0) {
                DataManager.initRoomToys();
                this.nextState();
            }
        };
        HttpManager.post(HttpCmd.ROOM_LIST, null, ret => {
            // console.log("all Ufos", ret);
            DataManager.initRoom(ret.ufos);
            var randomNum = parseInt(ret.ufos.length * Math.random());
            this.iRoomNum = ret.ufos[randomNum].uc_id || 1;
            check();
        }, null, true);
        HttpManager.post(HttpCmd.TOY_LIST, null, ret => {
            // console.log("all Toys", ret);
            DataManager.initToy(ret.toys);
            check();
        }, null, true);
        HttpManager.post(HttpCmd.USER, { user_id: user_id }, ret => {
            // console.log(ret)
            if (ret.result.return_code != 0) {
                //判断用户是否在微信：1在  直接跳转微信授权操作； 2不在 其他登录逻辑；
                if (PlayerShowData.isWechat()) {
                    WxPlatform.login();
                } else {
                    ViewManager.I.open(ViewName.LOGIN);
                }
            } else {
                var user = ret.result.user;
                PlayerDataManager.set(PlayerDataKey.ID, user.user_id);
                PlayerDataManager.set(PlayerDataKey.NAME, user.nickname);
                PlayerDataManager.set(PlayerDataKey.HEAD, user.avtar);
                PlayerDataManager.set(PlayerDataKey.PHONE, user.phone);
                check();
            }
        }, null, true);
        HttpManager.post(HttpCmd.USER_CURRENCY, { user_id: user_id }, ret => {
            PlayerDataManager.set(PlayerDataKey.COIN, parseInt(ret.result.uc_balance));
            check();
        });
    }

    /**
     * 设置状态
     */
    private nextState() {
        this.state += 1;
        if (this.state == 2) {
            TimerManager.doTimer(800, 1, this.enterGame, this)
        }
    }

    /**
     * 进入游戏
     */
    private enterGame() {
        window["tdStatistics"]('QQ登录成功', "访问");
        window["tdStatistics"]('进入娃娃机首页', "访问");
        
        ViewManager.I.close(ViewName.LOADING);
        ViewManager.I.open(ViewName.GAME, this.iRoomNum);
        window["openNewHelp"]();
        const timer = setInterval(function () {
            const flag = localStorage.getItem("isHelpTips") || '';
            if (flag) {
                ViewManager.I.open(ViewName.DLG_NOTICE);
                clearInterval(timer);
            }
        }, 100);
        
    }
}