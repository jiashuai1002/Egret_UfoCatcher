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
var DlgBag = (function (_super) {
    __extends(DlgBag, _super);
    function DlgBag() {
        var _this = _super.call(this) || this;
        _this.skinName = skins.DlgBag;
        return _this;
    }
    DlgBag.prototype.init = function () {
        _super.prototype.init.call(this);
        this.toyTab.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showToy, this);
        this.orderTab.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showorder, this);
        this.pickBtn.setOnTap(this.pick.bind(this));
        this.nextBtn.setOnTap(this.next.bind(this));
        this.subBtn.setOnTap(this.sub.bind(this));
        this.nameText.maxChars = 7;
        this.phoneText.inputType = egret.TextFieldInputType.TEL;
        this.phoneText.restrict = "0-9";
        this.phoneText.maxChars = 11;
        this.addrText.maxChars = 40;
    };
    DlgBag.prototype.preOpen = function () {
        var _this = this;
        var ready = -2;
        var check = function () {
            ready += 1;
            if (ready == 0) {
                _super.prototype.preOpen.call(_this);
            }
        };
        HttpManager.post(HttpCmd.BAG_LIST, {
            user_id: PlayerDataManager.get(PlayerDataKey.ID)
        }, function (ret) {
            console.log("背包返回数据", ret);
            _this.toys = ret.result.list;
            check();
        }, null, true);
        HttpManager.post(HttpCmd.ORDER_LIST, {
            user_id: PlayerDataManager.get(PlayerDataKey.ID)
        }, function (ret) {
            _this.orders = ret.result.list;
            check();
        }, null, true);
    };
    DlgBag.prototype.show = function () {
        this.clear();
        var haveToy = this.toys.length > 0;
        if (haveToy) {
            for (var i = 0; i < this.toys.length; i++) {
                //TODO   修改逻辑  ===>    用背包接口返回的数据;
                var item = ObjectPool.pop("ToyItem");
                var toy = this.toys[i];
                // let data = DataManager.getToy(toy.pack_toy_id);
                // item.show(data, toy.pack_balance_num);
                //2018-02-03  by jiashuai  21:11
                toy.name = this.toys[i].ut_name;
                toy.icon = this.toys[i].ut_cover_img;
                item.show(toy, toy.pack_balance_num);
                this.toyGroup.addChild(item);
            }
        }
        this.pickBtn.visible = haveToy;
        this.toyHint.visible = !haveToy;
        var collection = new eui.ArrayCollection(this.orders);
        this.orderList.dataProvider = collection;
        this.orderList.itemRenderer = OrderItem;
        this.orderHint.visible = this.orders.length == 0;
        this.bagView.visible = true;
        this.drawView.visible = false;
        this.showToy();
    };
    DlgBag.prototype.showToy = function () {
        this.toyView.visible = true;
        this.toyTab.enabled = false;
        this.orderView.visible = false;
        this.orderTab.enabled = true;
    };
    DlgBag.prototype.showorder = function () {
        this.toyView.visible = false;
        this.toyTab.enabled = true;
        this.orderView.visible = true;
        this.orderTab.enabled = false;
    };
    DlgBag.prototype.clear = function () {
        var cnt = this.toyGroup.numChildren;
        for (var i = 0; i < cnt; i++) {
            var item = this.toyGroup.getChildAt(0);
            item.destroy();
        }
    };
    DlgBag.prototype.pick = function () {
        this.bagView.visible = false;
        this.drawView.visible = true;
        this.pickView.visible = true;
        this.infoView.visible = false;
        var list = [];
        for (var i = 0; i < this.toys.length; i++) {
            var toy = this.toys[i];
            list.push({
                id: toy.pack_toy_id,
                count: toy.pack_balance_num,
                onChange: this.onChange.bind(this)
            });
        }
        var collection = new eui.ArrayCollection(list);
        this.pickList.dataProvider = collection;
        this.pickList.itemRenderer = PickItem;
        this.pickData = {};
        this.pickCount = 0;
        this.pickHint.visible = true;
    };
    DlgBag.prototype.onChange = function (toyId, value) {
        this.pickData[toyId] = value;
        this.pickCount = 0;
        for (var key in this.pickData) {
            this.pickCount += this.pickData[key];
        }
        this.pickHint.visible = this.pickCount < 2;
    };
    DlgBag.prototype.next = function () {
        if (this.pickCount == 0) {
            return;
        }
        if (this.pickCount < 2 && PlayerDataManager.get(PlayerDataKey.COIN) < 100) {
            ViewManager.I.open(ViewName.DLG_CHARGE);
            ViewManager.I.open(ViewName.POP_HINT, "金币不足，请前去充值！");
            return;
        }
        this.pickView.visible = false;
        this.infoView.visible = true;
        var info = LocalDataManager.get(LocalDataKey.ADDRESS);
        if (info) {
            this.nameText.text = info.name;
            this.phoneText.text = info.phone;
            this.addrText.text = info.addr;
        }
    };
    DlgBag.prototype.sub = function () {
        var _this = this;
        var hint;
        var name = this.nameText.text;
        var phone = this.phoneText.text;
        var addr = this.addrText.text;
        if (name == "") {
            hint = "请填写姓名";
        }
        else if (!MathUtils.checkName(name)) {
            hint = "请填写正确的姓名";
        }
        else if (phone == "") {
            hint = "请填写手机号码";
        }
        else if (!MathUtils.checkMobile(phone)) {
            hint = "请填写正确的手机号码";
        }
        else if (addr == "") {
            hint = "请填写详细地址";
        }
        if (hint) {
            ViewManager.I.open(ViewName.POP_HINT, hint);
            return;
        }
        LocalDataManager.set(LocalDataKey.ADDRESS, {
            name: name,
            phone: phone,
            addr: addr
        });
        var list = [];
        for (var key in this.pickData) {
            list.push({ ut_id: key, num: this.pickData[key] });
        }
        console.log(list);
        HttpManager.post(HttpCmd.EXCHANGE, {
            user_id: PlayerDataManager.get(PlayerDataKey.ID),
            exchg_username: name,
            exchg_phone: phone,
            exchg_address: addr,
            plist: JSON.stringify(list)
        }, function (ret) {
            _this.close();
            ViewManager.I.open(ViewName.POP_HINT, "提取成功！");
            if (_this.pickCount < 2) {
                PlayerDataManager.updateCoin();
            }
        }, null, true);
    };
    return DlgBag;
}(Dialog));
__reflect(DlgBag.prototype, "DlgBag");
