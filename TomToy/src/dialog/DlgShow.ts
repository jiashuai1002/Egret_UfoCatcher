class DlgShow extends Dialog {
	private leftBtn: Button;
	private rightBtn: Button;
	private showImage: eui.Image;
	private head: eui.Image;
	private nickname: eui.Label;
	private desc: eui.Label;
	private arr: Array<PlayerShowData>;
	private curindex: number;

	public constructor() {
		super();
		this.skinName = skins.DlgShow;
	}

	protected init() {
		var sourceArr = {
			image:["player_show1_png","player_show2_png","player_show3_png","player_show4_png","player_show5_png"],
			head:["player_show_head1_png","player_show_head2_png","player_show_head3_png","player_show_head4_png","player_show_head5_png"],
			nickname:["海霞","小幺精","张浩","狂风","相爱到老"],
			desc:[
				"周末闲着无聊，就下载来玩玩，很轻松居然就抓到一只，感觉比游乐场的好抓，质量也不错。",
				"跟闺蜜一起比赛抓，然后一人抓了一个，庆幸在圣诞节的时候送到了，然后互相填了对方的姓名地址，这个是闺蜜抓到的。",
				"很开心，是女票带我入坑的，每天坚持抓一个娃娃送她，感谢汤姆娃娃机。",
				"作为一个疯狂沉迷抓娃娃的玩家，我会告诉你，男生其实也很喜欢娃娃，当然更喜欢送娃娃，祝我赶紧找到女朋友。",
				"是老公用我手机抓的，送的币多很轻松抓了一个，然后看两个包邮，充了10块钱居然又中了一个，太高兴了。"
			]
		}
		var arr = [];
		for (let i = 0; i < sourceArr.image.length; i++) {
			var data = new PlayerShowData();
			data.image = sourceArr.image[i];
			data.head = sourceArr.head[i];
			data.nickname = sourceArr.nickname[i];
			data.desc = sourceArr.desc[i];
			arr.push(data);
		}
		this.arr = arr;

		this.leftBtn.setOnTap(() => this.turn(-1));
		this.rightBtn.setOnTap(() => this.turn(1));
		super.init();
	}

	private turn(direction: number) {
		var self = this;
		var min = 0;
		var max = this.arr.length - 1;
		var index = self.curindex + direction;
		index = MathUtils.between(index, min, max);
		var data = this.arr[index];
		self.showImage.source = data.image;
		self.head.source = data.head;
		self.nickname.text = data.nickname;
		self.desc.text = data.desc;

		self.leftBtn.visible = index != min;
		self.rightBtn.visible = index != max;
		self.curindex = index;
	}

	protected show() {
		this.curindex = MathUtils.randomInt(0, this.arr.length - 1);
		this.turn(0);
	}
}