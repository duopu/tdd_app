<template>
  <view>

    <!-- TODO 原抽奖中心 现已废弃  抽奖组件样式有问题 故而分开  -->

    <custom-navbar title="抽奖中心" />

    <view>
      <view>
        <view class="wheel-box-det" @click="checkRule">查看规则</view>


        <!-- <hxr-wheel @start="start" ref="hxrWheel" />-->

        <!--TODO 原抽奖中心 现已废弃  抽奖组件样式有问题 故而分开-->
        <!--https://100px.net/usage/uni-app.html   https://100px.net/demo/wheel.html  -->
        <LuckyWheel
            ref="myLucky"
            width="600rpx"
            height="600rpx"
            :blocks="blocks"
            :prizes="prizes"
            :buttons="buttons"
            :defaultStyle="defaultStyle"
            @start="startCallBack"
            @end="endCallBack"
        />

        <view class="wheel-box-det1">
          你还有
          <text class="wheel-box-det2">{{ lotteryCount }}</text>
          次抽奖机会
        </view>
      </view>

      <view class="wheel-boo0">
        <view class="wheel-boo1">中奖记录</view>
        <view class="wheel-boo2" v-for="i in lotteryList" :key="i.id">
          <view class="wheel-boo3">
            <view class="wheel-boo31">{{ i.prize }}</view>
            <view class="wheel-boo32">{{ i.prizeTime }}</view>
          </view>
          <view class="wheel-boo4">{{ i.state == 1 ? '未发放' : i.state == 2 ? '物流快递中' : '已发放'}}</view>
        </view>

				<list-empty v-if="!lotteryList.length" />
      </view>

    </view>
  </view>
</template>

<script>
import HxrWheel from "./hxrWheel";
import ListEmpty from "../../place-order/orderList/listEmpty";
import LuckyWheel from '@lucky-canvas/uni/lucky-wheel' // 大转盘


// TODO 原抽奖中心 现已废弃  抽奖组件样式有问题 故而分开

export default {
  name: "lotteryCenter",
  components: { ListEmpty, HxrWheel, LuckyWheel },
  data() {
    return {

      blocks: [{ padding: '13px', background: '#FF5B2D' }],
      prizes: [
        { fonts: [{ text: '0', top: '10%' }], background: '#50CA12' },
        { fonts: [{ text: '1', top: '10%' }], background: '#FFB42C' },
        { fonts: [{ text: '2', top: '10%' }], background: '#50CA12' },
        { fonts: [{ text: '3', top: '10%' }], background: '#FFB42C' },
        { fonts: [{ text: '4', top: '10%' }], background: '#50CA12' },
        { fonts: [{ text: '5', top: '10%' }], background: '#FFB42C' },
        { fonts: [{ text: '6', top: '10%' }], background: '#50CA12' },
        { fonts: [{ text: '7', top: '10%' }], background: '#FFB42C' },
      ],
      defaultStyle: {
        position: 'relative',
        left: '100rpx',
        top: '200rpx'
      },
      buttons: [
        {
          radius: '50%',
          imgs: [{
            src: 'https://ttd-public.obs.cn-east-3.myhuaweicloud.com/app-img/mine/s-dial_pointer.png',
            width: '100%',
            top: '-100%'
          }]
        }
      ],


			lotteryCount: 0,
			prizeList: [],
			lotteryList: [],
		};
  },
	onShow() {
		this.refresh();
	},
  methods: {

    // 点击抽奖按钮触发回调
    startCallBack () {
      // 先开始旋转
      this.$refs.myLucky.play()
      // 使用定时器来模拟请求接口
      setTimeout(() => {
        // 假设后端返回的中奖索引是0
        const index = 0
        // 调用stop停止旋转并传递中奖索引
        this.$refs.myLucky.stop(2)
      }, 3000)
    },
    // 抽奖结束触发回调
    endCallBack (prize) {
      // 奖品详情
      console.log(prize)
    },


		refresh() {
			this.queryLotteryCount();
			this.queryPriceList();
			this.queryLotteryList();
		},
		queryLotteryCount() {
			this.$http.post('/b/lottery/remainLotteryNum', {})
				.then(res => {
					this.lotteryCount = res || 0;
				})
		},
		queryPriceList() {
			this.$http.post('/b/lottery/prizeList', {})
				.then(res => {
					this.prizeList = res || [];
				})
		},
		queryLotteryList() {
			this.$http.post('/b/lottery/queryPageList', {
				pageSize: 100,
				sortInfos: [{
					field: 'prizeTime',
					sort: 'desc',
				}]
			})
				.then(res => {
					this.lotteryList = res.dataList || [];
				})
		},
		checkRule() {
			uni.showModal({
				title: '抽奖规则',
				content: '给我中！给我中！给我中！给我中！给我中！给我中！给我中！给我中！给我中！',
				showCancel: false,
				confirmText: '我知道了',
			})
		},
    start() {
      this.$refs.hxrWheel.begin(4);
    },
		startLottery() {
			this.$http.post('/b/lottery/startLottery', {})
				.then(res => {
				})
		},
  }
}
</script>

<style lang="scss">
.wheel-box {
  background-image: url("https://ttd-public.obs.cn-east-3.myhuaweicloud.com/app-img/mine/lottery-back.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  padding: 100rpx 36rpx;
  box-sizing: border-box;

  .wheel-box-det {
    font-size: 28rpx;
    font-family: PingFang SC-Regular, PingFang SC;
    font-weight: 400;
    color: #FFFFFF;
    line-height: 36rpx;
    text-align: right;
  }

  .wheel-box-det1 {
    width: 342rpx;
    height: 76rpx;
    @include flexCenter;
    margin: 32rpx auto 0 auto;
    background: rgba(255, 255, 255, 0.6);
    border-radius: 200rpx;

    font-size: 28rpx;
    font-family: PingFang SC-Regular, PingFang SC;
    font-weight: 400;
    color: #323335;

    .wheel-box-det2 {
      padding: 0 16rpx;
      display: inline-block;
      color: #FF3B30;
    }
  }
}

.wheel-boo0 {
  background: white;
  padding-top: 16rpx;
  margin-bottom: 68rpx;

  .wheel-boo1 {
    padding: 0 32rpx;
    height: 88rpx;
    font-size: 28rpx;
    display: flex;
    align-items: center;
    font-family: PingFang SC-Regular, PingFang SC;
    font-weight: 400;
    color: #828282;
  }

  .wheel-boo2 {
    padding: 32rpx 32rpx 16rpx 0;
    border-top: 1rpx solid #EDEDED;
    margin-left: 32rpx;
    display: flex;
    align-items: center;


    .wheel-boo3 {
      flex: 1;

      .wheel-boo31 {
        font-size: 28rpx;
        font-family: PingFang SC-Regular, PingFang SC;
        font-weight: 400;
        color: #323335;
        line-height: 36rpx;
      }

      .wheel-boo32 {
        margin-top: 16rpx;
        font-size: 24rpx;
        font-family: PingFang SC-Regular, PingFang SC;
        font-weight: 400;
        color: #828282;
        line-height: 32rpx;
      }
    }

    .wheel-boo4 {
      width: 116rpx;
      @include flexCenter;
      height: 48rpx;
      background: #FF9500;
      border-radius: 8rpx;
      font-size: 28rpx;
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      color: #FFFFFF;
    }
  }
}
</style>
<style>
page {
  background: #F6F7F7;
  overflow-y: scroll;
}
</style>
