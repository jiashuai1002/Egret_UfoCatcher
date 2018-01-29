/**
 *
 * 数组工具类
 *
 */
class ArrayUtils {
	/**
     * 遍历操作
     * @param arr
     * @param func
     */
    public static forEach(arr: Array<any>, func: Function, funcObj: any): void {
        for (var i: number = 0, len: number = arr.length; i < len; i++) {
            func.apply(funcObj, [arr[i]]);
        }
    }

    /**
     * 复制数组
     */
    public static copyTo(src: Array<any>, dest: Array<any>) {
        if (src == null) {
            return;
        }
        if (dest == null) {
            dest = [];
        }
        for (let i = 0; i < src.length; i++) {
            dest.push(src[i]);
        }
    }

    /**
     * 移除元素
     */
    public static remove(arr: Array<any>, obj: any) {
        let index = arr.indexOf(obj);
        arr.splice(index, 1);
    }

    /**
     * 随机元素
     */
    public static random(arr: Array<any>) {
        if (arr == null || arr.length == 0) return null;
        var index: number = Math.floor(Math.random() * arr.length);
        return arr[index];
    }
}