class MathUtils {
	/**
	 * 计算距离
	 */
	public static cacuDistance(x1: number, y1: number, x2: number, y2: number) {
		return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
	}

	/**
	 * 判断线段与矩形是否相交
	 */
	public static lineRectIntersection(start: Vector2, end: Vector2, rect: Rect) {
		var a = start.y - end.y;
		var b = end.x - start.x;
		var c = start.x * end.y - end.x * start.y;

		var left = rect.x;
		var top = rect.y;
		var right = rect.x + rect.width;
		var bottom = rect.y + rect.height;
		if (this.pointInRect(start, rect) || this.pointInRect(end, rect)) {
			return true;
		}
		if ((a * left + b * top + c >= 0 && a * right + b * bottom + c <= 0) ||
			(a * left + b * top + c <= 0 && a * right + b * bottom + c >= 0) ||
			(a * left + b * bottom + c >= 0 && a * right + b * top + c <= 0) ||
			(a * left + b * bottom + c >= 0 && a * right + b * top + c <= 0)) {
			if ((start.x < left && end.x < left) ||
				(start.x > right && end.x < left) ||
				(start.y > top && end.y > top) ||
				(start.y < bottom && end.y < bottom))  ///判断线段是否在矩形一侧
			{
				return false;
			}
			else {
				return true;
			}
		}
		else {
			return false;
		}
	}

	/**
	 * 检测点在矩形中
	 */
	public static pointInRect(point: Vector2, rect: Rect) {
		return point.x >= rect.x && point.x <= rect.x + rect.width &&
			point.y >= rect.y && point.y <= rect.y + rect.height;
	}

	/**
     * 获取一个区间的随机数
     */
	public static random($from: number, $end: number): number {
		$from = Math.min($from, $end);
		$end = Math.max($from, $end);
		var range: number = $end - $from;
		return $from + Math.random() * range;
	}

    /**
     * 获取一个区间的随机数(整数)
     */
	public static randomInt($from: number, $end: number): number {
		return Math.floor(this.random($from, $end + 1));
	}

	/**
	 * 检测手机号
	 */
	public static checkMobile(mobile: string): boolean {
		return mobile && mobile.match("^1[3|4|5|7|8][0-9]\\d{8}$") != null;
	}

	/**
	 * 检查姓名
	 */
	public static checkName(name: string): boolean {
		return name && name.match("^[\u4e00-\u9fa5]{2,7}$") != null;
	}

	/**
	 * 边界判断
	 */
	public static between(value: number, min: number, max: number) {
		return Math.min(Math.max(min, value), max);
	}
}