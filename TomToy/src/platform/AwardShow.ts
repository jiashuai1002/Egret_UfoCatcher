class AwardShow extends eui.Component{
	private image:eui.Image;
	private toy:eui.Label;
	private head:Head;
	private nickname:eui.Label;
	private desc:eui.Label;
	private qrcode:eui.Image;

	public constructor() {
		super();
		this.skinName = skins.AwardShow;
	}

	public show(toyId:number, desc: string, qrcode:egret.Texture){
		var toyData = DataManager.getToy(toyId);
		//炫耀一下页面 图片绘制跨域问题处理   ===> web部分做处理，替换域名。
		if(PlayerShowData.isWechat()){
			this.image.source = toyData.icon.replace("money.zhuoyi.com",window.location.host);
		}else{
			this.image.source = toyData.icon;
		}
		// console.log('wawawawawawa')
		// console.log(toyData.icon)
		this.toy.text = toyData.name;
		// this.head.setImage(PlayerDataManager.get(PlayerDataKey.HEAD));
		// console.log('wawawaw111awawa')
		// console.log(PlayerDataManager.get(PlayerDataKey.HEAD))
		this.nickname.text = PlayerDataManager.get(PlayerDataKey.NAME);
		this.desc.text = desc;
		this.qrcode.texture = qrcode;
	}
	
}