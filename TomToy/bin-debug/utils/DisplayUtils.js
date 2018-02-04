var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *
 * 显示工具类
 *
 */
var DisplayUtils = (function () {
    function DisplayUtils() {
    }
    /**
     * 创建一个Bitmap
     * @param resName resource.json中配置的name
     * @returns {egret.Bitmap}
     */
    DisplayUtils.createBitmap = function (resName) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(resName);
        result.texture = texture;
        return result;
    };
    /**
     * 创建movieclip
     */
    DisplayUtils.createMovieClip = function (resName, animName) {
        if (animName === void 0) { animName = null; }
        if (animName == null) {
            animName = resName;
        }
        var mcData = RES.getRes(resName + "_json");
        var mcTexture = RES.getRes(resName + "_png");
        var mcDataFactory = new egret.MovieClipDataFactory(mcData, mcTexture);
        return new egret.MovieClip(mcDataFactory.generateMovieClipData(animName));
    };
    DisplayUtils.loadImage = function (src, onComplete) {
        if (onComplete === void 0) { onComplete = null; }
        var imgLoader = new egret.ImageLoader;
        imgLoader.once(egret.Event.COMPLETE, function (e) {
            var texture = new egret.Texture();
            texture._setBitmapData(e.currentTarget.data);
            onComplete && onComplete(texture);
        }, this);
        imgLoader.load(src);
    };
    /**
     * 从父级移除child
     * @param child
     */
    DisplayUtils.removeFromParent = function (child) {
        if (child.parent == null)
            return;
        child.parent.removeChild(child);
    };
    return DisplayUtils;
}());
__reflect(DisplayUtils.prototype, "DisplayUtils");
