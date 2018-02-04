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
var BackupScene = (function (_super) {
    __extends(BackupScene, _super);
    function BackupScene() {
        return _super.call(this) || this;
    }
    BackupScene.prototype.changeRoom = function (roomId) {
        // this.moveScene(ViewManager.I.open(ViewName.GAME, 22) as GameScene);
        this.moveScene(ViewManager.I.open(ViewName.GAME, roomId));
    };
    return BackupScene;
}(GameScene));
__reflect(BackupScene.prototype, "BackupScene");
