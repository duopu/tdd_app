<template>
  <view>

    <custom-navbar title="抽奖中心" />

    <view class="wheel-box">
      <view class="lottery-opt">
        <view class="lottery-opt-cir lottery-opt-left" @click="toRecord">中奖记录</view>
        <view class="lottery-opt-cir lottery-opt-right" @click="checkRule">查看规则</view>
      </view>

      <view class="circle-box">
        <!--https://100px.net/usage/uni-app.html   组件文档地址  https://100px.net/demo/wheel.html  -->
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
      </view>

      <view class="wheel-box-det1">
        你还有
        <text class="wheel-box-det2">{{ lotteryCount }}</text>
        次抽奖机会
      </view>
    </view>

  </view>
</template>

<script>
import ListEmpty from "../../../place-order/orderList/listEmpty";
import LuckyWheel from '@lucky-canvas/uni/lucky-wheel' // 大转盘

export default {
  name: "lottery",
  components: { ListEmpty, LuckyWheel },
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
    startCallBack() {
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
    endCallBack(prize) {
      // 奖品详情
      console.log(prize)
    },

    // 跳转抽奖记录
    toRecord() {
      uni.navigateTo({ url: `/pages/mine/lotteryCenter/child/lotteryRecord` })
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
  padding: 60rpx 0;
  box-sizing: border-box;
}

.circle-box {
  padding-left: 75rpx;
}

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

.lottery-opt {
  display: flex;
  align-items: center;
  justify-content: space-between;

  .lottery-opt-cir {
    height: 50rpx;
    line-height: 50rpx;
    padding: 0 20rpx;
    background: rgba(255, 212, 92, 1);
    font-size: 28rpx;
    font-family: PingFang SC-Regular, PingFang SC;
    font-weight: 400;
    color: #FFFFFF;
  }

  .lottery-opt-left {
    border-radius: 0 25rpx 25rpx 0;
  }

  .lottery-opt-right {
    border-radius: 25rpx 0 0 25rpx;
  }
}
</style>
<style>
page {
  background: #ECEDF9;
  overflow-y: scroll;
}
</style>

