var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ViewManager = (function () {
    function ViewManager() {
        this._views = {};
    }
    ViewManager.prototype.open = function (name) {
        var params = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            params[_i - 1] = arguments[_i];
        }
        var view = this.getView(name) || this.createView(name);
        view.open.apply(view, params);
        return view;
    };
    ViewManager.prototype.close = function (name) {
        var params = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            params[_i - 1] = arguments[_i];
        }
        var view = this.getView(name);
        console.log(view);
        view.close.apply(view, params);
    };
    ViewManager.prototype.doFunc = function (name, funcName) {
        var params = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            params[_i - 2] = arguments[_i];
        }
        var view = this.getView(name);
        view[funcName].apply(view, params);
    };
    ViewManager.prototype.getView = function (name) {
        return this._views[name];
    };
    ViewManager.prototype.createView = function (name) {
        var view = ObjectPool.pop(name);
        this._views[name] = view;
        return view;
    };
    Object.defineProperty(ViewManager, "I", {
        get: function () {
            return this._instance || (this._instance = new ViewManager);
        },
        enumerable: true,
        configurable: true
    });
    return ViewManager;
}());
__reflect(ViewManager.prototype, "ViewManager");
