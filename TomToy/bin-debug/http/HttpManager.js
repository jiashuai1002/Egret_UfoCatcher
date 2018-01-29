var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var HttpManager = (function () {
    function HttpManager() {
    }
    HttpManager.get = function (cmd, data, suc, fail, showLoading) {
        if (suc === void 0) { suc = null; }
        if (fail === void 0) { fail = null; }
        if (showLoading === void 0) { showLoading = false; }
        this.send(egret.HttpMethod.GET, cmd, data, suc, fail, showLoading);
    };
    HttpManager.post = function (cmd, data, suc, fail, showLoading) {
        if (suc === void 0) { suc = null; }
        if (fail === void 0) { fail = null; }
        if (showLoading === void 0) { showLoading = false; }
        this.send(egret.HttpMethod.POST, cmd, data, suc, fail, showLoading);
    };
    HttpManager.send = function (method, cmd, data, suc, fail, showLoading) {
        var _this = this;
        if (suc === void 0) { suc = null; }
        if (fail === void 0) { fail = null; }
        if (showLoading === void 0) { showLoading = false; }
        if (showLoading && fail == null) {
            fail = this.fail.bind(this);
        }
        if (showLoading) {
            this.showLoading();
        }
        var request = new egret.HttpRequest();
        var url = Config.server + cmd;
        var idx = 0;
        var params = "";
        for (var key in data) {
            params += idx == 0 ? "" : "&";
            params += key + "=" + data[key];
            idx += 1;
        }
        request.responseType = egret.HttpResponseType.TEXT;
        switch (method) {
            case egret.HttpMethod.GET:
                request.open(url, method);
                url += "?" + params;
                request.withCredentials = true;
                request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                request.send();
                break;
            case egret.HttpMethod.POST:
                request.open(url, method);
                request.withCredentials = true;
                request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                request.send(params);
                break;
        }
        request.addEventListener(egret.Event.COMPLETE, function (e) {
            var ret = JSON.parse(e.currentTarget.response);
            if (ret.error == 0) {
                // console.log(ret);
                suc && suc(ret);
            }
            else {
                fail && fail(ret);
            }
            if (showLoading) {
                _this.hideLoading();
            }
        }, this);
        request.addEventListener(egret.IOErrorEvent.IO_ERROR, function (e) {
            fail && fail();
            if (showLoading) {
                _this.hideLoading();
            }
        }, this);
    };
    HttpManager.fail = function (ret) {
        console.log(ret);
        ViewManager.I.open(ViewName.POP_ALERT, ret.message);
    };
    HttpManager.showLoading = function () {
        if (this.loadCnt == 0) {
            ViewManager.I.open(ViewName.HTTP);
        }
        this.loadCnt += 1;
    };
    HttpManager.hideLoading = function () {
        this.loadCnt -= 1;
        if (this.loadCnt == 0) {
            ViewManager.I.close(ViewName.HTTP);
        }
    };
    HttpManager.loadCnt = 0;
    return HttpManager;
}());
__reflect(HttpManager.prototype, "HttpManager");
//# sourceMappingURL=HttpManager.js.map