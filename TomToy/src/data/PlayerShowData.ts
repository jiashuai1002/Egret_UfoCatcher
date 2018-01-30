class PlayerShowData {
	public image: string;
	public head: string;
	public nickname: string;
	public desc: string;
	/**
     * @name  判断是否在微信环境
     * @returns  boolean
     */
	private static isWechat() {
		const ua = navigator.userAgent.toLowerCase();
		const isWeixin = ua.indexOf('micromessenger') != -1;
		if (isWeixin) {
			return true;
		} else {
			return false;
		}
	}
}