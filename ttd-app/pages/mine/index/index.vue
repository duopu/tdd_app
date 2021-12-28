<!-- 我的 -->
<template>
	<view class="mine">

		<custom-navbar title="我的" :show-left-icon="false" />

		<view class="mine-top">
			<view class="mt-1">
				<image :src="userHeaderImg" class="mt-11" @click="navPeopleDetail" mode="aspectFill" />
				<view class="mt-12">
					<text class="mt-14" @click="navPeopleDetail">{{ showWelcome() }}</text>
					<view class="mt-15" @click="toPage({url: '/pages/mine/myIntegral/myIntegral'})">
						<text class="mt-16">我的积分：{{ integral }}</text>
						<uni-icons type="arrowright" class="mt-17" color="rgba(256, 256, 256, 0.2)" size="14" />
					</view>
				</view>
				<view class="mt-13" @click="toPage({url: '/pages/mine/lotteryCenter/lotteryCenter'})">
					<text class="mt-18">剩余抽奖次数</text>
					<text class="mt-19">{{ lotteryCount }}</text>
				</view>
			</view>
		</view>

		<view class="mine-middle">
			<view class="mm-1">
				<view class="mm-11" @click="toPage({url: '/pages/mine/signIn/signIn'})">
					<view class="mm-12">{{ signCount }}</view>
					<view class="mm-13">签到（次）</view>
				</view>
				<view class="mm-11" @click="toPage({url: '/pages/mine/myCoupons/myCoupons'})">
					<view class="mm-12">{{ couponCount }}</view>
					<view class="mm-13">我的优惠券</view>
				</view>
				<view class="mm-11" @click="toPage({url: '/pages/mine/myWallet/myWallet'})">
					<view class="mm-12 mm-14">
						<text>{{ moneyZheng }}</text>
						<text class="mm-15">{{ moneyFen }}</text>
					</view>
					<view class="mm-13 mm-131">我的钱包</view>
				</view>
			</view>

			<image class="mm-2" :src="qdyjx" mode="aspectFill" @click="toPage({url: '/pages/mine/signIn/signIn'})"/>

			<view class="mm-3">
				<template v-for="(i, index) in newList">
					<view class="mm-31" @click="toPage(i)" :key="i.url">
						<image class="mm-32" :src="i.img" />
						<view class="mm-33">{{ i.title }}</view>
						<view class="mm-3320" v-if="i.title == '实名认证' && realAuth">已认证</view>
						<uni-icons type="arrowright" class="arrowright-cc" color="#BDBDBD" size="16" />
					</view>
					<view class="mm-35" v-if="index < (newList.length - 1)" />
				</template>
			</view>


			<view class="mm-3 mm-4">
				<template v-for="(i, index) in newList1">
					<view class="mm-31" @click="toPage(i)" :key="i.url">
						<image class="mm-32" :src="i.img" />
						<view class="mm-33">{{ i.title }}</view>
						<uni-icons type="arrowright" class="arrowright-cc" color="#BDBDBD" size="16" />
					</view>
					<view class="mm-35" v-if="index < (newList1.length - 1)" />
				</template>
			</view>

		</view>

		<view class="logout">退出登录</view>
		
		<!-- 协议弹层 -->
		<agreement-modal ref="agreementModal" ></agreement-modal>
	</view>
</template>

