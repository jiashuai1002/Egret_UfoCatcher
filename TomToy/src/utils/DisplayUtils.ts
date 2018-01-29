/**
 *
 * 显示工具类
 *
 */
class DisplayUtils {
	/**
     * 创建一个Bitmap
     * @param resName resource.json中配置的name
     * @returns {egret.Bitmap}
     */
    public static createBitmap(resName: string): egret.Bitmap {
        var result: egret.Bitmap = new egret.Bitmap();
        var texture: egret.Texture = RES.getRes(resName);
        result.texture = texture;
        return result;
    }

    /**
     * 创建movieclip
     */
    public static createMovieClip(resName: string, animName: string = null): egret.MovieClip {
        if (animName == null) {
            animName = resName;
        }
        var mcData = RES.getRes(resName + "_json");
        var mcTexture = RES.getRes(resName + "_png");
        var mcDataFactory: egret.MovieClipDataFactory = new egret.MovieClipDataFactory(mcData, mcTexture);
        return new egret.MovieClip(mcDataFactory.generateMovieClipData(animName));
    }

    public static loadImage(src: string, onComplete: Function = null) {
        var imgLoader: egret.ImageLoader = new egret.ImageLoader;
        imgLoader.once(egret.Event.COMPLETE, e => {
            let texture = new egret.Texture();
            texture._setBitmapData(e.currentTarget.data);
            onComplete && onComplete(texture);
        }, this);
        imgLoader.load(src);
    }

    /**
     * 从父级移除child
     * @param child
     */
    public static removeFromParent(child: egret.DisplayObject) {
        if (child.parent == null)
            return;

        child.parent.removeChild(child);
    }
}
