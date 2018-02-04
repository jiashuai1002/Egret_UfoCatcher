var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var PlayerShowData = (function () {
    function PlayerShowData() {
    }
    /**
     * @name  判断是否在微信环境
     * @returns  boolean
     */
    PlayerShowData.isWechat = function () {
        var ua = navigator.userAgent.toLowerCase();
        var isWeixin = ua.indexOf('micromessenger') != -1;
        if (isWeixin) {
            return true;
        }
        else {
            return false;
        }
    };
    return PlayerShowData;
}());
__reflect(PlayerShowData.prototype, "PlayerShowData");