<script>

	export default {
		components: {

		},
		data() {
			return {
				demo: true,
				mineTopBack: 'https://ttd-public.obs.cn-east-3.myhuaweicloud.com/app-img/mine/mine-top-back.png',
				qdyjx: 'https://ttd-public.obs.cn-east-3.myhuaweicloud.com/app-img/qdyjx.png',
				logo:'https://ttd-public.obs.cn-east-3.myhuaweicloud.com/app-img/logo.png',
				integral: 0,
				signCount: 0,
				money: 0,
				realAuth: false,
				couponCount: 0,
				lotteryCount: 0,
			};
		},
		computed: {
			userName() {
				return this.$store.state.user.name
			},
			userHeaderImg() {
				return (this.$store.state.user.headImgUrl || this.logo);
			},
			newList() {
				return [{
						title: '邀请好友',
						url: '/pages/mine/invite/invite',
						img: 'https://ttd-public.obs.cn-east-3.myhuaweicloud.com/app-img/mine/MDicon-7.png'
					},
					{
						title: '承接方申请',
						url: '/pages/mine/undertakePartyApply/undertakePartyApply',
						img: 'https://ttd-public.obs.cn-east-3.myhuaweicloud.com/app-img/mine/MDicon-8.png'
					},
					{
						title: '实名认证',
						url: '/pages/mine/realNameAuth/realNameAuth',
						img: 'https://ttd-public.obs.cn-east-3.myhuaweicloud.com/app-img/mine/MDicon-2.png'
					},
					{
						title: '我的银行账户',
						url: '/pages/mine/myBankCard/myBankCard',
						img: 'https://ttd-public.obs.cn-east-3.myhuaweicloud.com/app-img/mine/MDicon-3.png'
					},
					{
						title: '发票信息',
						url: '/pages/mine/myInvoice/myInvoice',
						img: 'https://ttd-public.obs.cn-east-3.myhuaweicloud.com/app-img/mine/MDicon-4.png'
					},
					{
						title: '我的投诉',
						url: '/pages/mine/myComplain/myComplain',
						img: 'https://ttd-public.obs.cn-east-3.myhuaweicloud.com/app-img/mine/MDicon-5.png'
					},
					{
						title: '我的服务地址',
						url: '/pages/mine/addressManage/addressManage',
						img: 'https://ttd-public.obs.cn-east-3.myhuaweicloud.com/app-img/mine/MDicon-6.png'
					},
				]
			},
			newList1() {
				return [{
						title: '帮助中心',
						url: '/pages/mine/helpCenter/helpCenter',
						img: 'https://ttd-public.obs.cn-east-3.myhuaweicloud.com/app-img/mine/MDicon.png'
					},
					{
						title: '关于我们',
						url: '/pages/mine/aboutUs/aboutUs',
						img: 'https://ttd-public.obs.cn-east-3.myhuaweicloud.com/app-img/mine/MDicon-1.png'
					},
				]
			},
			moneyZheng(){
				if(this.money < 100000){
					return (this.money / 100).toFixed(2).split('.')[0]
				}else{
					return (this.money / 100000).toFixed(2)
				}
			},
			moneyFen(){
				if(this.money < 100000){
					return (this.money / 100).toFixed(2).split('.')[1]
				}else{
					return 'k'
				}
			}
		},
		onReady() {},
		onShow() {
			this.$tool.actionForLogin(() => {
				this.refresh();
			});
		},
		onPullDownRefresh() {
			this.$tool.actionForLogin(() => {
				this.refresh();
			});
		},
		methods: {
			// 跳转个人信息
			navPeopleDetail() {
				uni.navigateTo({
					url: '/pages/receive-order/peopleDetail/peopleDetail'
				})
			},
			refresh() {
				this.queryIntegralInfo();
				this.queryCouponInfo();
				this.queryMoneyInfo();
				this.querySignInfo();
				this.queryLotteryCount();
				this.queryAuthInfo();
			},
			showWelcome() {
				const now = new Date().getHours();
				let welcome = '';
				if (now < 5 || now >= 18) {
					welcome = '晚上好, '
				} else if (now >= 5 && now < 9) {
					welcome = '早上好, '
				} else if (now >= 9 && now < 12) {
					welcome = '上午好, '
				} else if (now >= 12 && now < 14) {
					welcome = '中午好, '
				} else if (now >= 14 && now < 18) {
					welcome = '下午好, '
				}
				const user = this.$store.state.user;
				welcome = welcome + (user.name || '');
				return welcome;
			},
			queryIntegralInfo() {
				this.$http.get('/b/integral/query', {})
					.then(res => {
						this.integral = res.balance;
					})
			},
			queryCouponInfo() {
				this.$http.post('/b/coupon/queryPageList', {
						state: 0,
						pageSize: 1
					}, )
					.then(res => {
						this.couponCount = res.totalCount;
					})
			},
			queryMoneyInfo() {
				this.$http.post('/b/account/queryBalance')
					.then(res => {
						uni.stopPullDownRefresh();
						this.money = res.balance || 0;
					}).catch((e) => {
						uni.stopPullDownRefresh();
					})
			},
			querySignInfo() {
				this.$http.post('/b/signin/queryByUser', {})
					.then(res => {
						this.signCount = res.signAccount;
					})
			},
			queryLotteryCount() {
				this.$http.post('/b/lottery/remainLotteryNum', {})
					.then(res => {
						this.lotteryCount = res || 0;
					})
			},
			// 查询是否实名认证
			queryAuthInfo() {
				this.$http.post('/b/customerrealauth/query', {})
					.then(res => {
						this.realAuth = res.state == 1;
					})
			},
			toPage(row) {
				this.$tool.actionForLogin(() => {
					uni.navigateTo({
						url: row.url
					})
				});
			}
		}
	};
</script>

<style src="./style.scss" lang="scss" scoped></style>

<style>
	page {
		max-height: 100vh;
		overflow-y: scroll;
	}
</style>
