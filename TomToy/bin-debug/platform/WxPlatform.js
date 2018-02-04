var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var WxPlatform = (function () {
    function WxPlatform() {
    }
    WxPlatform.login = function () {
        window["tdStatistics"]('微信授权登录', "访问");
        var url = Config.server + HttpCmd.LOGIN_WX;
        window["jump"](url);
    };
    WxPlatform.pay = function (payId) {
        // var url = Config.server + HttpCmd.PAY + "?user_id="
        // 	+ PlayerDataManager.get(PlayerDataKey.ID) + "&pay_channel=" + 6 + "&pay_id=" + payId;
        // window["jump"](url);
        HttpManager.post(HttpCmd.PAY, {
            user_id: PlayerDataManager.get(PlayerDataKey.ID),
            pay_channel: 6,
            pay_id: payId
        }, function (res) {
            console.log(res);
            var pay = res.result.payment;
            wx.config({
                debug: false,
                appId: pay.appId,
                timestamp: pay.timeStamp,
                nonceStr: pay.nonceStr,
                signature: pay.paySign,
                jsApiList: ['chooseWXPay']
            });
            wx.chooseWXPay({
                appId: pay.appId,
                timestamp: pay.timeStamp,
                nonceStr: pay.nonceStr,
                package: pay.package,
                signType: pay.signType,
                paySign: pay.paySign,
                success: function (res) {
                    window["tdStatistics"]('消费成功-id' + payId, "访问");
                    HttpManager.post(HttpCmd.USER_CURRENCY, { user_id: PlayerDataManager.get(PlayerDataKey.ID) }, function (ret) {
                        PlayerDataManager.set(PlayerDataKey.COIN, parseInt(ret.result.uc_balance));
                    });
                }
            });
        }, null, true);
    };
    WxPlatform.share = function (title, content) {
        window["showQrcode"](ArrayUtils.random(this.QR_ARR));
    };
    WxPlatform.awardShow = function () {
        var award = this.award;
        console.log('award');
        console.log(award);
        var tex = new egret.RenderTexture;
        tex.drawToTexture(award);
        var url = tex.toDataURL("image/png", new egret.Rectangle(0, 0, award.width, award.height));
        console.log(url);
        console.log('url');
        window["showAward"](url);
    };
    WxPlatform.preloadAward = function (toyId, desc) {
        var award = this.award;
        var texture = this.createQrcode().texture;
        award.show(toyId, desc, texture);
    };
    WxPlatform.createQrcode = function () {
        var qrcode = qr.QRCode.create(Config.auth + "?inviter=" + PlayerDataManager.get(PlayerDataKey.ID));
        var qrTex = new egret.RenderTexture;
        qrTex.drawToTexture(qrcode);
        var bitmap = new egret.Bitmap;
        bitmap.texture = qrTex;
        return bitmap;
    };
    WxPlatform.preLoad = function () {
        var _this = this;
        var rectArr = [
            [340, 607, 260, 260],
            [229, 679, 260, 260],
            [42, 738, 260, 260]
        ];
        this.QR_ARR = [];
        for (var i = 0; i < rectArr.length; i++) {
            var sprite = new egret.Sprite;
            var bg = DisplayUtils.createBitmap("share_" + (i + 1) + "_png");
            var bitmap = this.createQrcode();
            var rect = rectArr[i];
            bitmap.x = rect[0];
            bitmap.y = rect[1];
            bitmap.width = rect[2];
            bitmap.height = rect[3];
            sprite.addChild(bg);
            sprite.addChild(bitmap);
            var tex = new egret.RenderTexture;
            tex.drawToTexture(sprite);
            this.QR_ARR[i] = tex.toDataURL("image/png", new egret.Rectangle(0, 0, sprite.width, sprite.height));
            window["showQrcode"](this.QR_ARR[i]);
        }
        window["hideQrcode"]();
        this.award = new AwardShow();
        StageUtils.stage.addChild(this.award);
        this.award.x = -10000;
        this.award.addEventListener(egret.Event.ADDED_TO_STAGE, function () {
            DisplayUtils.removeFromParent(_this.award);
            egret.ImageLoader.crossOrigin = "anonymous";
        }, this);
    };
    WxPlatform.QR_ARR = [];
    return WxPlatform;
}());
__reflect(WxPlatform.prototype, "WxPlatform");
//# sourceMappingURL=WxPlatform.js.map