/**
 *
 * 定时器管理类（需要初始化）
 *
 */
class TimerManager {
    private static _handlers: Array<TimerHandler>;
    private static _delHandlers: Array<TimerHandler>;
    private static _currTime: number;
    private static _currFrame: number;
    private static _count: number;
    private static _timeScale: number;

    /**
     * 初始化
     */
    public static init() {
        this._handlers = new Array<TimerHandler>();
        this._delHandlers = new Array<TimerHandler>();
        this._currTime = egret.getTimer();
        this._currFrame = 0;
        this._count = 0;
        this._timeScale = 1;

        egret.Ticker.getInstance().register(this.onEnterFrame, this);
    }

    /**
     * 设置时间参数
     * @param timeScale
     */
    public static setTimeScale(timeScale: number): void {
        this._timeScale = timeScale;
    }

    /**
     * 获取时间参数
     */
    public static getTimeScale(): number {
        return this._timeScale;
    }

    /**
     * 每帧执行函数
     * @param frameTime
     */
    private static onEnterFrame(): void {
        this._currFrame++;
        this._currTime = egret.getTimer();
        DebugUtils.start("TimerManager:");
        for (var i: number = 0; i < this._count; i++) {
            var handler: TimerHandler = this._handlers[i];
            var t: number = handler.userFrame ? this._currFrame : this._currTime;
            if (t >= handler.exeTime) {
                DebugUtils.start(handler.method.toString());
                handler.method.call(handler.methodObj, (this._currTime - handler.dealTime) * this._timeScale);
                DebugUtils.stop(handler.method.toString());
                handler.dealTime = this._currTime;
                handler.exeTime = t + handler.delay;
                if (!handler.repeat) {
                    if (handler.repeatCount > 1) {
                        handler.repeatCount--;
                    } else {
                        if (handler.complateMethod) {
                            handler.complateMethod.apply(handler.complateMethodObj);
                        }
                        this._delHandlers.push(handler);
                    }
                }
            }
        }
        while (this._delHandlers.length) {
            var handler: TimerHandler = this._delHandlers.pop();
            if (!handler.repeat) {
                this.remove(handler.method, handler.methodObj);
            }
        }
        DebugUtils.stop("TimerManager:");
    }

    private static create(useFrame: boolean, delay: number, repeatCount: number, method: Function, methodObj: any, complateMethod: Function, complateMethodObj: any): void {
        //参数监测
        if (delay < 0 || repeatCount < 0 || method == null) {
            return;
        }

        //先删除相同函数的计时
        this.remove(method, methodObj);

        //创建
        var handler: TimerHandler = ObjectPool.pop("TimerHandler");
        handler.userFrame = useFrame;
        handler.repeat = repeatCount == 0;
        handler.repeatCount = repeatCount;
        handler.delay = delay;
        handler.method = method;
        handler.methodObj = methodObj;
        handler.complateMethod = complateMethod;
        handler.complateMethodObj = complateMethodObj;
        handler.exeTime = delay + (useFrame ? this._currFrame : this._currTime);
        handler.dealTime = this._currTime;
        this._handlers.push(handler);
        this._count++;
    }

    /**
     *
     * 定时执行
     * @param delay 执行间隔:毫秒
     * @param repeatCount 执行次数, 0为无限次
     * @param method 执行函数
     * @param methodObj 执行函数所属对象
     * @param complateMethod 完成执行函数
     * @param complateMethodObj 完成执行函数所属对象
     *
     */
    public static doTimer(delay: number, repeatCount: number, method: Function, methodObj: any, complateMethod: Function = null, complateMethodObj: any = null): void {
        this.create(false, delay, repeatCount, method, methodObj, complateMethod, complateMethodObj);
    }

    /**
     *
     * 定时执行
     * @param delay 执行间隔:帧频
     * @param repeatCount 执行次数, 0为无限次
     * @param method 执行函数
     * @param methodObj 执行函数所属对象
     * @param complateMethod 完成执行函数
     * @param complateMethodObj 完成执行函数所属对象
     *
     */
    public static doFrame(delay: number, repeatCount: number, method: Function, methodObj: any, complateMethod: Function = null, complateMethodObj: any = null): void {
        this.create(true, delay, repeatCount, method, methodObj, complateMethod, complateMethodObj);
    }

    /**
     * 定时器执行数量
     * @return
     *
     */
    public static get count(): number {
        return this._count;
    }

    /**
     * 清理
     * @param method 要移除的函数
     * @param methodObj 要移除的函数对应的对象
     */
    public static remove(method: Function, methodObj: any): void {
        for (var i: number = 0; i < this._count; i++) {
            var handler: TimerHandler = this._handlers[i];
            if (handler.method == method && handler.methodObj == methodObj) {
                this._handlers.splice(i, 1);
                ObjectPool.push(handler);
                this._count--;
                break;
            }
        }
    }

    /**
     * 清理
     * @param methodObj 要移除的函数对应的对象
     */
    public static removeAll(methodObj: any): void {
        for (var i: number = 0; i < this._count; i++) {
            var handler: TimerHandler = this._handlers[i];
            if (handler.methodObj == methodObj) {
                this._handlers.splice(i, 1);
                ObjectPool.push(handler);
                this._count--;
                i--;
            }
        }
    }

    public static clear() {
        for (var i: number = 0; i < this._count; i++) {
            var handler: TimerHandler = this._handlers[i];
            this._handlers.splice(i, 1);
            ObjectPool.push(handler);
            this._count--;
            i--;
        }
    }

    /**
     * 检测是否已经存在
     * @param method
     * @param methodObj
     *
     */
    public static isExists(method: Function, methodObj: any): boolean {
        for (var i: number = 0; i < this._count; i++) {
            var handler: TimerHandler = this._handlers[i];
            if (handler.method == method && handler.methodObj == methodObj) {
                return true;
            }
        }
        return false;
    }
}


class TimerHandler {
    /**执行间隔*/
    public delay: number = 0;
    /**是否重复执行*/
    public repeat: boolean;
    /**重复执行次数*/
    public repeatCount: number = 0;
    /**是否用帧率*/
    public userFrame: boolean;
    /**执行时间*/
    public exeTime: number = 0;
    /**处理函数*/
    public method: Function;
    /**处理函数所属对象*/
    public methodObj: any;
    /**完成处理函数*/
    public complateMethod: Function;
    /**完成处理函数所属对象*/
    public complateMethodObj: any;
    /**上次的执行时间*/
    public dealTime: number = 0;

    /**清理*/
    public clear(): void {
        this.method = null;
        this.methodObj = null;
        this.complateMethod = null;
        this.complateMethodObj = null;
    }
}
